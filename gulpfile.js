var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var eslint = require('gulp-eslint');
const fs = require('fs');

var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify).transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
    })

);

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});


function bundle() {
    return watchedBrowserify
        .bundle()
        // .on('error', function (error){console.log(error.toString());
        //     fs.createWriteStream('error.js')
        // })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
}
gulp.task('lint', function() {  
    return gulp.src('src/**/*.ts')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
});

gulp.task("ts",bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
gulp.task('dev',gulp.series("copyHtml",'ts',function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}));