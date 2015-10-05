import gulp from 'gulp';
import debug from 'gulp-debug';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import browserSync from 'browser-sync';

gulp.task('styles', () =>
  gulp.src([
      'native.scss',
      'bootstrap3.scss'
    ])
    .pipe(sourcemaps.init())
    // See input-group: button is one pixel too small in bootstrap-sass (but not when using Less) https://github.com/twbs/bootstrap-sass/issues/595
    .pipe(sass({precision: 10}))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
    .pipe(debug({title: 'styles:'}))
);

gulp.task('build', ['styles']);

gulp.task('clean', () => del(['*.css', '*.css.map']));

function browserSyncInit(port, baseDir) {
  const browser = browserSync.create();

  browser.init({
    port: port,
    server: {
      baseDir: baseDir,
      routes: {
        '/node_modules': 'node_modules'
      }
    },
    browser: [] // Do not launch any browser
  });

  return browser;
}

gulp.task('serve', ['styles'], () => {
  const browser = browserSyncInit(9001, ['.']);
  gulp.watch(['**/*.html', '**/*.js'], browser.reload);
  gulp.watch(['**/*.scss'], ['styles', browser.reload]);
});
