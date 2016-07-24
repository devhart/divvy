import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();
const paths = {
  client: {
    scripts: ['client/**/*.js', '!**/bower_components/**/*'],
    css: ['client/app/**/*.css'],
    indexHtml: ['client/index.html']
  },
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

const lintClientScripts = lazypipe()
  .pipe(plugins.eslint, 'client/.eslintrc')
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

gulp.task('lint', ['lint:client', 'lint:server']);

gulp.task('lint:client', ['lint:client:scripts']);

gulp.task('lint:client:scripts', () => {
  return gulp.src(paths.client.scripts)
    .pipe(lintClientScripts());
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

  plugins.watch(paths.client.scripts)
    .pipe(plugins.plumber())
    .pipe(lintClientScripts())
    .pipe(plugins.refresh());

  plugins.watch(paths.server.scripts)
    .pipe(plugins.plumber())
    .pipe(lintServerScripts())
    .pipe(plugins.refresh());

  plugins.watch(paths.server.tests.unit)
    .pipe(plugins.plumber())
    .pipe(lintServerTests())
    .pipe(plugins.refresh());

  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('inject', cb => runSequence('inject:js', 'inject:css', cb));

gulp.task('inject:js', () => {
  return gulp.src(paths.client.indexHtml)
    .pipe(plugins.inject(gulp.src(_.union(paths.client.scripts, ['!client/app/app.js']), { read: false }),
      {
        starttag: '<!-- injector:js -->',
        endtag: '<!-- endinjector -->',
        transform: (filepath) => `<script src="${filepath.replace('/client/', '')}"></script>`
      }))
    .pipe(gulp.dest('client/'));
});

gulp.task('inject:css', () => {
  return gulp.src(paths.client.indexHtml)
    .pipe(plugins.inject(gulp.src(paths.client.css, { read: false }),
      {
        starttag: '<!-- injector:css -->',
        endtag: '<!-- endinjector -->',
        transform: (filepath) => `<link rel="stylesheet" href="${filepath.replace('/client/', '')}">`
      }))
    .pipe(gulp.dest('client/'));
});

gulp.task('wiredep', () => {
  return gulp.src(paths.client.indexHtml)
    .pipe(plugins.wiredep({
      directory: 'client/bower_components',
      ignorePath: 'client/bower_components/'
    }))
    .pipe(gulp.dest('client/'));
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
    'lint',
    'inject',
    'wiredep',
    'start:server',
    'watch',
    cb);
});
