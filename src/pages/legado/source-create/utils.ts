import pickBy from 'lodash-es/pickBy';
import type { ILegadoSourceFormValues, ILegadoSourceItem } from '../type';

export const transformSubmitValues = (params: ILegadoSourceFormValues) => {
  const ruleSearch = pickBy(
    {
      /** 搜索-书名规则 */
      name: params['ruleSearch.name'],
      /** 搜索-作者规则 */
      author: params['ruleSearch.author'],
      /** 搜索-书籍列表规则 */
      bookList: params['ruleSearch.bookList'],
      /** 搜索-详情页URL规则 */
      bookUrl: params['ruleSearch.bookUrl'],
      /** 搜索-封面规则 */
      coverUrl: params['ruleSearch.coverUrl'],
      /** 搜索-简介规则 */
      intro: params['ruleSearch.intro'],
      /** 搜索-分类规则 */
      kind: params['ruleSearch.kind'],
      /** 搜索-最新章节规则 */
      lastChapter: params['ruleSearch.lastChapter'],
      /** 搜索-字数规则 */
      wordCount: params['ruleSearch.wordCount'],
      /** 搜索-校验关键字 */
      checkKeyWord: params['ruleSearch.checkKeyWord'],
    },
    (v) => v !== null && v !== undefined,
  );
  const ruleExplore = pickBy(
    {
      /** 发现-书名规则 */
      name: params['ruleExplore.name'],
      /** 发现-作者规则 */
      author: params['ruleExplore.author'],
      /** 发现-书籍列表规则 */
      bookList: params['ruleExplore.bookList'],
      /** 发现-详情页URL规则 */
      bookUrl: params['ruleExplore.bookUrl'],
      /** 发现-封面规则 */
      coverUrl: params['ruleExplore.coverUrl'],
      /** 发现-简介规则 */
      intro: params['ruleExplore.intro'],
      /** 发现-分类规则 */
      kind: params['ruleExplore.kind'],
      /** 发现-最新章节规则 */
      lastChapter: params['ruleExplore.lastChapter'],
      /** 发现-字数规则 */
      wordCount: params['ruleExplore.wordCount'],
    },
    (v) => v !== null && v !== undefined,
  );
  const ruleBookInfo = pickBy(
    {
      /** 详情-书名规则 */
      name: params['ruleBookInfo.name'],
      /** 详情-作者规则 */
      author: params['ruleBookInfo.author'],
      /** 详情-目录URL规则 */
      tocUrl: params['ruleBookInfo.tocUrl'],
      /** 详情-封面规则 */
      coverUrl: params['ruleBookInfo.coverUrl'],
      /** 详情-简介规则 */
      intro: params['ruleBookInfo.intro'],
      /** 详情-分类规则 */
      kind: params['ruleBookInfo.kind'],
      /** 详情-最新章节规则 */
      lastChapter: params['ruleBookInfo.lastChapter'],
      /** 详情-字数规则 */
      wordCount: params['ruleBookInfo.wordCount'],
      /** 详情-预处理规则 */
      init: params['ruleBookInfo.init'],
      /** 详情-下载URL规则 */
      downloadUrls: params['ruleBookInfo.downloadUrls'],
      /** 详情-允许修改书名作者 */
      canReName: params['ruleBookInfo.canReName'],
    },
    (v) => v !== null && v !== undefined,
  );
  const ruleToc = pickBy(
    {
      /** 目录-目录列表规则 */
      chapterList: params['ruleToc.chapterList'],
      /** 目录-章节名称规则 */
      chapterName: params['ruleToc.chapterName'],
      /** 目录-章节URL规则 */
      chapterUrl: params['ruleToc.chapterUrl'],
      /** 目录-目录下一页规则 */
      nextTocUrl: params['ruleToc.nextTocUrl'],
      /** 目录-格式化规则 */
      formatJs: params['ruleToc.formatJs'],
      /** 目录-更新前js */
      preUpdateJs: params['ruleToc.preUpdateJs'],
      /** 目录-购买标识 */
      isPay: params['ruleToc.isPay'],
      /** 目录-VIP标识 */
      isVip: params['ruleToc.isVip'],
      /** 目录-volume标识 */
      isVolume: params['ruleToc.isVolume'],
      /** 目录-更新时间 */
      updateTime: undefined,
    },
    (v) => v !== null && v !== undefined,
  );
  const ruleContent = pickBy(
    {
      /** 正文-正文规则 */
      content: params['ruleContent.content'],
      /** 正文-章节名称规则 */
      title: params['ruleContent.title'],
      /** 正文-正文下一页URL规则 */
      nextContentUrl: params['ruleContent.nextContentUrl'],
      /** 正文-图片解密 */
      imageDecode: params['ruleContent.imageDecode'],
      /** 正文-图片样式 */
      imageStyle: params['ruleContent.imageStyle'],
      /** 正文-替换规则 */
      replaceRegex: params['ruleContent.replaceRegex'],
      /** 正文-资源正则 */
      sourceRegex: params['ruleContent.sourceRegex'],
      /** 正文-WebView JS */
      webJs: params['ruleContent.webJs'],
      /** 正文-购买操作 */
      payAction: params['ruleContent.payAction'],
    },
    (v) => v !== null && v !== undefined,
  );

  const data = pickBy(
    {
      bookSourceType: params.bookSourceType,
      enabled: params.enabled,
      enabledExplore: params.enabledExplore,
      enabledCookieJar: params.enabledCookieJar,
      customOrder: params.customOrder ?? 0,
      weight: params.weight ?? 0,

      /** 源URL */
      bookSourceUrl: params.bookSourceUrl,
      /** 源名称 */
      bookSourceName: params.bookSourceName,
      /** 源分组 */
      bookSourceGroup: params.bookSourceGroup,
      /** 源注释 */
      bookSourceComment: params.bookSourceComment,

      /** 书籍URL正则 */
      bookUrlPattern: params.bookUrlPattern,
      /** 请求头 */
      header: params.header,
      /** 并发率 */
      concurrentRate: params.concurrentRate,
      /** 登录URL */
      loginUrl: params.loginUrl,
      /** 登录UI */
      loginUi: params.loginUi,
      /** 登录检查js */
      loginCheckJs: params.loginCheckJs,
      /** 封面解密 */
      coverDecodeJs: params.coverDecodeJs,
      /** 变量说明 */
      variableComment: params.variableComment,
      /** jslib */
      jsLib: params.jsLib,

      /** 搜索地址 */
      searchUrl: params.searchUrl,
      /** 搜索规则 */
      ruleSearch,

      /** 发现地址规则 */
      exploreUrl: params.exploreUrl,
      /** 发现规则 */
      ruleExplore,

      /** 详情规则 */
      ruleBookInfo,

      /** 目录规则 */
      ruleToc,

      /** 正文规则 */
      ruleContent,

      lastUpdateTime: Date.now(),
      respondTime: 180000,
    } as ILegadoSourceItem,
    (v) => v !== null && v !== undefined,
  );

  return data;
};

export const transformSourceItemToFormValues = (
  values: ILegadoSourceItem,
): ILegadoSourceFormValues => {
  return pickBy(
    {
      bookSourceType: values.bookSourceType,
      enabled: values.enabled,
      enabledExplore: values.enabledExplore,
      enabledCookieJar: values.enabledCookieJar,
      customOrder: values.customOrder,
      weight: values.weight,

      bookSourceUrl: values.bookSourceUrl,
      bookSourceName: values.bookSourceName,
      bookSourceGroup: values.bookSourceGroup,
      bookSourceComment: values.bookSourceComment,

      bookUrlPattern: values.bookUrlPattern,
      header: values.header,
      concurrentRate: values.concurrentRate,
      loginUrl: values.loginUrl,
      loginUi: values.loginUi,
      loginCheckJs: values.loginCheckJs,
      coverDecodeJs: values.coverDecodeJs,
      variableComment: values.variableComment,
      jsLib: values.jsLib,

      searchUrl: values.searchUrl,
      'ruleSearch.name': values.ruleSearch?.name,
      'ruleSearch.author': values.ruleSearch?.author,
      'ruleSearch.bookList': values.ruleSearch?.bookList,
      'ruleSearch.bookUrl': values.ruleSearch?.bookUrl,
      'ruleSearch.coverUrl': values.ruleSearch?.coverUrl,
      'ruleSearch.intro': values.ruleSearch?.intro,
      'ruleSearch.kind': values.ruleSearch?.kind,
      'ruleSearch.lastChapter': values.ruleSearch?.lastChapter,
      'ruleSearch.wordCount': values.ruleSearch?.wordCount,
      'ruleSearch.checkKeyWord': values.ruleSearch?.checkKeyWord,

      exploreUrl: values.exploreUrl,
      'ruleExplore.name': values.ruleExplore?.name,
      'ruleExplore.author': values.ruleExplore?.author,
      'ruleExplore.bookList': values.ruleExplore?.bookList,
      'ruleExplore.bookUrl': values.ruleExplore?.bookUrl,
      'ruleExplore.coverUrl': values.ruleExplore?.coverUrl,
      'ruleExplore.intro': values.ruleExplore?.intro,
      'ruleExplore.kind': values.ruleExplore?.kind,
      'ruleExplore.lastChapter': values.ruleExplore?.lastChapter,
      'ruleExplore.wordCount': values.ruleExplore?.wordCount,

      'ruleBookInfo.name': values.ruleBookInfo?.name,
      'ruleBookInfo.author': values.ruleBookInfo?.author,
      'ruleBookInfo.tocUrl': values.ruleBookInfo?.tocUrl,
      'ruleBookInfo.coverUrl': values.ruleBookInfo?.coverUrl,
      'ruleBookInfo.intro': values.ruleBookInfo?.intro,
      'ruleBookInfo.kind': values.ruleBookInfo?.kind,
      'ruleBookInfo.lastChapter': values.ruleBookInfo?.lastChapter,
      'ruleBookInfo.wordCount': values.ruleBookInfo?.wordCount,
      'ruleBookInfo.init': values.ruleBookInfo?.init,
      'ruleBookInfo.downloadUrls': values.ruleBookInfo?.downloadUrls,
      'ruleBookInfo.canReName': values.ruleBookInfo?.canReName,

      'ruleToc.chapterList': values.ruleToc?.chapterList,
      'ruleToc.chapterName': values.ruleToc?.chapterName,
      'ruleToc.chapterUrl': values.ruleToc?.chapterUrl,
      'ruleToc.nextTocUrl': values.ruleToc?.nextTocUrl,
      'ruleToc.formatJs': values.ruleToc?.formatJs,
      'ruleToc.preUpdateJs': values.ruleToc?.preUpdateJs,
      'ruleToc.isPay': values.ruleToc?.isPay,
      'ruleToc.isVip': values.ruleToc?.isVip,
      'ruleToc.isVolume': values.ruleToc?.isVolume,
      'ruleToc.updateTime': values.ruleToc?.updateTime,

      'ruleContent.content': values.ruleContent?.content,
      'ruleContent.title': values.ruleContent?.title,
      'ruleContent.nextContentUrl': values.ruleContent?.nextContentUrl,
      'ruleContent.imageDecode': values.ruleContent?.imageDecode,
      'ruleContent.imageStyle': values.ruleContent?.imageStyle,
      'ruleContent.replaceRegex': values.ruleContent?.replaceRegex,
      'ruleContent.sourceRegex': values.ruleContent?.sourceRegex,
      'ruleContent.webJs': values.ruleContent?.webJs,
      'ruleContent.payAction': values.ruleContent?.payAction,
    },
    (value) => value !== null && value !== undefined,
  );
};
