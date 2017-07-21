var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var source = ['modules/**/pub/source/styles/variables.scss','modules/**/pub/source/styles/module.scss'];
var destinationFolder = './pub/static/';
var destinationFile = 'styles.css';

gulp.task('sass', function(){
  return gulp.src(source)
    .pipe(concat(destinationFile))
    .pipe(sass())
    .pipe(gulp.dest(destinationFolder))
});

gulp.task('default', ['sass']);
