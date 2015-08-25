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


var paths = {
  sass: ['./scss/**/*.scss'],
  devFolder: ['./app'],
  targetFolder: ['./www/app']
};


/** MY PART **/

gulp.task('default', ['sass']);
gulp.task('build', ['clean', 'moveJs', 'injectJs', 'moveJade', 'moveSass']);


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
gulp.task('injectJs', ['moveJs'], function () {
  console.log(paths.targetFolder + '/../index.html', paths.targetFolder + '/**/*.js');

  var options = {
    read: false
  };
  var target = gulp.src(paths.targetFolder + '/../index.html');
  var sources = gulp.src([paths.targetFolder + '/**/*.js'], options);

  return target.pipe(inject(sources))
    .pipe(gulp.dest(paths.targetFolder + '/../'));
});

// Jade
gulp.task('moveJade', function() {
  return gulp.src(paths.devFolder + '/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(paths.targetFolder + '/'));
});

// mySass
gulp.task('moveSass', function(done) {
  gulp.src(paths.targetFolder + '/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss())
    .pipe(concat('builtstyle.min.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

/** END OF MY PART **/


gulp.task('watch', ['build'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.devFolder + '/**/*.js', ['moveJs']);
  gulp.watch(paths.devFolder + '/**/*.jade', ['moveJade']);
  gulp.watch(paths.devFolder + '/**/*.scss', ['moveSass']);
});

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

