import { useCallback, useEffect, useRef, useState } from 'react';
import { STORAGE_GITHUB_CONFIG_KEY } from '@/contants/storage';

export interface IGithubConfig {
  owner: string;
  token: string;
  repo: string;
  basePath: string;
}

/**
 * GitHub 文件操作工具类
 */
export class GitHubFileTool {
  private owner: string;
  private repo: string;
  private token: string;
  private apiBase = 'https://api.github.com';

  constructor(config: IGithubConfig) {
    this.owner = config.owner;
    this.repo = config.repo;
    this.token = config.token;
  }

  /**
   * 获取文件内容（自动处理大文件 > 4MB）
   * @param path 文件路径（仓库内相对路径）
   * @returns 文件内容（字符串）
   */
  async getFileContent(path: string): Promise<string> {
    const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${path}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`文件不存在: ${path}`);
      }
      const error = await response.json();
      throw new Error(`获取文件失败: ${response.status} - ${error.message}`);
    }

    const data = await response.json();

    // 检查文件大小是否超过 4MB（GitHub API 限制）
    if (data.size > 4 * 1024 * 1024) {
      // 大文件：使用 download_url 直接下载
      return this.downloadLargeFile(data.download_url);
    }

    // 小文件：直接从 content 字段解码
    const base64Content = data.content.replace(/\n/g, '');
    return this.base64ToString(base64Content);
  }

  /**
   * 下载大文件（>4MB）
   * @param downloadUrl GitHub 提供的下载链接
   * @returns 文件内容（字符串）
   */
  private async downloadLargeFile(downloadUrl: string): Promise<string> {
    const response = await fetch(downloadUrl, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`下载大文件失败: ${response.status}`);
    }

    // 根据文件类型决定如何读取
    const contentType = response.headers.get('content-type') || '';

    if (
      contentType.includes('application/json') ||
      contentType.includes('text')
    ) {
      // 文本文件：直接读取为文本
      return response.text();
    } else {
      // 其他文件：读取为 Blob 并转为文本（或根据需要处理）
      const blob = await response.blob();
      return blob.text();
    }
  }

  /**
   * 提交文件（自动判断创建或更新）
   * @param path 文件路径
   * @param content 文件内容（字符串）
   * @param commitMessage 提交信息
   * @returns 提交结果
   */
  async commitFile(
    path: string,
    content: string,
    commitMessage: string = `提交文件: ${path}`,
  ): Promise<any> {
    const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${path}`;

    // 1. 尝试获取文件信息（判断是否存在）
    let existingSha: string | null = null;
    let isNewFile = false;

    const getResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (getResponse.ok) {
      const fileInfo = await getResponse.json();
      existingSha = fileInfo.sha;
    } else if (getResponse.status === 404) {
      isNewFile = true;
    } else {
      const error = await getResponse.json();
      throw new Error(
        `检查文件状态失败: ${getResponse.status} - ${error.message}`,
      );
    }

    // 2. 准备请求体
    const base64Content = this.stringToBase64(content);
    const body: any = {
      message: commitMessage,
      content: base64Content,
    };

    // 如果文件已存在，需要传入 sha 进行更新
    if (!isNewFile && existingSha) {
      body.sha = existingSha;
    }

    // 3. 执行提交
    const putResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify(body),
    });

    if (!putResponse.ok) {
      const error = await putResponse.json();
      throw new Error(
        `提交文件失败: ${putResponse.status} - ${error.message || JSON.stringify(error)}`,
      );
    }

    const result = await putResponse.json();
    return {
      success: true,
      action: isNewFile ? 'created' : 'updated',
      sha: result.content.sha,
      url: result.content.html_url,
      data: result,
    };
  }

  /**
   * 检查文件是否存在
   * @param path 文件路径
   * @returns 是否存在
   */
  async fileExists(path: string): Promise<boolean> {
    try {
      const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${path}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * 删除文件
   * @param path 文件路径
   * @param commitMessage 提交信息
   */
  async deleteFile(
    path: string,
    commitMessage: string = `删除文件: ${path}`,
  ): Promise<any> {
    // 先获取文件的 SHA
    const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${path}`;
    const getResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!getResponse.ok) {
      throw new Error(`文件不存在或无法访问: ${path}`);
    }

    const fileInfo = await getResponse.json();

    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message: commitMessage,
        sha: fileInfo.sha,
      }),
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.json();
      throw new Error(
        `删除文件失败: ${deleteResponse.status} - ${error.message}`,
      );
    }

    return await deleteResponse.json();
  }

  // ========== 工具方法 ==========

  /**
   * Base64 转字符串（支持中文）
   */
  private base64ToString(base64: string): string {
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder('utf-8').decode(bytes);
    } catch {
      // 如果解码失败，直接返回原字符串
      return base64;
    }
  }

  /**
   * 字符串转 Base64（支持中文）
   */
  private stringToBase64(str: string): string {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    let binaryString = '';
    for (let i = 0; i < encoded.length; i++) {
      binaryString += String.fromCharCode(encoded[i]);
    }
    return btoa(binaryString);
  }
}

export enum GithubTypeEmun {
  common,
}

export default () => {
  const [githubConfig, setGithubConfig] = useState<IGithubConfig>(() => {
    const storedConfig = localStorage.getItem(STORAGE_GITHUB_CONFIG_KEY);
    return storedConfig ? JSON.parse(storedConfig) : null;
  });
  const githubFileToolRef = useRef<GitHubFileTool>(null);
  useEffect(() => {
    githubFileToolRef.current = githubConfig
      ? new GitHubFileTool(githubConfig)
      : null;
  }, [githubConfig]);

  const saveGithubConfig = useCallback((config: IGithubConfig) => {
    localStorage.setItem(STORAGE_GITHUB_CONFIG_KEY, JSON.stringify(config));
    setGithubConfig(config);
  }, []);

  const getDataFromGithub = useCallback(
    async (filePath: string) => {
      if (!githubConfig || !githubFileToolRef.current) {
        throw new Error('GitHub配置未设置');
      }

      return githubFileToolRef.current.getFileContent(
        `${githubConfig.basePath}/${filePath}`,
      );
    },
    [githubConfig],
  );

  const saveDataToGithub = useCallback(
    async ({ data, filePath }: { data: any; filePath: string }) => {
      if (!githubConfig || !githubFileToolRef.current) {
        throw new Error('GitHub配置未设置');
      }

      const jsonString = JSON.stringify(data, null, 2);
      return githubFileToolRef.current.commitFile(
        `${githubConfig.basePath}/${filePath}`,
        jsonString,
      );
    },
    [githubConfig],
  );

  return {
    githubConfig,
    saveGithubConfig,
    getDataFromGithub,
    saveDataToGithub,
  };
};
