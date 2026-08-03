import { ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabExplore = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 发现地址规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="发现地址规则"
            name="exploreUrl"
            placeholder="请输入发现地址规则"
          />
        </Col>

        {/* 书名规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="书名规则"
            name="ruleExplore.name"
            placeholder="请输入书名规则"
          />
        </Col>

        {/* 作者规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="作者规则"
            name="ruleExplore.author"
            placeholder="请输入作者规则"
          />
        </Col>

        {/* 书籍列表规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="书籍列表规则"
            name="ruleExplore.bookList"
            placeholder="请输入书籍列表规则"
          />
        </Col>

        {/* 详情页URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="详情页URL规则"
            name="ruleExplore.bookUrl"
            placeholder="请输入详情页URL规则"
          />
        </Col>

        {/* 封面规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="封面规则"
            name="ruleExplore.coverUrl"
            placeholder="请输入封面规则"
          />
        </Col>

        {/* 简介规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="简介规则"
            name="ruleExplore.intro"
            placeholder="请输入简介规则"
          />
        </Col>

        {/* 分类规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="分类规则"
            name="ruleExplore.kind"
            placeholder="请输入分类规则"
          />
        </Col>

        {/* 最新章节规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="最新章节规则"
            name="ruleExplore.lastChapter"
            placeholder="请输入最新章节规则"
          />
        </Col>

        {/* 字数规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="字数规则"
            name="ruleExplore.wordCount"
            placeholder="请输入字数规则"
          />
        </Col>
      </Row>
    </>
  );
};
