import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();
const paths = {
  server: {
    scripts: ['server/**/*.js']
  },
  dist: 'dist'
};

const addLabel = {
  server: log => {
    console.log(plugins.util.colors.white('[') +
      plugins.util.colors.yellow('nodemon') +
      plugins.util.colors.white('] ') +
      log.message);
  }
};

const lintServer = lazypipe()
  .pipe(plugins.jshint, './.jshintrc')
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

const transpileServer = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel, {
    presets: ['es2015']
  })
  .pipe(plugins.sourcemaps.write, '.');

gulp.task('transpile:server', () => {
  return gulp.src(paths.server.scripts)
    .pipe(transpileServer())
    .pipe(gulp.dest(`${paths.dist}/server`));
});

gulp.task('lint:server', () => {
  return gulp.src(paths.server.scripts)
    .pipe(lintServer());
});

gulp.task('start:server', () => {
  nodemon(`-w server server`).on('log', addLabel['server']);
});

gulp.task('watch', () => {
  plugins.livereload.listen();
  plugins.watch(paths.server.scripts)
    .pipe(plugins.plumber())
    .pipe(lintServer())
    .pipe(plugins.livereload());
});

gulp.task('default', cb => {
  runSequence(['lint:server'],
    ['start:server'],
    'watch',
    cb);
});
