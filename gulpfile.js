'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var directories = {
  stylus: {
    input: './src/flexboxgrid.styl',
    output: {
      folder: './dist',
      fileName: 'flexboxgrid.css'
    }
  },
  minify: {
    input: './src/flexboxgrid.styl',
    output: {
      folder: './dist',
      fileName: 'flexboxgrid.min.css'
    }
  }
};

// Dist
function distCss() {
  return gulp
    .src(directories.stylus.input)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(rename(directories.stylus.output.fileName))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(directories.stylus.output.folder));
}

function distMinify() {
  return gulp
    .src(directories.minify.input)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cleanCss())
    .pipe(rename(directories.minify.output.fileName))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(directories.minify.output.folder));
}

var build = gulp.series(gulp.parallel(distCss, distMinify));

gulp.task('build', build);

gulp.task('default', build);
