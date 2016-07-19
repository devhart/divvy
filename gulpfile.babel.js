import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();
const paths = {
  server: {
    scripts: ['server/**/!(*.spec).js', '!**/.env.*', '!server/index.js'],
    tests: {
      unit: ['server/**/*.spec.js'],
    },
  },
  dist: 'dist',
};

gulp.task('env:all', () => {
  let localConfig;
  try {
    localConfig = require('./server/config/.env').default;
  } catch (e) {
    localConfig = {};
  }

  plugins.env({
    vars: localConfig,
  });
});

gulp.task('env:test', () => {
  plugins.env({
    vars: { NODE_ENV: 'test' },
  });
});

gulp.task('env:prod', () => {
  plugins.env({
    vars: { NODE_ENV: 'production' },
  });
});

const addLabel = {
  server: log => {
    console.log(plugins.util.colors.white('[') +
      plugins.util.colors.yellow('nodemon') +
      plugins.util.colors.white('] ') +
      log.message);
  },
};

const lintServerScripts = lazypipe()
  .pipe(plugins.eslint, 'server/.eslintrc')
  .pipe(plugins.eslint.format);

const lintServerTests = lazypipe()
  .pipe(plugins.eslint, 'server/.eslintrc-spec')
  .pipe(plugins.eslint.format);

const mocha = lazypipe()
  .pipe(plugins.mocha, {
    reporter: 'spec',
    timeout: 5000,
    require: ['./mocha.conf'],
  });

const transpileServer = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel, {
    presets: ['es2015'],
  })
  .pipe(plugins.sourcemaps.write, '.');

gulp.task('transpile:server', () => {
  return gulp.src(paths.server.scripts)
    .pipe(transpileServer())
    .pipe(gulp.dest(`${paths.dist}/server`));
});

gulp.task('lint:server', ['lint:server:scripts', 'lint:server:tests']);

gulp.task('lint:server:scripts', () => {
  return gulp.src(paths.server.scripts)
    .pipe(lintServerScripts());
});

gulp.task('lint:server:tests', () => {
  return gulp.src(paths.server.tests.unit)
    .pipe(lintServerTests());
});

gulp.task('start:server', () => {
  nodemon(`-w server server`).on('log', addLabel.server);
});

gulp.task('watch', () => {
  plugins.refresh.listen();
  plugins.watch(paths.server.scripts)
    .pipe(plugins.plumber())
    .pipe(lintServerScripts())
    .pipe(plugins.refresh());

  plugins.watch(paths.server.tests.unit)
    .pipe(plugins.plumber())
    .pipe(lintServerTests())
    .pipe(plugins.refresh());
});

gulp.task('test', cb => {
  runSequence('test:server', cb);
});

gulp.task('test:server', cb => {
  runSequence(
    'env:all',
    'env:test',
    'mocha:unit',
    cb);
});

gulp.task('mocha:unit', () => {
  return gulp.src(paths.server.tests.unit)
    .pipe(mocha());
});

gulp.task('default', cb => {
  runSequence('env:all',
    'lint:server',
    'start:server',
    'watch',
    cb);
});
