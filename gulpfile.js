var gulp = require('gulp')
var rev = require('gulp-rev');
 
gulp.task('rev', function() {
  return gulp.src(['public/**/*.css', 'public/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/dist'));
});