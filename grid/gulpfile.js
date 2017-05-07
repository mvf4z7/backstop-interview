var gulp = require('gulp');
var sass = require('gulp-sass');

// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

function buildSass({ src, dest }) {
  return () => {
    return gulp.src(src)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(dest));
  };
}

function server() {

}

gulp.task('build-grid', buildSass({ src: './sass/grid/grid.scss', dest: './public/assets/' }));
gulp.task('build-styles', buildSass({ src: './sass/styles/styles.scss', dest: './public/assets/' }));
gulp.task('sass:watch', [ 'build-grid', 'build-styles' ], function() {
  gulp.watch('./sass/grid/grid.scss', [ 'build-grid' ]);
  gulp.watch('./sass/styles/**/*.scss', [ 'build-styles' ]);
});