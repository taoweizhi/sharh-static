const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const babel = require('gulp-babel');

const defaultLog = (err) => {
  gutil.log(gutil.colors.red('[Error]'), err.toString());
};

const addMinToFileName = (path) => {
  if (!path.basename.endsWith('.min'))
    path.basename += '.min'
};

gulp.task('CompressJS', () => {
  gulp.src('dist/src/js/*.js')
    .pipe(uglify())
    .on('error', defaultLog)
    .pipe(rename(addMinToFileName))
    .pipe(gulp.dest('static/js/'))
});

gulp.task('CompressCSS', () => {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .on('error', defaultLog)
    .pipe(rename(addMinToFileName))
    .pipe(gulp.dest('static/css/'))
});

gulp.task('ToES5', () => {
  gulp.src('src/js/*.js')
    .pipe(babel())
    .on('error', defaultLog)
    .pipe(gulp.dest('dist/src/js/'))
});
