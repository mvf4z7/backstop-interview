var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');

function buildSass({ src, dest, options }) {
  options = options || {};
  return () => {
    return gulp.src(src)
      .pipe(rename(function(path) {
        if(options.outputStyle === 'compressed') {
          path.extname = '.min' + path.extname;
        }
      }))
      .pipe(sass(options).on('error', sass.logError))
      .pipe(gulp.dest(dest));
  };
}

// paths
var assetsDir = './public/assets/';
var gridRoot = './sass/grid/grid.scss';
var stylesRoot = './sass/styles/styles.scss';

var sassOpts = {
  outputStyle: 'compressed',
};

gulp.task('build-grid', buildSass({ src: gridRoot, dest: assetsDir }));
gulp.task('build-grid:min', buildSass({ src: gridRoot, dest: assetsDir, options: sassOpts }));

gulp.task('build-styles', buildSass({ src: stylesRoot, dest: assetsDir }));
gulp.task('build-styles:min', buildSass({ src: stylesRoot, dest: assetsDir, options: sassOpts }));

gulp.task('sass:watch', [ 'build-grid', 'build-grid:min', 'build-styles', 'build-styles:min' ], function() {
  gulp.watch('./sass/grid/**/*.scss', [ 'build-grid' ]);
  gulp.watch('./sass/styles/**/*.scss', [ 'build-styles' ]);
});

gulp.task('sass', [ 'build-grid', 'build-grid:min', 'build-styles', 'build-styles:min' ]);
