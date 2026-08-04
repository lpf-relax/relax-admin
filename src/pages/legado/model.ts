// models/useLegadoDB.ts

import { type IDBPDatabase, openDB } from 'idb';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LEGADO_DB_NAME } from '@/contants/idb';
import type { ILegadoSourceItem } from './type';

// 类型定义
export interface IUseLegadoDBReturn {
  /** 数据库是否就绪 */
  isReady: boolean;
  /** 来源列表 */
  sourceList: ILegadoSourceItem[];
  /** 保存来源（存在则更新，不存在则新增） */
  putSource: (source: ILegadoSourceItem) => Promise<void>;
  /** 批量导入 */
  importSources: (sources: ILegadoSourceItem[]) => Promise<void>;
  /** 通过 bookSourceUrl 删除 */
  deleteSource: (bookSourceUrl: string) => Promise<void>;
  /** 刷新列表 */
  refreshSourceList: () => Promise<void>;
  /** 根据 bookSourceUrl 查询 */
  getSourceByUrl: (bookSourceUrl: string) => ILegadoSourceItem | null;
  /** 批量查询 */
  getSourcesByUrls: (urls: string[]) => ILegadoSourceItem[];
  /** 清空所有数据 */
  clearAll: () => Promise<void>;
}

export default function useLegadoDB(): IUseLegadoDBReturn {
  const [sourceList, setSourceList] = useState<ILegadoSourceItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const dbRef = useRef<IDBPDatabase | null>(null);

  // 初始化数据库
  useEffect(() => {
    let isActive = true;

    const initDB = async () => {
      try {
        const db = await openDB(LEGADO_DB_NAME, 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('sources')) {
              // ✅ 使用 bookSourceUrl 作为主键
              db.createObjectStore('sources', { keyPath: 'bookSourceUrl' });
              // 不需要额外索引，因为主键就是 bookSourceUrl
            }
          },
        });

        if (!isActive) return;

        dbRef.current = db;
        setIsReady(true);

        const sources = await db.getAll('sources');
        if (isActive) {
          setSourceList(sources);
        }
      } catch (error) {
        console.error('数据库初始化失败:', error);
      }
    };

    initDB();

    return () => {
      isActive = false;
      // 不关闭数据库，保持连接
    };
  }, []);

  // 刷新列表
  const refreshSourceList = useCallback(async () => {
    if (!dbRef.current) return;
    try {
      const sources: ILegadoSourceItem[] =
        await dbRef.current.getAll('sources');
      setSourceList(
        sources.sort(
          (a, b) => (b.lastUpdateTime || 0) - (a.lastUpdateTime || 0),
        ),
      );
    } catch (error) {
      console.error('刷新列表失败:', error);
    }
  }, []);

  // 保存来源（存在则更新，不存在则新增）
  const putSource = useCallback(
    async (source: ILegadoSourceItem) => {
      if (!dbRef.current) throw new Error('数据库未初始化');

      const { bookSourceUrl } = source;
      if (!bookSourceUrl) {
        throw new Error('bookSourceUrl 不能为空');
      }

      try {
        await dbRef.current.put('sources', source);
        await refreshSourceList();
      } catch (error) {
        console.error('保存来源失败:', error);
        throw error;
      }
    },
    [refreshSourceList],
  );

  // 批量导入
  const importSources = useCallback(
    async (sources: ILegadoSourceItem[]) => {
      if (!dbRef.current) throw new Error('数据库未初始化');
      if (sources.length === 0) return;

      const tx = dbRef.current.transaction('sources', 'readwrite');
      const store = tx.objectStore('sources');

      for (const source of sources) {
        if (!source.bookSourceUrl) continue;
        store.put(source);
      }

      await tx.done;
      await refreshSourceList();
    },
    [refreshSourceList],
  );

  // 通过 bookSourceUrl 删除
  const deleteSource = useCallback(
    async (bookSourceUrl: string) => {
      if (!dbRef.current) return;
      if (!bookSourceUrl) return;

      try {
        await dbRef.current.delete('sources', bookSourceUrl);
        await refreshSourceList();
      } catch (error) {
        console.error('删除来源失败:', error);
        throw error;
      }
    },
    [refreshSourceList],
  );

  // 根据 bookSourceUrl 查询（从内存中获取
  const getSourceByUrl = useCallback(
    (bookSourceUrl: string): ILegadoSourceItem | null => {
      if (!bookSourceUrl) return null;
      return (
        sourceList.find((item) => item.bookSourceUrl === bookSourceUrl) ?? null
      );
    },
    [sourceList],
  );

  // 批量查询（从内存中获取）
  const getSourcesByUrls = useCallback(
    (urls: string[]): ILegadoSourceItem[] => {
      if (!urls || urls.length === 0) return [];
      const urlSet = new Set(urls);
      return sourceList.filter((item) => urlSet.has(item.bookSourceUrl));
    },
    [sourceList],
  );

  // 清空所有数据
  const clearAll = useCallback(async () => {
    if (!dbRef.current) return;
    try {
      await dbRef.current.clear('sources');
      setSourceList([]);
    } catch (error) {
      console.error('清空数据失败:', error);
      throw error;
    }
  }, []);

  return {
    isReady,
    sourceList,
    putSource,
    importSources,
    deleteSource,
    refreshSourceList,
    getSourceByUrl,
    getSourcesByUrls,
    clearAll,
  };
}
