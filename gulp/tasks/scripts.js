const gulp = require('gulp');
const webpack = require('webpack');
const config = require('../../webpack.config.js');

gulp.task('clientScripts', ['modernizr'], done =>
  webpack(config.client, (error, stats) => {
    if (error) {
      console.log(error.toString());
    }
    console.log(stats.toString());
    done();
  }));