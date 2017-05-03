const detectNode = require('detect-node');
const runtime = require('./runtime');
const extend = require('./adapter/extend');
const onerror = require('./adapter/onerror');
const caches = require('./adapter/caches');
const loader = require('./adapter/loader');
const include = require('./adapter/include');
const artRule = require('./adapter/rule.art');
const nativeRule = require('./adapter/rule.native');
const htmlMinifier = require('./adapter/html-minifier');
const resolveFilename = require('./adapter/resolve-filename');

/** 模板编译器默认配置 */
const defaults = {

    // 模板内容。如果没有此字段，则会根据 filename 来加载模板内容
    source: null,

    // 模板名
    filename: null,

    // 模板语法规则列表
    rules: [nativeRule, artRule],

    // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能
    // escape 可以防范 XSS 攻击
    escape: true,

    // 是否开启调试模式。如果为 true: {bail:false, cache:false, minimize:false, compileDebug:true}
    debug: detectNode ? process.env.NODE_ENV !== 'production' : false,

    // bail 如果为 true，编译错误与运行时错误都会抛出异常
    bail: false,

    // 是否开启缓存
    cache: true,

    // 是否开启压缩。它会运行 htmlMinifier，将页面 HTML、CSS、CSS 进行压缩输出
    // 如果模板包含没有闭合的 HTML 标签，请不要打开 minimize，否则可能被 htmlMinifier 修复或过滤
    minimize: true,

    // 是否编译调试版。编译为调试版本可以在运行时进行 DEBUG
    compileDebug: false,

    // 模板路径转换器
    resolveFilename: resolveFilename,

    // HTML 压缩器。仅在 NodeJS 环境下有效
    htmlMinifier: htmlMinifier,

    // HTML 压缩器配置。参见 https://github.com/kangax/html-minifier
    htmlMinifierOptions: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        // 运行时自动合并：rules.map(rule => rule.test)
        ignoreCustomFragments: []
    },

    // 错误事件。仅在 bail 为 false 时生效
    onerror: onerror,

    // 模板文件加载器
    loader: loader,

    // 缓存中心适配器（依赖 filename 字段）
    caches: caches,

    // 模板根目录。如果 filename 字段不是本地路径，则在 root 查找模板
    root: '/',

    // 默认后缀名。如果没有后缀名，则会自动添加 extname
    extname: '.art',

    // 忽略的变量。指定模板编译器忽略对指定的变量预先声明
    ignore: [],

    // 导入的模板变量
    imports: runtime

};


/**
 * 继承默认配置
 * @param   {Object}    options
 * @return  {Object}
 */
defaults.$extend = (options = {}) => extend(options, defaults);


// 载入子模板的方法
runtime.$include = include;


module.exports = defaults;