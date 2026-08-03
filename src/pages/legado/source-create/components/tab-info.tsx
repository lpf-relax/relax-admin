import { ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabInfo = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 书名规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="书名规则"
            name="ruleBookInfo.name"
            placeholder="请输入书名规则"
          />
        </Col>

        {/* 作者规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="作者规则"
            name="ruleBookInfo.author"
            placeholder="请输入作者规则"
          />
        </Col>

        {/* 目录URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="目录URL规则"
            name="ruleBookInfo.tocUrl"
            placeholder="请输入目录URL规则"
          />
        </Col>

        {/* 封面规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="封面规则"
            name="ruleBookInfo.coverUrl"
            placeholder="请输入封面规则"
          />
        </Col>

        {/* 简介规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="简介规则"
            name="ruleBookInfo.intro"
            placeholder="请输入简介规则"
          />
        </Col>

        {/* 分类规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="分类规则"
            name="ruleBookInfo.kind"
            placeholder="请输入分类规则"
          />
        </Col>

        {/* 最新章节规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="最新章节规则"
            name="ruleBookInfo.lastChapter"
            placeholder="请输入最新章节规则"
          />
        </Col>

        {/* 字数规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="字数规则"
            name="ruleBookInfo.wordCount"
            placeholder="请输入字数规则"
          />
        </Col>

        {/* 预处理规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="预处理规则"
            name="ruleBookInfo.init"
            placeholder="请输入预处理规则"
          />
        </Col>

        {/* 下载URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="下载URL规则"
            name="ruleBookInfo.downloadUrls"
            placeholder="请输入下载URL规则"
          />
        </Col>

        {/* 允许修改书名作者 */}
        <Col span={24}>
          <ProFormSwitch
            label="允许修改书名作者"
            name="ruleBookInfo.canReName"
            placeholder="请输入允许修改书名作者"
          />
        </Col>
      </Row>
    </>
  );
};
