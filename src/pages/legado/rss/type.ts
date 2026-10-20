export enum typeEnum {
  web = 0,
  photo = 1,
  video = 2,
}
export enum articleStyleEnum {
  list = 0,
  single_list = 1,
  double_list = 2,
  waterfall = 3,
  three_list = 4,
}

/** RSS源配置 */
export interface ILegadoRss {
  /**
   * 基础
   */
  /** 启用 */
  enabled?: boolean;
  /** 单URL */
  singleUrl?: boolean;
  /** 启用CookieJar */
  enabledCookieJar?: boolean;
  /** 预加载 */
  preload?: boolean;
  /** 类型 */
  type?: typeEnum;
  /** 样式 */
  articleStyle?: articleStyleEnum;
  /** 排序 */
  customOrder?: number;

  /** 源名称 */
  sourceName?: string;
  /** 源URL */
  sourceUrl: string;
  /** 源图标 */
  sourceIcon?: string;
  /** 源分组 */
  sourceGroup?: string;
  /** 源注释 */
  sourceComment?: string;
  /** 搜索地址 */
  searchUrl?: string;
  /** 分类URL */
  sortUrl?: string;
  /** 登录URL */
  loginUrl?: string;
  /** 登录UI */
  loginUi?: string;
  /** 登录检查JS */
  loginCheckJs?: string;
  /** 封面解密 */
  coverDecodeJs?: string;
  /** 请求头 */
  header?: string;
  /** 变量说明 */
  variableComment?: string;
  /** 并发率 */
  concurrentRate?: string;
  /** jsLib */
  jsLib?: string;

  /**
   * 启动
   */
  /** 启动页html文本 */
  startHtml?: string;
  /** 启动页style文本 */
  startStyle?: string;
  /** 启动页Js */
  startJs?: string;
  /** 预注入Js */
  preloadJs?: string;

  /**
   * 列表
   */
  /** 列表规则 */
  ruleArticles?: string;
  /** 列表下一页规则 */
  ruleNextPage?: string;
  /** 标题规则 */
  ruleTitle?: string;
  /** 时间规则 */
  rulePubDate?: string;
  /** 描述规则 */
  ruleDescription?: string;
  /** 图片URL规则 */
  ruleImage?: string;
  /** 链接规则 */
  ruleLink?: string;

  /**
   *  WEB_VIEW
   */
  /** 启用 JS */
  enableJs?: boolean;
  /** 加载 BaseUrl */
  loadWithBaseUrl?: boolean;
  /** 输出 WebLog */
  showWebLog?: boolean;
  /** 优先加载缓存 */
  cacheFirst?: boolean;
  /** 内容规则 */
  ruleContent?: string;
  /** 样式 */
  style?: string;
  /** 注入Js */
  injectJs?: string;
  /** 白名单 */
  contentWhitelist?: string;
  /** 黑名单 */
  contentBlacklist?: string;
  /** url跳转拦截 */
  shouldOverrideUrlLoading?: string;

  lastUpdateTime?: number;
}

export interface ILegadoRssFormValues
  extends Omit<ILegadoRss, 'sourceUrl' | 'sourceGroup'> {
  sourceUrl?: string;
  sourceGroup?: string[];
}
