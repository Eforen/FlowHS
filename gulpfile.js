var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('gulp-browserify'),
    concatCss = require('gulp-concat-css'),
    run = require('gulp-run'),
    jshint = require('gulp-jshint');

var src = './process',
    app = './app';

gulp.task('checkjs', function(){
  return gulp.src([app + '/js/**/*.js', src + '/js/**/*.js']).pipe(jshint());
});

gulp.task('js', function() {
  return gulp.src( src + '/js/*.js' )
    .pipe(browserify({
      transform: ['reactify'],
      extensions: 'browserify-css',
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});
/*

const babel = require('gulp-babel');

gulp.task('js', function() {
  return gulp.src( [src + '/js/*.jsx', src + '/js/*.js'] )
    .pipe(sourcemaps.init())
    .pipe(babel({
        plugins: ["transform-runtime"],
        presets: ['env', 'react']
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(app + '/js'));
});
*/

gulp.task('html', function() {
  gulp.src( src + '/**/*.html');
});

gulp.task('css', function() {
  gulp.src( src + '/css/*.css')
  .pipe(concatCss('app.css'))
  .pipe(gulp.dest(app + '/css'));
});

gulp.task('fonts', function() {
    gulp.src('node_modules/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest(app + '/fonts'));
});

gulp.task('watch', ['serve'], function() {
  gulp.watch( src + '/js/**/*', ['js']);
  gulp.watch( src + '/css/**/*.css', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('serve', ['html', 'js', 'css'], function() {
  run('electron app/main.js').exec();
});

gulp.task('default', ['watch', 'fonts', 'serve']);
