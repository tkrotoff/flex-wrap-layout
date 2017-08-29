import * as gulp from 'gulp';
import * as debug from 'gulp-debug';
import * as sass from 'gulp-sass';
import * as sourcemaps from 'gulp-sourcemaps';
import * as del from 'del';
import * as browserSync from 'browser-sync';
import * as child_process from 'child_process';

gulp.task('styles', () =>
  gulp.src([
      'examples/native.scss',
      'examples/bootstrap3.scss'
    ])
    .pipe(sourcemaps.init())
    // See input-group: button is one pixel too small in bootstrap-sass (but not when using Less) https://github.com/twbs/bootstrap-sass/issues/595
    .pipe(sass({precision: 10}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('examples'))
    .pipe(debug({title: 'styles:'}))
);

function tsc(args: string, done: (error?: Error) => void) {
  child_process.exec(`tsc ${args}`, (error, stdout, stderr) => {
    //console.log(error);
    console.log(stdout);
    //console.log(stderr);
    if (error !== null) {
      done(error);
    } else {
      done();
    }
  });
}
gulp.task('scripts', done => tsc('--project .', done));

gulp.task('build', ['styles', 'scripts']);

gulp.task('clean', () => del(['examples/*.css', 'examples/*.css.map', 'lib']));

function browserSyncInit(port: number, baseDir: string[]) {
  const browser = browserSync.create();

  browser.init({
    port,
    server: {
      baseDir
    },
    browser: [] // Do not launch any browser
  });

  return browser;
}

gulp.task('serve', ['styles', 'scripts'], () => {
  const browser = browserSyncInit(9001, ['.']);
  gulp.watch(['examples/*.html'], browser.reload);
  gulp.watch(['src/*.ts'], ['scripts', browser.reload]);
  gulp.watch(['examples/*.scss', 'src/*.scss'], ['styles', browser.reload]);
});
