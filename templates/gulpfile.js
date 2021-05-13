/*

Run these commands

## if the project is already set up and running:
npm install

## if you check package.json and there aren't dependencies listed ( there should be no reason to do this )
npm install gulp
npm install gulp-concat --save-dev
npm install gulp-plumber --save-dev
npm install gulp-autoprefixer --save-dev
npm install gulp-clean-css --save-dev
npm install gulp-uglify --save-dev
npm install gulp-rename --save-dev
npm install gulp-notify --save-dev
npm install gulp-sass --save-dev
npm install gulp-sass-glob --save-dev
npm install gulp-load-plugins --save-dev

## always ( to compile/watch/etc )
gulp
*/

// Config for theme
var themePath = './';
var projectURL = 'http://madebycraft.loc/';

// Gulp Nodes
var gulp        = require( 'gulp' ),
    gulpPlugins = require( 'gulp-load-plugins' )();

// Browserstack
const browserSync = require('browser-sync').create();
// Error Handling
var onError = function( err ) {
    console.log( 'An error occurred:', err.message );
    this.emit( 'end' );
};

gulp.task('scss', function () {
    const { autoprefixer, cleanCss, notify, plumber, sass, sassGlob } = gulpPlugins;
    // return sass(themePath + 'style.scss', { sourcemap: false })
    return gulp.src(themePath + 'style.scss')
        .on('error', sass.logError)
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer('last 4 version'))
        .pipe(cleanCss())
        .pipe(gulp.dest(themePath))
        .pipe( browserSync.stream() )
        .pipe(notify({ message: 'Scss task complete' }));
});

gulp.task('scripts', function() {
    const { concat, notify, plumber, rename, uglify } = gulpPlugins;
    return gulp.src( [themePath + 'js/libs/**/*.js', themePath + 'js/development/**/*.js'] )
        .pipe(plumber())
        .pipe(concat('js/scripts.js'))
        .pipe(gulp.dest(themePath))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(themePath))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Watch task -- this runs on every save.
gulp.task( 'watch', function() {

    browserSync.init({
        proxy: projectURL,
        // `true` Automatically open the browser with BrowserSync live server.
        // `false` Stop the browser from automatically opening.
        //open: true,
        injectChanges: true,
    });
    // Watch all .scss files
    gulp.watch( themePath + '**/**/*.scss', gulp.series( 'scss' ) );

    // Watch js files
    gulp.watch( themePath + 'js/development/**/*.js', gulp.series( 'scripts' ) ).on('change',browserSync.reload);

    gulp.watch( themePath + '**/**/*.php').on('change',browserSync.reload);
});

// Default task -- runs scss and watch functions
gulp.task( 'default', gulp.series('scripts', 'scss', 'watch'));
