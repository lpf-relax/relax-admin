import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  FormOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsColumn,
} from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { App, Button, Drawer, Input, Modal, Popconfirm } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { GITHUB_LEGADO_RSS } from '@/contants/github';
import { ROUTE_PATHS } from '@/contants/routes';
import type { ILegadoRss } from '../type';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const { message } = App.useApp();

  const { getDataFromGithub, saveDataToGithub } = useModel('github');
  const {
    sourceList,
    sourceGroupList,
    deleteSource,
    putSource,
    importSources,
    getSourceByUrl,
  } = useModel('legado.rss.model');

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<ILegadoRss>();

  const columns: ProColumns<ILegadoRss>[] = [
    {
      title: '源名称',
      order: 10,
      dataIndex: 'sourceName',
      render: (dom, entity) => {
        return (
          <Button
            type="link"
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </Button>
        );
      },
    },
    {
      title: '源URL',
      dataIndex: 'sourceUrl',
      hideInTable: true,
    },
    {
      title: '源分组',
      order: 10,
      dataIndex: 'sourceGroup',
      width: 120,
      valueType: 'select',
      valueEnum: sourceGroupList.reduce(
        (acc, group) => {
          acc[group] = { text: group };
          return acc;
        },
        {} as Record<string, { text: string }>,
      ),
    },
    {
      title: '源注释',
      dataIndex: 'sourceComment',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          icon={<FormOutlined />}
          onClick={() => {
            history.push(
              ROUTE_PATHS.LEGADO_RSS_CREATE +
                '?sourceUrl=' +
                encodeURIComponent(record.sourceUrl),
            );
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="删除源"
          description="确定要删除这个源吗？"
          onConfirm={() => {
            deleteSource(record.sourceUrl).then(() => {
              message.success('删除成功');
              actionRef.current?.reload?.();
            });
          }}
        >
          <Button danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const updateDataFromGithub = useCallback(async () => {
    const res = await getDataFromGithub(GITHUB_LEGADO_RSS);
    await importSources(JSON.parse(res));

    message.success('获取成功！');
    actionRef.current?.reloadAndRest?.();
  }, []);

  const pushDataToGithub = useCallback(async () => {
    console.log('pushDataToGithub', sourceList);
    await saveDataToGithub({
      data: sourceList,
      filePath: GITHUB_LEGADO_RSS,
    });
    message.success('提交成功！');
  }, [sourceList]);

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importSource, setImportSource] = useState<string>();
  const handleOpenImportModal = () => setImportModalOpen(true);
  const handleCloseImportModal = () => setImportModalOpen(false);
  const handleImportModalOk = () => {
    if (!importSource) {
      message.error('请输入内容');
      return;
    }
    try {
      const res = JSON.parse(importSource);
      if (!res.sourceUrl) {
        message.error('缺少sourceUrl');
        return;
      }
      if (getSourceByUrl(res.sourceUrl)) {
        message.error('已存在sourceUrl');
        return;
      }

      putSource(res);
    } catch (error) {
      message.error('导入失败！');
      return;
    }

    handleCloseImportModal();
    setImportSource(undefined);
    actionRef.current?.reloadAndRest?.();
  };

  return (
    <PageContainer>
      {/* {contextHolder} */}
      <ProTable<ILegadoRss>
        actionRef={actionRef}
        rowKey="sourceUrl"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="new"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push(ROUTE_PATHS.LEGADO_RSS_CREATE);
            }}
          >
            新建
          </Button>,
          <Button
            key="get-github"
            icon={<CloudDownloadOutlined />}
            onClick={updateDataFromGithub}
          >
            获取Github数据
          </Button>,
          <Button
            key="push-github"
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={pushDataToGithub}
          >
            同步到Github
          </Button>,
          <Button
            key="get-import"
            icon={<ImportOutlined />}
            onClick={handleOpenImportModal}
          >
            导入
          </Button>,
        ]}
        request={async (params) => {
          let result = sourceList;
          let { current, pageSize, ...restParams } = params;

          if (restParams) {
            Object.keys(restParams).forEach((key) => {
              const filterValue = restParams[key];
              if (!filterValue) {
                return;
              }
              result = result.filter((item) => {
                const itemValue = item[key as keyof ILegadoRss];
                if (!itemValue) {
                  return true;
                }
                if (typeof itemValue === 'string') {
                  return itemValue.includes(`${filterValue}`);
                }
                return itemValue === filterValue;
              });
            });
          }

          current = params.current || 1;
          pageSize = params.pageSize || 20;
          const start = (current - 1) * pageSize;
          const end = start + pageSize;
          const pageData = result.slice(start, end);

          return {
            data: pageData,
            total: result.length,
            success: true,
          };
        }}
        columns={columns}
      />

      <Drawer
        size={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.sourceUrl && (
          <ProDescriptions<ILegadoRss>
            column={2}
            title={currentRow?.sourceUrl}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.sourceUrl,
            }}
            columns={columns as ProDescriptionsColumn<ILegadoRss>[]}
          />
        )}
      </Drawer>

      <Modal
        title="导入书源"
        open={importModalOpen}
        onOk={handleImportModalOk}
        onCancel={handleCloseImportModal}
      >
        <Input.TextArea
          value={importSource}
          onChange={(e) => setImportSource(e.target.value)}
        />
      </Modal>
    </PageContainer>
  );
};

export default TableList;
