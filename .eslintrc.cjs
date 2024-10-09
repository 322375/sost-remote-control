module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
  ],
  rettier: {
    singleQuote: true, // 使用单引号代替双引号
    semi: true, // 在每行代码末尾添加分号
    printWidth: 100, // 设置代码的最大打印宽度为100个字符
    //trailingComma: "all", // 在多行对象或数组的最后一项后面添加逗号
    // 在对象大括号内不添加空格
    bracketSpacing: false,
  },
};

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
