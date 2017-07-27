var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var fs = require('fs');
var path = require('path');
var frontendSource = [], frontendVariableSource = [], frontendModuleSource = [], frontendWatchSource = [];
var adminSource = [], adminVariableSource = [], adminModuleSource = [], adminWatchSource = [];

fs.readdirSync('modules').forEach(function(module) {
  frontendWatchSource.push('modules/'+module+'/pub/source/styles/**/*.scss');
  frontendVariableSource.push('modules/'+module+'/pub/source/styles/variables.scss');
  frontendModuleSource.push('modules/'+module+'/pub/source/styles/module.scss');

  adminWatchSource.push('modules/'+module+'/pub/source/styles/admin/**/*.scss');
  adminVariableSource.push('modules/'+module+'/pub/source/styles/admin/variables.scss');
  adminModuleSource.push('modules/'+module+'/pub/source/styles/admin/module.scss');
});

frontendSource = frontendVariableSource.concat(frontendModuleSource);
adminSource = adminVariableSource.concat(adminModuleSource);

var destinationFolder = './pub/static/';
var frontendDestinationFile = 'styles.css';
var adminDestinationFile = 'admin.css';

gulp.task('scss', function(){
  gulp.src(adminSource)
    .pipe(concat(adminDestinationFile))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destinationFolder));

  return gulp.src(frontendSource)
    .pipe(concat(frontendDestinationFile))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destinationFolder));
});

gulp.task('default', ['scss']);

gulp.task('watch', function() {
  gulp.watch(frontendWatchSource, ['scss']);
  gulp.watch(adminWatchSource, ['scss']);
});
