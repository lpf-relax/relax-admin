export interface ILegadoSource {
  bookSourceType?: number;
  enabled?: boolean;
  enabledExplore?: boolean;
  enabledCookieJar?: boolean;
  customOrder?: number;
  weight?: number;

  /** 源URL */
  bookSourceUrl: string;
  /** 源名称 */
  bookSourceName?: string;
  /** 源分组 */
  bookSourceGroup?: string;
  /** 源注释 */
  bookSourceComment?: string;

  /** 书籍URL正则 */
  bookUrlPattern?: string;
  /** 请求头 */
  header?: string;
  /** 并发率 */
  concurrentRate?: string;
  /** 登录URL */
  loginUrl?: string;
  /** 登录UI */
  loginUi?: string;
  /** 登录检查js */
  loginCheckJs?: string;
  /** 封面解密 */
  coverDecodeJs?: string;
  /** 变量说明 */
  variableComment?: string;
  /** jslib */
  jsLib?: string;

  /** 搜索地址 */
  searchUrl?: string;
  /** 搜索规则 */
  ruleSearch?: {
    /** 搜索-书名规则 */
    name?: string;
    /** 搜索-作者规则 */
    author?: string;
    /** 搜索-书籍列表规则 */
    bookList?: string;
    /** 搜索-详情页URL规则 */
    bookUrl?: string;
    /** 搜索-封面规则 */
    coverUrl?: string;
    /** 搜索-简介规则 */
    intro?: string;
    /** 搜索-分类规则 */
    kind?: string;
    /** 搜索-最新章节规则 */
    lastChapter?: string;
    /** 搜索-字数规则 */
    wordCount?: string;
    /** 搜索-校验关键字 */
    checkKeyWord?: string;
  };

  /** 发现地址规则 */
  exploreUrl?: string;
  /** 发现规则 */
  ruleExplore?: {
    /** 发现-书名规则 */
    name?: string;
    /** 发现-作者规则 */
    author?: string;
    /** 发现-书籍列表规则 */
    bookList?: string;
    /** 发现-详情页URL规则 */
    bookUrl?: string;
    /** 发现-封面规则 */
    coverUrl?: string;
    /** 发现-简介规则 */
    intro?: string;
    /** 发现-分类规则 */
    kind?: string;
    /** 发现-最新章节规则 */
    lastChapter?: string;
    /** 发现-字数规则 */
    wordCount?: string;
  };

  /** 详情规则 */
  ruleBookInfo?: {
    /** 详情-书名规则 */
    name?: string;
    /** 详情-作者规则 */
    author?: string;
    /** 详情-目录URL规则 */
    tocUrl?: string;
    /** 详情-封面规则 */
    coverUrl?: string;
    /** 详情-简介规则 */
    intro?: string;
    /** 详情-分类规则 */
    kind?: string;
    /** 详情-最新章节规则 */
    lastChapter?: string;
    /** 详情-字数规则 */
    wordCount?: string;
    /** 详情-预处理规则 */
    init?: string;
    /** 详情-下载URL规则 */
    downloadUrls?: string;
    /** 详情-允许修改书名作者 */
    canReName?: boolean;
  };

  /** 目录规则 */
  ruleToc?: {
    /** 目录-目录列表规则 */
    chapterList?: string;
    /** 目录-章节名称规则 */
    chapterName?: string;
    /** 目录-章节URL规则 */
    chapterUrl?: string;
    /** 目录-目录下一页规则 */
    nextTocUrl?: string;
    /** 目录-格式化规则 */
    formatJs?: string;
    /** 目录-更新前js */
    preUpdateJs?: string;
    /** 目录-购买标识 */
    isPay?: boolean;
    /** 目录-VIP标识 */
    isVip?: boolean;
    /** 目录-volume标识 */
    isVolume?: boolean;
    /** 目录-更新时间 */
    updateTime?: string;
  };

  /** 正文规则 */
  ruleContent?: {
    /** 正文-正文规则 */
    content?: string;
    /** 正文-章节名称规则 */
    title?: string;
    /** 正文-正文下一页URL规则 */
    nextContentUrl?: string;
    /** 正文-图片解密 */
    imageDecode?: string;
    /** 正文-图片样式 */
    imageStyle?: string;
    /** 正文-替换规则 */
    replaceRegex?: string;
    /** 正文-资源正则 */
    sourceRegex?: string;
    /** 正文-WebView JS */
    webJs?: string;
    /** 正文-购买操作 */
    payAction?: string;
  };

  lastUpdateTime?: number;
  respondTime?: number;
}

export interface ILegadoSourceFormValues {
  bookSourceType?: number;
  enabled?: boolean;
  enabledExplore?: boolean;
  enabledCookieJar?: boolean;
  customOrder?: number;
  weight?: number;

  /** 源URL */
  bookSourceUrl?: string;
  /** 源名称 */
  bookSourceName?: string;
  /** 源分组 */
  bookSourceGroup?: string[];
  /** 源注释 */
  bookSourceComment?: string;

  /** 书籍URL正则 */
  bookUrlPattern?: string;
  /** 请求头 */
  header?: string;
  /** 并发率 */
  concurrentRate?: string;
  /** 登录URL */
  loginUrl?: string;
  /** 登录UI */
  loginUi?: string;
  /** 登录检查js */
  loginCheckJs?: string;
  /** 封面解密 */
  coverDecodeJs?: string;
  /** 变量说明 */
  variableComment?: string;
  /** jslib */
  jsLib?: string;

  /** 搜索地址 */
  searchUrl?: string;
  /** 搜索-书名规则 */
  'ruleSearch.name'?: string;
  /** 搜索-作者规则 */
  'ruleSearch.author'?: string;
  /** 搜索-书籍列表规则 */
  'ruleSearch.bookList'?: string;
  /** 搜索-详情页URL规则 */
  'ruleSearch.bookUrl'?: string;
  /** 搜索-封面规则 */
  'ruleSearch.coverUrl'?: string;
  /** 搜索-简介规则 */
  'ruleSearch.intro'?: string;
  /** 搜索-分类规则 */
  'ruleSearch.kind'?: string;
  /** 搜索-最新章节规则 */
  'ruleSearch.lastChapter'?: string;
  /** 搜索-字数规则 */
  'ruleSearch.wordCount'?: string;
  /** 搜索-校验关键字 */
  'ruleSearch.checkKeyWord'?: string;

  /** 发现地址规则 */
  exploreUrl?: string;
  /** 发现-书名规则 */
  'ruleExplore.name'?: string;
  /** 发现-作者规则 */
  'ruleExplore.author'?: string;
  /** 发现-书籍列表规则 */
  'ruleExplore.bookList'?: string;
  /** 发现-详情页URL规则 */
  'ruleExplore.bookUrl'?: string;
  /** 发现-封面规则 */
  'ruleExplore.coverUrl'?: string;
  /** 发现-简介规则 */
  'ruleExplore.intro'?: string;
  /** 发现-分类规则 */
  'ruleExplore.kind'?: string;
  /** 发现-最新章节规则 */
  'ruleExplore.lastChapter'?: string;
  /** 发现-字数规则 */
  'ruleExplore.wordCount'?: string;

  /** 详情-书名规则 */
  'ruleBookInfo.name'?: string;
  /** 详情-作者规则 */
  'ruleBookInfo.author'?: string;
  /** 详情-目录URL规则 */
  'ruleBookInfo.tocUrl'?: string;
  /** 详情-封面规则 */
  'ruleBookInfo.coverUrl'?: string;
  /** 详情-简介规则 */
  'ruleBookInfo.intro'?: string;
  /** 详情-分类规则 */
  'ruleBookInfo.kind'?: string;
  /** 详情-最新章节规则 */
  'ruleBookInfo.lastChapter'?: string;
  /** 详情-字数规则 */
  'ruleBookInfo.wordCount'?: string;
  /** 详情-预处理规则 */
  'ruleBookInfo.init'?: string;
  /** 详情-下载URL规则 */
  'ruleBookInfo.downloadUrls'?: string;
  /** 详情-允许修改书名作者 */
  'ruleBookInfo.canReName'?: boolean;

  /** 目录-目录列表规则 */
  'ruleToc.chapterList'?: string;
  /** 目录-章节名称规则 */
  'ruleToc.chapterName'?: string;
  /** 目录-章节URL规则 */
  'ruleToc.chapterUrl'?: string;
  /** 目录-目录下一页规则 */
  'ruleToc.nextTocUrl'?: string;
  /** 目录-格式化规则 */
  'ruleToc.formatJs'?: string;
  /** 目录-更新前js */
  'ruleToc.preUpdateJs'?: string;
  /** 目录-购买标识 */
  'ruleToc.isPay'?: boolean;
  /** 目录-VIP标识 */
  'ruleToc.isVip'?: boolean;
  /** 目录-volume标识 */
  'ruleToc.isVolume'?: boolean;
  /** 目录-更新时间 */
  'ruleToc.updateTime'?: string;

  /** 正文-正文规则 */
  'ruleContent.content'?: string;
  /** 正文-章节名称规则 */
  'ruleContent.title'?: string;
  /** 正文-正文下一页URL规则 */
  'ruleContent.nextContentUrl'?: string;
  /** 正文-图片解密 */
  'ruleContent.imageDecode'?: string;
  /** 正文-图片样式 */
  'ruleContent.imageStyle'?: string;
  /** 正文-替换规则 */
  'ruleContent.replaceRegex'?: string;
  /** 正文-资源正则 */
  'ruleContent.sourceRegex'?: string;
  /** 正文-WebView JS */
  'ruleContent.webJs'?: string;
  /** 正文-购买操作 */
  'ruleContent.payAction'?: string;
}
