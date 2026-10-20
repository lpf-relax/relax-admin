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
import { articleStyleEnum, type ILegadoRssFormValues, typeEnum } from '../type';
import { TabBasic } from './components/tab-basic';
import { TabList } from './components/tab-list';
import { TabStart } from './components/tab-start';
import { TabWebView } from './components/tab-web-view';
import {
  transformSourceItemToFormValues,
  transformSubmitValues,
} from './utils';

type InternalNamePath = (string | number)[];

const defaultInitialValues = {
  type: typeEnum.web,
  articleStyle: articleStyleEnum.list,
  enabled: true,
  enabledCookieJar: true,
  header: `{
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
    "referer": "{{baseUrl}}",
  }`,

  enableJs: true,
  loadWithBaseUrl: true,
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
const SourceCreate: FC<Record<string, any>> = () => {
  const [searchParams] = useSearchParams();
  const sourceUrlQuery = searchParams.get('sourceUrl') || '';

  const { putSource, getSourceByUrl } = useModel('legado.rss.model');

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
  const onFinish = async (values: ILegadoRssFormValues) => {
    console.log('values', values);
    try {
      const data = transformSubmitValues(values);

      await putSource(data);

      message.success('提交成功');
      history.push(ROUTE_PATHS.LEGADO_RSS);
    } catch {
      message.error('提交失败，请重试！');
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    getErrorInfo(errorInfo.errorFields);
  };

  const [form] = ProForm.useForm<ILegadoRssFormValues>();
  const [initialValues, setInitialValues] = useState<ILegadoRssFormValues>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!sourceUrlQuery) {
      setInitialValues(defaultInitialValues);
      setLoading(false);
      return;
    }

    const bookSourceUrl = decodeURIComponent(sourceUrlQuery);
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
  }, [sourceUrlQuery]);

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
                key: 'start',
                label: '启动',
                forceRender: true,
                children: <TabStart />,
              },
              {
                key: 'list',
                label: '列表',
                forceRender: true,
                children: <TabList />,
              },
              {
                key: 'webview',
                label: 'WEB_VIEW',
                forceRender: true,
                children: <TabWebView />,
              },
            ],
          }}
        />
      </PageContainer>
    </ProForm>
  );
};
export default SourceCreate;
