'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var directories = {
    stylus: {
        input: './src/flexbox-grid.styl',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    minify: {
        input: './src/flexbox-grid.styl',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.min.css'
        }
    }
};

// Dist
gulp.task('dist-css', function() {
    return gulp
        .src(directories.stylus.input)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(prefix())
        .pipe(rename(directories.stylus.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.stylus.output.folder));
});

gulp.task('dist-minify', function() {
    return gulp
        .src(directories.minify.input)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename(directories.minify.output.fileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(directories.minify.output.folder));
});

gulp.task('build', ['dist-css', 'dist-minify']);

gulp.task('default', ['build']);