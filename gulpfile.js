var gulp = require('gulp');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var copy = require('gulp-copy');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var ngConstant = require('gulp-ng-constant');


var paths = {
  sass: ['./scss/**/*.scss'],
  devFolder: ['./app'],
  targetFolder: ['./www/app']
};


/** MY PART **/

gulp.task('default', ['watch']);
gulp.task('build', ['clean', 'moveJs', 'ngConstant', 'moveJade', 'moveSass']);

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.devFolder + '/**/*.js', ['moveJs']);
  gulp.watch(paths.devFolder + '/**/*.jade', ['moveJade']);
  gulp.watch(paths.devFolder + '/**/*.scss', ['moveSass']);
});

// We use the ENV variable to set the environment
// You can set it like this: ENV=development gulp configConstants
gulp.task('ngConstant', ['clean'], function () {
  var myConfig = require(paths.devFolder + '/ngConstants.json');
  var envConfig = myConfig[process.env.ENV || 'development'];

  return ngConstant({
    name: 'qrBillingConfig',
    constants: envConfig,
    stream: true
  })
    .pipe(gulp.dest(paths.targetFolder + '/'));
});

// Clean
gulp.task('clean', function() {
  return gulp.src([
        paths.targetFolder + '/**/*.js',
        paths.targetFolder + '/**/*.jade',
        paths.targetFolder + '/**/*.scss'
      ] ,
      {read: false},
      {force:true}
    )
    .pipe(clean());
});

// Copy JS
gulp.task('moveJs', function() {
  return gulp.src(paths.devFolder + '/**/*.js')
    .pipe(gulp.dest(paths.targetFolder + '/'));
});

// Inject JS
//gulp.task('injectJs', ['moveJs'], function () {
//  console.log(paths.targetFolder + '/../index.html', paths.targetFolder + '/**/*.js');
//
//  var options = {
//    read: false
//  };
//  var target = gulp.src(paths.targetFolder + '/../index.html');
//  var sources = gulp.src([paths.targetFolder + '/**/*.js'], options);
//
//  var injectOptions = {relative: true};
//
//  return target.pipe(inject(sources, injectOptions))
//    .pipe(gulp.dest(paths.targetFolder + '/../'));
//});

// Jade
gulp.task('moveJade', function() {
  return gulp.src(paths.devFolder + '/**/*.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest(paths.targetFolder + '/'));
});

// mySass
gulp.task('moveSass', function(done) {
  gulp.src(paths.devFolder + '/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

/** END OF MY PART **/

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

