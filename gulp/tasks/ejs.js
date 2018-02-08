const gulp = require('gulp');
const ejs = require('gulp-ejs');

gulp.task('ejs', () =>
  gulp.src('./client/index.ejs')
    .pipe(ejs({}, {}, { ext: '.html' }))
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end')
    })
    .pipe(gulp.dest('./public'))
);