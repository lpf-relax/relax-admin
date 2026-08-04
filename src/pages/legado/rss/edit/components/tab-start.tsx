import { ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabStart = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 启动页html文本 */}
        <Col span={24}>
          <ProFormTextArea
            label="启动页html文本"
            name="startHtml"
            placeholder="请输入启动页html文本"
          />
        </Col>

        {/* 启动页style文本 */}
        <Col span={24}>
          <ProFormTextArea
            label="启动页style文本"
            name="startStyle"
            placeholder="请输入启动页style文本"
          />
        </Col>

        {/* 启动页Js */}
        <Col span={24}>
          <ProFormTextArea
            label="启动页Js"
            name="startJs"
            placeholder="请输入启动页Js"
          />
        </Col>

        {/* 预注入Js */}
        <Col span={24}>
          <ProFormTextArea
            label="预注入Js"
            name="preloadJs"
            placeholder="请输入预注入Js"
          />
        </Col>
      </Row>
    </>
  );
};
