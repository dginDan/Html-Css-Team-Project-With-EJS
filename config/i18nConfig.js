const { I18n } = require('i18n');
const path = require('path');


const i18n = new I18n({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  directory:'./locales',
  textsVarName: 'trad'
});

module.exports = i18n;