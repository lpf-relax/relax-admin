import { CloseCircleOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
import {
  EditableProTable,
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { Button, Card, Col, message, Popover, Row } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { TabBasic } from './components/tab-basic';
import { TabContent } from './components/tab-content';
import { TabExplore } from './components/tab-explore';
import { TabInfo } from './components/tab-info';
import { TabSearch } from './components/tab-search';
import { TabToc } from './components/tab-toc';
import { fakeSubmitForm } from './service';
import useStyles from './style.style';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
type InternalNamePath = (string | number)[];
const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
const AdvancedForm: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as
        | 'name'
        | 'url'
        | 'owner'
        | 'approver'
        | 'dateRange'
        | 'type';
      return (
        <button
          key={key}
          type="button"
          className={styles.errorListItem}
          onClick={() => scrollToField(key)}
        >
          <CloseCircleOutlined className={styles.errorIcon} />
          <div>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </button>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          classNames={{
            root: styles.errorPopover,
          }}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger?.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };
  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await fakeSubmitForm(values);
      message.success('提交成功');
    } catch {
      message.error('提交失败，请重试！');
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <ProForm
      layout="vertical"
      requiredMark={false}
      submitter={{
        render: (_props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{
        bookSourceType: 0,
        enabled: true,
        customOrder: 0,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="">
        <ProCard
          tabs={{
            type: 'card',
            destroyOnHidden: false,
            items: [
              {
                key: 'basic',
                label: '基本',
                children: <TabBasic />,
              },
              {
                key: 'search',
                label: '搜索',
                children: <TabSearch />,
              },
              {
                key: 'explore',
                label: '发现',
                children: <TabExplore />,
              },
              {
                key: 'info',
                label: '详情',
                children: <TabInfo />,
              },
              {
                key: 'toc',
                label: '目录',
                children: <TabToc />,
              },
              {
                key: 'content',
                label: '正文',
                children: <TabContent />,
              },
            ],
          }}
        />
      </PageContainer>
    </ProForm>
  );
};
export default AdvancedForm;
