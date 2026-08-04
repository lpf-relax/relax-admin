import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';
import {
  articleStyleEnum,
  type ILegadoRssFormValues,
  typeEnum,
} from '../../type';

export const TabBasic = ({
  initialValues,
}: {
  initialValues?: ILegadoRssFormValues;
}) => {
  const { sourceList, sourceGroupList } = useModel('legado.rss.model');
  const isEdit = !!initialValues?.sourceUrl;

  return (
    <>
      <Row gutter={16}>
        {/* 源类型 */}
        <Col lg={6} md={12} sm={24}>
          <ProFormSelect
            label="类型"
            name="type"
            rules={[
              {
                required: true,
                message: '请选择类型',
              },
            ]}
            options={[
              {
                label: '网页',
                value: typeEnum.web,
              },
              {
                label: '图片',
                value: typeEnum.photo,
              },
              {
                label: '视频',
                value: typeEnum.video,
              },
            ]}
            placeholder="请选择类型"
          />
        </Col>

        {/* 样式 */}
        <Col lg={6} md={12} sm={24}>
          <ProFormSelect
            label="样式"
            name="articleStyle"
            rules={[
              {
                required: true,
                message: '请选择样式',
              },
            ]}
            options={[
              {
                label: '列表',
                value: articleStyleEnum.list,
              },
              {
                label: '单列',
                value: articleStyleEnum.single_list,
              },
              {
                label: '双列',
                value: articleStyleEnum.double_list,
              },
              {
                label: '瀑布',
                value: articleStyleEnum.waterfall,
              },
              {
                label: '三列',
                value: articleStyleEnum.three_list,
              },
            ]}
            placeholder="请选择样式"
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
      </Row>

      <Row gutter={16}>
        {/* 启用 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="启用" name="enabled" />
        </Col>

        {/* 单URL */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="单URL" name="singleUrl" />
        </Col>

        {/* 启用CookieJar */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="启用CookieJar" name="enabledCookieJar" />
        </Col>

        {/* 预加载 */}
        <Col lg={4} md={12} sm={24}>
          <ProFormSwitch label="预加载" name="preload" />
        </Col>
      </Row>

      <Row gutter={16} justify="space-between">
        {/* 源URL */}
        <Col span={24}>
          <ProFormText
            label="源URL"
            name="sourceUrl"
            rules={[
              {
                required: true,
                message: '请输入源URL',
              },
              {
                validator: (_rule, value) => {
                  if (!value) return Promise.resolve();

                  // 编辑模式下，URL 未变化则跳过校验
                  if (isEdit && value === initialValues?.sourceUrl) {
                    return Promise.resolve();
                  }

                  const exists = sourceList.some(
                    (item) => item.sourceUrl === value,
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
            name="sourceName"
            rules={[
              {
                required: true,
                message: '请输入源名称',
              },
            ]}
            placeholder="请输入源名称"
          />
        </Col>

        {/* 源图标 */}
        <Col span={24}>
          <ProFormTextArea
            label="源图标"
            name="sourceIcon"
            placeholder="请输入源图标"
          />
        </Col>

        {/* 源分组 */}
        <Col span={24}>
          <ProFormSelect
            label="源分组"
            name="sourceGroup"
            mode="tags"
            options={sourceGroupList}
            fieldProps={{
              tokenSeparators: [',', ';'],
            }}
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
            name="sourceComment"
            placeholder="请输入源注释"
          />
        </Col>

        {/* 搜索地址 */}
        <Col span={24}>
          <ProFormTextArea
            label="搜索地址"
            name="searchUrl"
            placeholder="请输入搜索地址"
          />
        </Col>

        {/* 分类URL */}
        <Col span={24}>
          <ProFormTextArea
            label="分类URL"
            name="sortUrl"
            placeholder="请输入分类URL"
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

        {/* 请求头 */}
        <Col span={24}>
          <ProFormTextArea
            label="请求头"
            name="header"
            placeholder="请输入请求头"
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

        {/* 并发率 */}
        <Col span={24}>
          <ProFormText
            label="并发率"
            name="concurrentRate"
            placeholder="请输入并发率"
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
