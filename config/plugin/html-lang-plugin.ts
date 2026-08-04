import type { IApi } from '@umijs/max';

const htmlLangPlugin = (api: IApi) => {
  api.modifyHTML(($) => {
    $('html').attr('lang', 'zh-CN');
    return $;
  });
};

export default htmlLangPlugin;
