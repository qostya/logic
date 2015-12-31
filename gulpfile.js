"use strict";
let gulp = require('gulp'),
    concat = require('gulp-concat'),
    gulpBabel = require('gulp-babel'),
    modules = require('./public/js/modules.json'),
    change = require('gulp-change'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    webserver = require('gulp-webserver'),
    sequence = require('run-sequence'),
    sass = require('gulp-sass');

let pathToSrc = './public/',
    pathToSrcJs = pathToSrc + 'js/',
    pathOfBuild = './build/';

function toJsModule (content) {
    return content.replace('\'use strict\';', '');
}

function createAngularModules() {
    var modulesCache = '';

    for (let i = 0, l = modules.custom.length; l > i; i++) {
        modulesCache += 'angular.module("' + modules.custom[i] + '", []);\n\n';
    }

    return modulesCache;
}

function createMainModule() {
    var allModules = modules.custom.concat(modules.vendor);

    return 'angular.module(\'App\', ["' + allModules.join('", "') + '"]);';
}

function concatContentAndCustomData(data) {
    return function (content) {
        return data + '\n\n' + content;
    }
}


gulp.task('concatModules', () => {
    return gulp.src([
        pathToSrcJs + 'routes/*.js',
        pathToSrcJs + 'modules/**/*.js',
        pathToSrcJs + 'constants.js'
    ])
    .pipe(jshint({lookup: true}))
    .pipe(jshint.reporter(stylish))
    .pipe(change(toJsModule))
    .pipe(concat('app.js'))
    .pipe(change(concatContentAndCustomData(createMainModule())))
    .pipe(change(concatContentAndCustomData(createAngularModules())))
    .pipe(gulpBabel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest( pathToSrcJs ));
});

gulp.task('compileSass', () => {
    return gulp.src([
        pathToSrc + 'sass/*.scss'
    ])
        .pipe(concat('style.scss'))
        .pipe(sass({
            //outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(pathToSrc + 'css/'))
        .pipe(gulp.dest(pathOfBuild + 'css/'));
});

gulp.task('createServer', () => {
    return gulp.src('public')
        .pipe(webserver(
            {
                livereload: true,
                port: 8282
            }
        ));
});

gulp.task('concatVendor', () => {
    return gulp.src([
        pathToSrcJs + 'vendor/angular/angular.js',
        pathToSrcJs + 'vendor/angular-ui-router/release/angular-ui-router.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(pathOfBuild + 'js/')
    );
});

gulp.task('default', () => {
    sequence(
        'concatModules',
        'createServer',
        'compileSass',
        (error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log('Default finished successfully');
            }
        }
    );
});

gulp.task('build', () => {
    sequence(
        'concatModules',
        'concatVendor',
        (error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log('Build finished successfully');
            }
        }
    );
});