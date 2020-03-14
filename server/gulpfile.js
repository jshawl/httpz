var gulp = require('gulp')
var rev = require('gulp-rev');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('rev', function() {
  return gulp.src(['./public/assets/*.css', './public/js/*.js'], {base:path.join(process.cwd(),'./public' )})
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('prefix', function(){
  return gulp.src('./public/css/*.css')
    .pipe( autoprefixer() )
    .pipe( gulp.dest('public/assets') )
})