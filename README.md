# Translations on frontend

Today we would like to take you into world of translations. Why?
Because in nowadays big amount of websites is written at least in two
languages.

## Packages
- react-i18next - an internationalization addon for reactjs, based on i18next.
- i18next - internationalization framework.
- i18next-xhr-backend - loads resources from a backend server using xhr.

## Example
In this example we will create translations for polish language. You
should remember that text wrote in "t" function will be read as default,
so if you want to create website with two languages then you only need
to create one translation. Mostly default values are wrote in english.
Another main thing is that translations are sensitive to big letters so
is better to write in lowercase and then use CSS.

### index.jsx
In this file we need to add provider that allows to have translate
function in our components.

```
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const content = (
  <I18nextProvider i18n={i18n}>
    ...
  </I18nextProvider>
);
```

In this code, i18n is imported. This file should contains configuration
for our translations, especially method that allows to load "locales"
into our app.

### component.jsx
So how we can use power of translations? At first we need to add
```@translate(['translation'])```, with its import
```import { translate } from 'react-i18next';```, into our component.
This brings an opportunity to use t-function.

Second we need function that will handle changing our languages.
```
    setLang = (code)=> {
        cookies.set('translations-example', code);
        i18n.changeLanguage(code);
        console.log('Language set to ' + code);
    };
```

And now main dish - how to use t-function. It is very simple you need
only access properties, take t-function
(```const { t } = this.props;```) and use it like that:
```{t('internationalization')}```.

Simple, isn't it?

## Preparing translations
But how we manage translations? In hardest way we can manually create
them. But for what? As programmers we prefer to use automatized
solutions - and because of that we love Gulp.

In big systems programmers aren't responsible for translating them.
This should be work of qualified translators. But they won't create json
files for our purpose. We send them a .pot files, which can be loaded
into editors like Poedit. After translations ends we receiving .po
files, which can be automatically converted to json.

All this conversions can be done by Gulp:

```
gulp.task('pot', function () {
  return gulp.src(['example/frontend/**/*.jsx'])
    .pipe(plumber())
    .pipe(babel({
      plugins: [
        ['babel-gettext-plugin', {
          functionNames: {
            't': ['msgid']
          },
          fileName: 'locales/raw/template.pot'
        }]
      ]
    }));
});

gulp.task('po2json', function () {
  return gulp.src(['locales/**/*.po'])
    .pipe(po2json({ format: 'mf' }))
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest('locales/converted'));
});

```
