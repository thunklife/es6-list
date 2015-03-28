var gulp = require('gulp'),
  babel = require('gulp-babel'),
  mocha = require('gulp-mocha');

require('babel/polyfill');

gulp.task('default', ['build-src', 'build-test', 'run-test']);

gulp.task('build-src', function(){
  gulp
  .src('src/index.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'));
});

gulp.task('build-test', function(){
  gulp
  .src('test/*.js')
  .pipe(babel())
  .pipe(gulp.dest('test/dist'));
});

gulp.task('run-test', function(){
  gulp
  .src('test/dist/*.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

var w = gulp.watch(['src/*.js', 'test/*.test.js'], ['default']);
w.on('change', function(e){
  console.log('File ' + e.path + 'was ' + e.type + ' running tasks...');
});
