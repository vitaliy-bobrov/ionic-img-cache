
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {
  scripts: {
   src: './ionic-img-cache.js',
   dest: './'
  }
};

var onError = function (error) {
  console.log(error.toString());
  this.emit('end');
};

gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.ngAnnotate())
  .pipe($.uglify({preserveComments: 'some'}))
  .pipe($.rename({
    suffix: '.min',
    extname: '.js'
  }))
  .pipe(gulp.dest(config.scripts.dest))
  .pipe($.size({title: 'scripts'}));
});

gulp.task('build', function() {
  gulp.start('scripts');
});

gulp.task('watch', function() {
  gulp.watch(config.scripts.src, ['scripts']);
});

gulp.task('default', ['build'], function() {
  gulp.start('watch');
});
