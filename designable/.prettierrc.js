module.exports = {
    printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80
    // 使用 4 个空格缩进
    tabWidth: 2,
    // 使用 tab 缩进
    useTabs: false,
    // 行尾需要有分号
    semi: false,
    // 使用单引号代替双引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'consistent',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾使用逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格 { foo: bar }
    bracketSpacing: true,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf',
    // 标签属性是否换行
    singleAttributePerLine: false
};
