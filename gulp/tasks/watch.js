const gulp = require('gulp');
const url = require('url');
const proxy = require('proxy-middleware');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('watch', () => {
  const proxyOptions = url.parse('http://localhost:5000/');
  proxyOptions.route = '/';

  const proxyOptions2 = url.parse('http://localhost:5000/api');
  proxyOptions2.route = '/api';

  browserSync.init({
    notify: false,
    server: {
      baseDir: 'public',
      middleware: [proxy(proxyOptions), proxy(proxyOptions2)],
    },
  });
  watch('./client/**/*.ejs', () =>
    gulp.start('ejs')
  );
  watch('./public/index.html', () =>
    browserSync.reload()
  );
  watch('./client/styles/**/*.css', () =>
    gulp.start('cssInject')
  );
  watch('./client/**/*.js', () =>
    gulp.start('clientScriptsRefresh')
  );
});


gulp.task('cssInject', ['styles'], () =>
  gulp.src('./public/styles/styles.css')
    .pipe(browserSync.stream())
);

gulp.task('clientScriptsRefresh', ['clientScripts'], () =>
  browserSync.reload()
);