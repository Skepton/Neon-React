var gulp = require('gulp');
var sass = require('gulp-sass');

var source = 'styles.scss';
var destination = './pub/static/';

gulp.task('sass', function(){
  return gulp.src(source)
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest(destination))
});

gulp.task('default', ['sass']);
