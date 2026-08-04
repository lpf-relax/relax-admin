import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
} from '@ant-design/pro-components';
import { history, useModel, useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { type FC, useEffect, useState } from 'react';
import { ROUTE_PATHS } from '@/contants/routes';
import type { ILegadoSource, ILegadoSourceFormValues } from '../type';
import { TabBasic } from './components/tab-basic';
import { TabContent } from './components/tab-content';
import { TabExplore } from './components/tab-explore';
import { TabInfo } from './components/tab-info';
import { TabSearch } from './components/tab-search';
import { TabToc } from './components/tab-toc';
import {
  transformSourceItemToFormValues,
  transformSubmitValues,
} from './utils';

type InternalNamePath = (string | number)[];

const defaultInitialValues = {
  bookSourceType: 0,
  enabled: true,
  header: `{
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
    "referer": "{{baseUrl}}",
  }`,
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
const SourceCreate: FC<Record<string, any>> = () => {
  const [searchParams] = useSearchParams();
  const bookSourceUrlQuery = searchParams.get('bookSourceUrl') || '';

  const { putSource, getSourceByUrl } = useModel('legado.source.model');

  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView({
          block: 'center',
        });
      }
    };

    errors.some((err) => {
      if (!err || err.errors.length === 0) {
        return false;
      }

      const key = err.name[0] as
        | 'name'
        | 'url'
        | 'owner'
        | 'approver'
        | 'dateRange'
        | 'type';

      scrollToField(key);
      return true;
    });
  };
  const onFinish = async (values: ILegadoSourceFormValues) => {
    console.log('values', values);
    try {
      const data = transformSubmitValues(values);

      await putSource(data as ILegadoSource);

      message.success('提交成功');
      history.push(ROUTE_PATHS.LEGADO_SOURCE);
    } catch {
      message.error('提交失败，请重试！');
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    getErrorInfo(errorInfo.errorFields);
  };

  const [form] = ProForm.useForm<ILegadoSourceFormValues>();
  const [initialValues, setInitialValues] = useState<ILegadoSourceFormValues>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!bookSourceUrlQuery) {
      setInitialValues(defaultInitialValues);
      setLoading(false);
      return;
    }

    const bookSourceUrl = decodeURIComponent(bookSourceUrlQuery);
    const sourceInfo = getSourceByUrl(bookSourceUrl);
    if (!sourceInfo) {
      message.error(`未找到来源信息，bookSourceUrl: ${bookSourceUrl}`);
      setInitialValues(defaultInitialValues);
      setLoading(false);
      return;
    }

    const formValues = transformSourceItemToFormValues(sourceInfo);
    setInitialValues(formValues);
    setLoading(false);
  }, [bookSourceUrlQuery]);

  if (loading) {
    return <PageContainer loading={true} />;
  }

  return (
    <ProForm
      form={form}
      layout="vertical"
      requiredMark={false}
      submitter={{
        render: (_props, dom) => {
          return <FooterToolbar>{dom}</FooterToolbar>;
        },
      }}
      initialValues={initialValues}
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
                forceRender: true,
                children: <TabBasic initialValues={initialValues} />,
              },
              {
                key: 'search',
                label: '搜索',
                forceRender: true,
                children: <TabSearch />,
              },
              {
                key: 'explore',
                label: '发现',
                forceRender: true,
                children: <TabExplore />,
              },
              {
                key: 'info',
                label: '详情',
                forceRender: true,
                children: <TabInfo />,
              },
              {
                key: 'toc',
                label: '目录',
                forceRender: true,
                children: <TabToc />,
              },
              {
                key: 'content',
                label: '正文',
                forceRender: true,
                children: <TabContent />,
              },
            ],
          }}
        />
      </PageContainer>
    </ProForm>
  );
};
export default SourceCreate;
