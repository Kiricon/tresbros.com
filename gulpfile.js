const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-ruby-sass');
const cleanCSS = require('gulp-clean-css'); 
const cache = require('gulp-cached');
const fs = require('fs');

const scssPath = './scss/**/*.scss';

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', () => {
    gulp.watch('./*.html', () => {
        browserSync.reload();
    });

    gulp.watch('./js/**/*.js', () => {
        browserSync.reload();
    });

    gulp.watch(scssPath, () => {
        return sass(scssPath)
          .on('error', sass.logError)
          .pipe(cache('csscache'))
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest('./css'))
          .pipe(browserSync.stream())
    });
});

gulp.task('default', ['browser-sync', 'watch']);