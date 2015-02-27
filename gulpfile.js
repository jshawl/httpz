var gulp = require('gulp')
var rev = require('gulp-rev');
var path = require('path');
 
gulp.task('rev', function() {
  return gulp.src(['./public/css/*.css', './public/js/*.js'], {base:path.join(process.cwd(),'./public' )})
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/dist'));
});