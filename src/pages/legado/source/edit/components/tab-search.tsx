import { ProFormTextArea } from '@ant-design/pro-components';
import { Col, Row } from 'antd';

export const TabSearch = () => {
  return (
    <>
      <Row gutter={16} justify="space-between">
        {/* 搜索地址 */}
        <Col span={24}>
          <ProFormTextArea
            label="搜索地址"
            name="searchUrl"
            placeholder="请输入搜索地址"
          />
        </Col>

        {/* 书名规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="书名规则"
            name="ruleSearch.name"
            placeholder="请输入书名规则"
          />
        </Col>

        {/* 作者规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="作者规则"
            name="ruleSearch.author"
            placeholder="请输入作者规则"
          />
        </Col>

        {/* 书籍列表规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="书籍列表规则"
            name="ruleSearch.bookList"
            placeholder="请输入书籍列表规则"
          />
        </Col>

        {/* 详情页URL规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="详情页URL规则"
            name="ruleSearch.bookUrl"
            placeholder="请输入详情页URL规则"
          />
        </Col>

        {/* 封面规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="封面规则"
            name="ruleSearch.coverUrl"
            placeholder="请输入封面规则"
          />
        </Col>

        {/* 简介规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="简介规则"
            name="ruleSearch.intro"
            placeholder="请输入简介规则"
          />
        </Col>

        {/* 分类规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="分类规则"
            name="ruleSearch.kind"
            placeholder="请输入分类规则"
          />
        </Col>

        {/* 最新章节规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="最新章节规则"
            name="ruleSearch.lastChapter"
            placeholder="请输入最新章节规则"
          />
        </Col>

        {/* 字数规则 */}
        <Col span={24}>
          <ProFormTextArea
            label="字数规则"
            name="ruleSearch.wordCount"
            placeholder="请输入字数规则"
          />
        </Col>

        {/* 校验关键字 */}
        <Col span={24}>
          <ProFormTextArea
            label="校验关键字"
            name="ruleSearch.checkKeyWord"
            placeholder="请输入校验关键字"
          />
        </Col>
      </Row>
    </>
  );
};
