const preset = require("eslint-sammy-preset");

module.exports = {
  ...preset,
  {
    rules: {
      ...preset.rules,
      'prefer-reflect': 'off'
    }
  }
}