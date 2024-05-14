// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
  ],
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'], // 指定 .scss 檔
      rules: {
        'scss/no-global-function-names': null, // 關閉此規則
      },
    },
  ],
  rules: {
    // ...
    // 'unit-allowed-list': ['em', 'rem', 'deg', 'px', 'vh'], // 可使用的單位
  },
}
