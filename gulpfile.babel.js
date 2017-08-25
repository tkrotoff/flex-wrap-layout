import gulp from 'gulp';
import debug from 'gulp-debug';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import browserSync from 'browser-sync';

gulp.task('styles', () =>
  gulp.src([
      'examples/native.scss',
      'examples/bootstrap3.scss'
    ])
    .pipe(sourcemaps.init())
    // See input-group: button is one pixel too small in bootstrap-sass (but not when using Less) https://github.com/twbs/bootstrap-sass/issues/595
    .pipe(sass({precision: 10}))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('examples'))
    .pipe(debug({title: 'styles:'}))
);

gulp.task('build', ['styles']);

gulp.task('clean', () => del(['examples/*.css', 'examples/*.css.map']));

function browserSyncInit(port, baseDir) {
  const browser = browserSync.create();

  browser.init({
    port: port,
    server: {
      baseDir: baseDir
    },
    browser: [] // Do not launch any browser
  });

  return browser;
}

gulp.task('serve', ['styles'], () => {
  const browser = browserSyncInit(9001, ['.']);
  gulp.watch(['examples/*.html', 'src/*.js'], browser.reload);
  gulp.watch(['examples/*.scss', 'src/*.scss'], ['styles', browser.reload]);
});
