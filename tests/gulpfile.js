// Imports
var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');


// Compile typescript files
gulp.task('ts', ['clean'], function () {
    return gulp
        .src(["./src/**/*.ts"], { base: './src' })
        .pipe(ts({ module: 'commonjs', target: 'es6', noImplicitAny: false, allowJs: true, allowUnreachableCode: true }))
        .pipe(gulp.dest('./src'));
});

// Removes compiled js files
gulp.task('clean', function () {
    return gulp
        .src([
            './src/**/*.js',
            './dist'
        ], { read: false })
        .pipe(clean())
});