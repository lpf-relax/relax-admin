import { ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabContent = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 正文规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="正文规则"
            name="ruleContent.content"
            placeholder="请输入正文规则"
          />
        </Col>

        {/* 章节名称规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="章节名称规则"
            name="ruleContent.title"
            placeholder="请输入章节名称规则"
          />
        </Col>

        {/* 正文下一页URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="正文下一页URL规则"
            name="ruleContent.nextContentUrl"
            placeholder="请输入正文下一页URL规则"
          />
        </Col>

        {/* 图片解密 */}
        <Col span={24}>
          <ProFormTextArea
            label="图片解密"
            name="ruleContent.imageDecode"
            placeholder="请输入图片解密"
          />
        </Col>

        {/* 图片样式 */}
        <Col span={24}>
          <ProFormTextArea
            label="图片样式"
            name="ruleContent.imageStyle"
            placeholder="请输入图片样式"
          />
        </Col>

        {/* 替换规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="替换规则"
            name="ruleContent.replaceRegex"
            placeholder="请输入替换规则"
          />
        </Col>

        {/* 资源正则 */}
        <Col span={24}>
          <ProFormTextArea
            label="资源正则"
            name="ruleContent.sourceRegex"
            placeholder="请输入资源正则"
          />
        </Col>

        {/* WebView JS */}
        <Col span={24}>
          <ProFormTextArea
            label="WebView JS"
            name="ruleContent.webJs"
            placeholder="请输入WebView JS"
          />
        </Col>

        {/* 购买操作 */}
        <Col span={24}>
          <ProFormTextArea
            label="购买操作"
            name="ruleContent.payAction"
            placeholder="请输入购买操作"
          />
        </Col>
      </Row>
    </>
  );
};
