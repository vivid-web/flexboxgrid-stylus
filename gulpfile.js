'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');

var directories = {
    stylus: {
        input: './src/flexbox-grid.styl',
        output: {
            folder: './dist',
            fileName: 'flexbox-grid.css'
        }
    },
    jade: {
        input: './assets/jade/index.jade',
        output: {
            folder: './docs',
            fileName: 'index.html'
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

// Docs
gulp.task('docs-fonts', function() {
    return gulp
        .src(['./assets/fonts/**'])
        .pipe(gulp.dest('./docs/dist/fonts/'));
});

gulp.task('docs-css', function() {
    return gulp
        .src(['./assets/stylus/stylesheet.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(prefix())
        .pipe(cleanCss())
        .pipe(rename('stylesheet.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./docs/dist/css'));
});

gulp.task('docs-html', function() {
    return gulp
        .src(directories.jade.input)
        .pipe(jade({
            pretty: true
        }))
        .pipe(rename(directories.jade.output.fileName))
        .pipe(gulp.dest(directories.jade.output.folder));
});

gulp.task('docs', ['docs-fonts', 'docs-css', 'docs-html']);

gulp.task('default', ['build', 'docs']);