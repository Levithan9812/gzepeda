var gulp              = require('gulp');
var concat            = require('gulp-concat');
var minifycss         = require('gulp-minify-css')
var removeSourcemaps  = require('gulp-remove-sourcemaps');
var rename            = require("gulp-rename");
var sourcemaps        = require('gulp-sourcemaps');
var sass              = require('gulp-sass');
var uglify            = require('gulp-uglify');
sass.compiler         = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    //.pipe(removeSourcemaps())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass_ckeditor', function () {
  return gulp.src('./scss/style_ckeditor.scss')
    .pipe(sass.sync().on('error', sass.logError))
    //.pipe(removeSourcemaps())
    .pipe(gulp.dest('./css'));
});

gulp.task('cssmin', function () {
  return gulp.src('./css/style.css')
    .pipe(minifycss({keepSpecialComments : 0}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('cssmin_ckeditor', function () {
  return gulp.src('./css/style_ckeditor.css')
    .pipe(minifycss({keepSpecialComments : 0}))
    .pipe(rename('style_ckeditor.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('cssrename', function () {
  return gulp.src('./css/style.css')
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('cssrename_ckeditor', function () {
  return gulp.src('./css/style_ckeditor.css')
    .pipe(rename('style_ckeditor.min.css'))
    .pipe(gulp.dest('./css'));
});

var js_scripts_header = [
  './js-src/bootstrap-select-implement.js'
];

var js_scripts_footer = [
  '../../contrib/bootstrap5/dist/bootstrap/5.3.2/dist/js/bootstrap.bundle.js',
  '../../../libraries/simple-parallax/dist/simpleParallax.min.js',
  /* Custom Code */
  './js-src/scrolling-gallery.js',
  './js-src/scrolling-logo-client.js',
  './js-src/slider-card-tabs.js',
  './js-src/hero-parallax.js',
  './js-src/boomers-modal.js'
  /*'./js-src/colleges.js',
  './js-src/sidebar-menu.js',
  './js-src/slider-image-with-caption.js',
  './js-src/jquery.easing.min.js',
  './js-src/events.js',
  './js-src/sticky-footer.js',
  './js-src/important-dates-events.js',
  './js-src/alert.js',
  './js-src/main-nav.js',
  './js-src/scroll-top.js',
  './js-src/sticky-footer-fix.js',
  './js-src/tabs.js',
  './js-src/language-toggle.js',
  './js-src/gallery.js',*/
];

gulp.task('jsheader', function () {
  return gulp.src(js_scripts_header)
    .pipe(concat('gzepeda_theme.scripts-header.js'))
    //.pipe(removeSourcemaps())
    .pipe(gulp.dest('./js/'));
});

gulp.task('jsheadermin', function () {
  return gulp.src('./js/gzepeda_theme.scripts-header.js')
    .pipe(uglify())
    .pipe(rename('gzepeda_theme.scripts-header.min.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('jsheaderrename', function () {
  return gulp.src('./js/gzepeda_theme.scripts-header.js')
    .pipe(rename('gzepeda_theme.scripts-header.min.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('jsfooter', function () {
  return gulp.src(js_scripts_footer)
    .pipe(concat('gzepeda_theme.scripts-footer.js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('jsfootermin', function () {
  return gulp.src('./js/gzepeda_theme.scripts-footer.js')
    .pipe(concat('gzepeda_theme.scripts-footer.min.js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('jsfooterrename', function () {
  return gulp.src('./js/gzepeda_theme.scripts-footer.js')
    .pipe(rename('gzepeda_theme.scripts-footer.min.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('jsbuild', gulp.series([
  //'jsheader',
  'jsfooter',
  //'jsheadermin',
  'jsfootermin',
]));

gulp.task('build-prod', gulp.series([
  'sass',
  'sass_ckeditor',
  'cssmin',
  'cssmin_ckeditor',
  //'jsheader',
  'jsfooter',
  //'jsheadermin',
  'jsfootermin',
]));

gulp.task('build', gulp.series([
  'sass',
  'sass_ckeditor',
  'cssrename',
  'cssrename_ckeditor',
  'jsheader',
  'jsfooter',
  'jsheaderrename',
  'jsfooterrename',
]));

gulp.task('sass-dev:watch', function () {
  gulp.watch([
    './scss/*.scss',
    './scss/**/*.scss',
    './templates/patterns/**/*'
  ], gulp.series(['build']));
});

gulp.task('sass:watch', function () {
  gulp.watch([
    './scss/*.scss',
    './scss/**/*.scss',
    './templates/patterns/**/*',
    './templates/patterns/**/*.scss',
    './js-src/*.js',
  ], gulp.series(['build']));
});

gulp.task('default', gulp.series(['sass:watch']));
