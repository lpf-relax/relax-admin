import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';
import type { ILegadoSourceFormValues } from '../../type';

export const TabBasic = ({
  initialValues,
}: {
  initialValues?: ILegadoSourceFormValues;
}) => {
  const { sourceList } = useModel('legado.model');
  const isEdit = !!initialValues?.bookSourceUrl;

  return (
    <>
      <Row gutter={16}>
        {/* 源类型 */}
        <Col lg={6} md={12} sm={24}>
          <ProFormSelect
            label="类型"
            name="bookSourceType"
            rules={[
              {
                required: true,
                message: '请选择类型',
              },
            ]}
            options={[
              {
                label: '文本',
                value: 0,
              },
              {
                label: '音频',
                value: 1,
              },
              {
                label: '图片',
                value: 2,
              },
              {
                label: '文件',
                value: 3,
              },
            ]}
            placeholder="请选择类型"
          />
        </Col>

        {/* 自定义排序 */}
        <Col lg={6} md={12} sm={24}>
          <ProFormDigit
            label="自定义排序"
            name="customOrder"
            min={0}
            step={1}
          />
        </Col>

        {/* 权重 */}
        <Col lg={6} md={12} sm={24}>
          <ProFormDigit label="权重" name="weight" min={0} step={1} />
        </Col>
      </Row>

      <Row gutter={16}>
        {/* 启用 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="启用" name="enabled" />
        </Col>

        {/* 启用发现 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="启用发现" name="enabledExplore" />
        </Col>

        {/* 启用CookieJar */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="启用CookieJar" name="enabledCookieJar" />
        </Col>
      </Row>

      <Row gutter={16} justify="space-between">
        {/* 源URL */}
        <Col span={24}>
          <ProFormText
            label="源URL"
            name="bookSourceUrl"
            rules={[
              {
                required: true,
                message: '请输入源URL',
              },
              {
                validator: (_rule, value) => {
                  if (!value) return Promise.resolve();

                  // 编辑模式下，URL 未变化则跳过校验
                  if (isEdit && value === initialValues?.bookSourceUrl) {
                    return Promise.resolve();
                  }

                  const exists = sourceList.some(
                    (item) => item.bookSourceUrl === value,
                  );

                  if (exists) {
                    return Promise.reject(
                      new Error(`源URL "${value}" 已存在，请勿重复添加`),
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
            placeholder="请输入源URL"
          />
        </Col>

        {/* 源名称 */}
        <Col span={24}>
          <ProFormText
            label="源名称"
            name="bookSourceName"
            rules={[
              {
                required: true,
                message: '请输入源名称',
              },
            ]}
            placeholder="请输入源名称"
          />
        </Col>

        {/* 源分组 */}
        <Col span={24}>
          <ProFormText
            label="源分组"
            name="bookSourceGroup"
            rules={[
              {
                required: true,
                message: '请输入源分组',
              },
            ]}
            placeholder="请输入源分组"
          />
        </Col>

        {/* 源注释 */}
        <Col span={24}>
          <ProFormTextArea
            label="源注释"
            name="bookSourceComment"
            placeholder="请输入源注释"
          />
        </Col>

        {/* 书籍URL正则 */}
        <Col span={24}>
          <ProFormTextArea
            label="书籍URL正则"
            name="bookUrlPattern"
            placeholder="请输入书籍URL正则"
          />
        </Col>

        {/* 请求头 */}
        <Col span={24}>
          <ProFormTextArea
            label="请求头"
            name="header"
            placeholder="请输入请求头"
          />
        </Col>

        {/* 并发率 */}
        <Col span={24}>
          <ProFormText
            label="并发率"
            name="concurrentRate"
            placeholder="请输入并发率"
          />
        </Col>

        {/* 登录URL */}
        <Col span={24}>
          <ProFormTextArea
            label="登录URL"
            name="loginUrl"
            placeholder="请输入登录URL"
          />
        </Col>

        {/* 登录UI */}
        <Col span={24}>
          <ProFormTextArea
            label="登录UI"
            name="loginUi"
            placeholder="请输入登录UI"
          />
        </Col>

        {/* 登录检查js */}
        <Col span={24}>
          <ProFormTextArea
            label="登录检查js"
            name="loginCheckJs"
            placeholder="请输入登录检查js"
          />
        </Col>

        {/* 封面解密 */}
        <Col span={24}>
          <ProFormTextArea
            label="封面解密"
            name="coverDecodeJs"
            placeholder="请输入封面解密"
          />
        </Col>

        {/* 变量说明 */}
        <Col span={24}>
          <ProFormTextArea
            label="变量说明"
            name="variableComment"
            placeholder="请输入变量说明"
          />
        </Col>

        {/* jsLib */}
        <Col span={24}>
          <ProFormTextArea
            label="jsLib"
            name="jsLib"
            placeholder="请输入jsLib"
          />
        </Col>
      </Row>
    </>
  );
};
