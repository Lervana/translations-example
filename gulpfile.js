let gulp = require('gulp');
let babel = require('gulp-babel');
let flatten = require('gulp-flatten');
let plumber = require('gulp-plumber');
let po2json = require('gulp-po2json');

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
