'use strict';

var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-ruby-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    webserver    = require('gulp-webserver'),
    concat       = require('gulp-concat'),
    fileinclude  = require('gulp-file-include'),
    imagemin     = require('gulp-imagemin'),
    p            = require('./package.json');


gulp.task('webserver', function() {
  gulp.src('build/')
    .pipe(webserver({
      livereload: true,
      port: 3501,
      open: true
    }));
});

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat(p.name + '.min.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('styles', function(){
  gulp.src('src/scss/**/*.scss')
      .pipe(plumber())
      .pipe(sass({style: 'expanded'}))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('build/css/'));
});

gulp.task('html', function () {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('fileinclude', function() {
  gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'));
});



gulp.task('images', function () {
  return gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('build/img/'));
});

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch(['src/*.html', 'src/inc/**/*.html'], ['fileinclude']);
  gulp.watch(['src/img/*'], ['images']);
});

gulp.task('default', ['fileinclude', 'html', 'scripts', 'styles', 'images', 'watch', 'webserver']);
gulp.task('build', ['fileinclude', 'html', 'scripts', 'styles', 'images']);

module.exports = gulp;
