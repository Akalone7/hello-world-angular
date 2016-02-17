var gulp = require('gulp');
var connect = require('gulp-connect');
var bowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var del = require('del');
var es = require('event-stream');
var Q = require('q');
var plugins = require('gulp-load-plugins')();
var babel = require('gulp-babel');
var watch = require('gulp-watch');

//TODO Effettuare pulizia componenti non utilizzati.

// == PATH STRINGS ========

var paths = {
  scripts: ['app/services/**/*.js', 'app/services/**/*.js', 'app/components/**/*.js', 'app/shared/**/*.js', 'assets/javascripts/**/*.js', 'app/app.constants.js', 'app/app.js'],
  resources: ['resources/**/*.json', 'resources/I18n/angular-locale*.js'],
  styles: ['./assets/stylesheets/**/*.css', './assets/stylesheets/**/*.scss'],
  assets: [
    './assets/fonts/**/*',
    './bower_components/font-awesome/fonts/**/*',
    './bower_components/bootstrap-sass/assets/fonts/**/*',
    '/app/resources/**/*.json'
  ],
  index: 'app/index.html',
  partials: ['/app/components/**/*.tpl.html', '/app/shared/**/*.tpl.html'],
  bowerDir: './bower_components/',
  directivesDir: '/app/scripts/directives/',
  distDev: './dist',
  //distProd: './dist_prod',
  //test: 'test',
  distScripts: '/scripts',
  distScriptsVendor: '/scripts/vendors',
  scriptsDevServer: 'dist/scripts'
};


//PIPES
var pipes =  {};

pipes.orderedAppScripts = function() {
  return plugins.angularFilesort();
};

pipes.builtVendorScriptsDev = function() {
  return gulp.src(bowerFiles('**/*.js'))
    .pipe(gulp.dest(paths.distDev + paths.distScriptsVendor));
};

pipes.validatedAppScripts = function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtAppScriptsDev = function() {

  var start = Date.now();

  return pipes.validatedAppScripts()
    .pipe(babel({
      presets: ['es2015']
    }))
    .on("error", notify.onError("Error: <%= error.message %>"))
    .pipe(plugins.sourcemaps.init())
    .pipe(gulp.dest(paths.distDev + paths.distScripts))
    .pipe(notify('built in ' + (Date.now() - start) + 'ms'));

};

pipes.builtAppDev = function() {
  return es.merge(pipes.builtIndexDev(), pipes.builtPartialsDev(), pipes.processedAssets(), pipes.icons());
};

pipes.validatedDevServerScripts = function() {
  return gulp.src(paths.scriptsDevServer)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtIndexDev = function() {

  var orderedVendorScripts = pipes.builtVendorScriptsDev();

  var orderedAppScripts = pipes.builtAppScriptsDev()
    .pipe(pipes.orderedAppScripts());

  var appStyles = pipes.builtStylesDev();

  return pipes.validatedIndex()
    .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
    .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
    .pipe(plugins.inject(orderedAppScripts, {relative: true}))
    .pipe(plugins.inject(appStyles, {relative: true}))
    .pipe(gulp.dest(paths.distDev));
};

pipes.validatedPartials = function() {
  return gulp.src(paths.partials, {base: './'})
    .pipe(plugins.htmlhint({'doctype-first': false}))
    .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function() {
  return pipes.validatedPartials()
    .pipe(gulp.dest(paths.distDev));
};

pipes.builtStylesDev = function() {
  return gulp.src(paths.styles)
    .pipe(plugins.sass(
      {
        includePaths: [
          paths.bowerDir,
          paths.directivesDir
        ],
        sourceComments: 'normal'
      }))
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(gulp.dest(paths.distDev));
};

pipes.validatedIndex = function() {
  return gulp.src(paths.index)
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.reporter());
};

pipes.processedAssets = function() {

  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.distDev + '/fonts/'));

  gulp.src('assets/images/**/*')
    .pipe(gulp.dest(paths.distDev + '/images/'));

  return gulp.src('app/resources/**/*')
    .pipe(gulp.dest(paths.distDev + '/resources/'));

};

pipes.icons = function() {

  return gulp.src(paths.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest(paths.distDev + '/fonts/font-awesome'));
};


//TASKS
// removes all compiled dev files
gulp.task('clean-dev', function() {
  var deferred = Q.defer();
  del(paths.distDev, function() {
    deferred.resolve();
  });
  return deferred.promise;
});

// cleans and builds a complete dev environment
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

// runs jshint on the dev server scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// clean, build, and watch live changes to the dev environment
gulp.task('default', ['clean-build-app-dev', 'validate-devserver-scripts'], function() {

  connect.server({
    root: 'dist/',
    port: 8089,
    livereload: true
  });

  // start live-reload server
  plugins.livereload.listen({ start: true });

  // watch index
  watch(paths.index, function() {
    return pipes.builtIndexDev()
      .pipe(plugins.livereload());
  });

  watch(paths.index, function() {
    return pipes.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch app scripts
  watch(paths.scripts, function() {
    return pipes.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch html partials
  watch(paths.partials, function() {
    return pipes.builtPartialsDev()
      .pipe(plugins.livereload());
  });

  // watch styles
  watch(paths.styles, function() {
    return pipes.builtIndexDev()
      .pipe(plugins.livereload());
  });

  // watch assets
  watch(paths.assets, function() {
    return pipes.processedAssets()
      .pipe(plugins.livereload());
  });

  watch('./bower_components/**/*', function() {
    return pipes.builtIndexDev()
      .pipe(plugins.livereload());
  });

});