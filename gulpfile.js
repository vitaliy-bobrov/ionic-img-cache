'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const config = {
  scripts: {
   src: './ionic-img-cache.js',
   dest: './'
  }
};

function onError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('scripts', () => gulp.src(config.scripts.src)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.ngAnnotate())
  .pipe($.uglify())
  .pipe($.rename({
    suffix: '.min',
    extname: '.js'
  }))
  .pipe(gulp.dest(config.scripts.dest))
  .pipe($.size({title: 'scripts'}))
);

gulp.task('build', gulp.series('scripts'));

gulp.task('watch', () => gulp.watch(config.scripts.src, gulp.series('scripts')));

gulp.task('default', gulp.series('build', 'watch'));
