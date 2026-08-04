import { ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabWebView = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        <Row gutter={16} className="w-full">
          {/* 启用 JS */}
          <Col lg={6} md={8} sm={12} xs={12}>
            <ProFormSwitch label="启用 JS" name="enableJs" />
          </Col>

          {/* 加载 BaseUrl */}
          <Col lg={6} md={8} sm={12} xs={12}>
            <ProFormSwitch label="加载 BaseUrl" name="loadWithBaseUrl" />
          </Col>

          {/* 输出 WebLog */}
          <Col lg={6} md={8} sm={12} xs={12}>
            <ProFormSwitch label="输出 WebLog" name="showWebLog" />
          </Col>

          {/* 优先加载缓存 */}
          <Col lg={6} md={8} sm={12} xs={12}>
            <ProFormSwitch label="优先加载缓存" name="cacheFirst" />
          </Col>
        </Row>

        {/* 内容规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="内容规则"
            name="ruleContent"
            placeholder="请输入内容规则"
          />
        </Col>

        {/* 样式 */}
        <Col span={24}>
          <ProFormTextArea label="样式" name="style" placeholder="请输入样式" />
        </Col>

        {/* 注入Js */}
        <Col span={24}>
          <ProFormTextArea
            label="注入Js"
            name="injectJs"
            placeholder="请输入注入Js"
          />
        </Col>

        {/* 白名单 */}
        <Col span={24}>
          <ProFormTextArea
            label="白名单"
            name="contentWhitelist"
            placeholder="请输入白名单"
          />
        </Col>

        {/* 黑名单 */}
        <Col span={24}>
          <ProFormTextArea
            label="黑名单"
            name="contentBlacklist"
            placeholder="请输入黑名单"
          />
        </Col>

        {/* url跳转拦截 */}
        <Col span={24}>
          <ProFormTextArea
            label="url跳转拦截"
            name="shouldOverrideUrlLoading"
            placeholder="请输入url跳转拦截"
          />
        </Col>
      </Row>
    </>
  );
};
