const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const gutil = require('gulp-util');

gulp.task('CompressJS', () => {
  gulp.src('dist/src/js/*.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename( path => {
      if (!path.basename.endsWith('.min'))
        path.basename += '.min'
    }))
    .pipe(gulp.dest('static/js/'))
});

gulp.task('CompressCSS', () => {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename( path => {
      if (!path.basename.endsWith('.min'))
        path.basename += '.min'
    }))
    .pipe(gulp.dest('static/css/'))
});
