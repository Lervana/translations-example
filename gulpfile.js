var gulp = require('gulp');
var babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');
var po2json = require('gulp-po2json');

gulp.task('pot', function () {
  return gulp.src(['example/frontend/**/*.jsx'])
    .pipe(plumber())
    .pipe(babel({
      plugins: [
        ["babel-gettext-plugin", {
          functionNames: {
            "t": ['msgid'],
            "nt": ['msgid', 'msgid_plural', 'count'],
            "tCtx": ['msgctxt', 'msgid']
          },
          fileName: 'locales/raw/template.pot'
        }]
      ]
    }));
});

gulp.task('po2json', function () {
  return gulp.src(['locales/**/*.po'])
    .pipe(po2json({ format: "mf" }))
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest('locales/converted'));
});
