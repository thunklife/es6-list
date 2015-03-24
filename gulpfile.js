var gulp = require('gulp'),
  babel = require('gulp-babel');

gulp.task('default', function(){
  gulp
  .src('src/index.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'));
});

var w = gulp.watch('**/*.js', ['default']);
w.on('change', function(e){
  console.log('File ' + e.path + 'was ' + e.type + ' running tasks...');
});
