import { ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabList = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 列表规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="列表规则"
            name="ruleArticles"
            placeholder="请输入列表规则"
          />
        </Col>

        {/* 列表下一页规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="列表下一页规则"
            name="ruleNextPage"
            placeholder="请输入列表下一页规则"
          />
        </Col>

        {/* 标题规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="标题规则"
            name="ruleTitle"
            placeholder="请输入标题规则"
          />
        </Col>

        {/* 时间规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="时间规则"
            name="rulePubDate"
            placeholder="请输入时间规则"
          />
        </Col>

        {/* 描述规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="描述规则"
            name="ruleDescription"
            placeholder="请输入描述规则"
          />
        </Col>

        {/* 图片URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="图片URL规则"
            name="ruleImage"
            placeholder="请输入图片URL规则"
          />
        </Col>

        {/* 链接规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="链接规则"
            name="ruleLink"
            placeholder="请输入链接规则"
          />
        </Col>
      </Row>
    </>
  );
};
