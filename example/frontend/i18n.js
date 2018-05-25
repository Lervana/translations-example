import i18n             from 'i18next';
import XHR              from 'i18next-xhr-backend';

function loadLocales(url, options, callback) {
  try {
    let waitForLocale = require('bundle-loader!../../locales/converted' + url);
    waitForLocale((locale)=> {
      console.log(locale);
      return callback(locale, { status: '200' });
    });
  } catch (err) {
    callback(null, { status: '404' });
  }
}

i18n
  .use(XHR)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: '/{{lng}}.json',
      parse: (data)=> data,
      ajax: loadLocales
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      lookupCookie: 'translations-example',
      lookupLocalStorage: 'translations-example',
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
