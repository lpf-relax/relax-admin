import {
  PageContainer,
  ProForm,
  type ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Card } from 'antd';
import { type FC, useEffect, useRef } from 'react';
import { useModel } from '@/.umi/exports';
import type { IGithubConfig } from '@/models/github';

const BasicForm: FC<Record<string, any>> = () => {
  const { githubConfig, saveGithubConfig } = useModel('github');
  const formRef = useRef<ProFormInstance>(undefined);

  useEffect(() => {
    if (githubConfig) {
      formRef?.current?.setFieldsValue(githubConfig);
    }
  }, [githubConfig, formRef]);

  const onFinish = async (values: IGithubConfig) => {
    saveGithubConfig(values);
  };

  return (
    <PageContainer>
      <Card variant="borderless">
        <ProForm
          formRef={formRef}
          requiredMark={false}
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
        >
          <ProFormText
            label="GitHub用户名"
            name="owner"
            rules={[
              {
                required: true,
                message: '请输入GitHub用户名',
              },
            ]}
            placeholder="请输入GitHub用户名"
          />

          <ProFormTextArea
            label="GitHub个人访问令牌"
            name="token"
            rules={[
              {
                required: true,
                message: '请输入GitHub个人访问令牌',
              },
            ]}
            placeholder="请输入GitHub个人访问令牌"
          />

          <ProFormText
            label="仓库名称"
            name="repo"
            rules={[
              {
                required: true,
                message: '请输入仓库名称',
              },
            ]}
            placeholder="请输入仓库名称"
          />

          <ProFormText
            label="基础路径"
            name="basePath"
            rules={[
              {
                required: true,
                message: '请输入基础路径',
              },
            ]}
            placeholder="请输入基础路径"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default BasicForm;
