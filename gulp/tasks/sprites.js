const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svg2png = require('gulp-svg2png');
const rename = require('gulp-rename');
const del = require('del');
const svgComponentEjs = require('../plugins/gulp-sprite-component-ejs');
// const svgEjs = require('../plugins/gulp-sprite-ejs');
const merge = require('merge-stream');

const config = {
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: () =>
          (sprite, render) =>
            render(sprite).split('.svg').join('.png') },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css',
        },
      },
    },
  },
};

gulp.task('beginClean', () =>
  del(['./temp/sprite', './public/images/sprites'])
);

gulp.task('createSprite', ['beginClean'], () =>
  gulp.src('./client/assets/svg/**/*.svg')
    .pipe(svgSprite(config))
    // .pipe(water => {
    //   console.log(water)
    //   return water
    // })
    .pipe(gulp.dest('./temp/sprite/'))
);

gulp.task('createSvgComponents', ['createSprite'], () =>
  gulp.src('./temp/sprite/css/sprite*.svg')
    .pipe(svgComponentEjs())
    .pipe(gulp.dest('./client/components/'))
);

// gulp.task('createSvgEjs', ['createSprite'], () =>
//   gulp.src('./temp/sprite/css/sprite*.svg')
//     .pipe(svgEjs())
//     .pipe(rename('sprite.ejs'))
//     .pipe(gulp.dest('./client/assets/svg/'))
// );


gulp.task('createPngCopy', ['createSprite'], () =>
  gulp.src('./temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./temp/sprite/css'))
);

gulp.task('copySpriteCSS', ['createSprite'], () =>
  gulp.src('./temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./client/styles/modules'))
);

gulp.task('copySpriteGraphic', ['createPngCopy'], () =>
  gulp.src('./temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./public/images/sprites'))
);

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], () =>
  del(['./temp'])
);

gulp.task('icons', ['beginClean', 'createSprite', 'createSvgComponents', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
