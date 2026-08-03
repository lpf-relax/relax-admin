import { ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabToc = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 目录列表规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="目录列表规则"
            name="ruleToc.chapterList"
            placeholder="请输入目录列表规则"
          />
        </Col>

        {/* 章节名称规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="章节名称规则"
            name="ruleToc.chapterName"
            placeholder="请输入章节名称规则"
          />
        </Col>

        {/* 章节URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="章节URL规则"
            name="ruleToc.chapterUrl"
            placeholder="请输入章节URL规则"
          />
        </Col>

        {/* 目录下一页规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="目录下一页规则"
            name="ruleToc.nextTocUrl"
            placeholder="请输入目录下一页规则"
          />
        </Col>

        {/* 更新前js */}
        <Col span={24}>
          <ProFormTextArea
            label="更新前js"
            name="ruleToc.preUpdateJs"
            placeholder="请输入更新前js"
          />
        </Col>

        {/* 购买标识 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch
            label="购买标识"
            name="ruleToc.isPay"
            placeholder="请输入购买标识"
          />
        </Col>

        {/* VIP标识 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch
            label="VIP标识"
            name="ruleToc.isVip"
            placeholder="请输入VIP标识"
          />
        </Col>

        {/* volume标识 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch
            label="volume标识"
            name="ruleToc.isVolume"
            placeholder="请输入volume标识"
          />
        </Col>
      </Row>
    </>
  );
};
