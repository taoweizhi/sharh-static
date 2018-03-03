const gulp = require('gulp');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

gulp.task('Compress', () => {
  gulp.src('dist/src/*.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('static/'))
});
