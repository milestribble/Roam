const gulp = require('gulp');
const modernizr = require('gulp-modernizr');

gulp.task('modernizr', () =>
  gulp.src([
    './client/styles/**/*.css',
    './client/**/*.js',
  ])
    .pipe(modernizr({
      options: [
        'setClasses',
      ],
    }))
    .pipe(gulp.dest('./public/scripts/'))
);
