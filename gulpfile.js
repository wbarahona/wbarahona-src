// var gulp                = require('gulp'),
//     concat              = require('gulp-concat'),
//     uglify              = require('gulp-uglify'),
//     sourcemaps          = require('gulp-sourcemaps'),
//     livereload          = require('gulp-livereload'),
//     sass                = require('gulp-sass'),
//     minifyCSS           = require('gulp-minify-css'),
//     rename              = require('gulp-rename'),
//     connect             = require('gulp-connect'),
//     build               = require('gulp-build'),
//     jshint              = require('gulp-jshint'),
//     transform           = require('vinyl-transform'),
//     source              = require('vinyl-source-stream'),
//     browserify          = require('browserify'),
//     handlebars          = require('gulp-compile-handlebars'),
//     templObj            = require('./conf/web.conf'),
//     pathObj             = require('./conf/paths.conf');
//
// var paths = pathObj,
//     templateData = templObj;
//
// // Not all tasks need to use streams
// // A gulpfile is just another node program and you can use all packages available on npm
//
// // Server related tasks
// gulp.task('express', function() {
//     var express = require('express');
//     var app = express();
//     app.use(require('connect-livereload')({port: 4002}));
//     app.use(express.static(__dirname));
//     app.listen(4000);
// });
//
// var tinylr;
// gulp.task('livereload', function() {
//     tinylr = require('tiny-lr')();
//     tinylr.listen(4002);
// });
//
// function notifyLiveReload(event) {
//     var fileName = require('path').relative(__dirname, event.path);
//
//     tinylr.changed({
//         body: {
//             files: [fileName]
//         }
//     });
// }
//
// gulp.task('connect', function () {
//     connect.server ({
//         root: [paths.dist.root],
//         port: 8000,
//         livereload: true
//     })
// });
//
// //
// // Process all assets, scripts, image minification and sass preprocessing
// // ---------------------------------------------------------------------------------------------------------------
//
// gulp.task('lint', function() {
//     return gulp.src(paths.dev.scripts)
//     .pipe(jshint())
//     // You can look into pretty reporters as well, but that's another story
//     .pipe(jshint.reporter('default'));
// });
//
// //Min all scripts
// gulp.task('scripts', function() {
//     // Minify and copy all JavaScript
//     // with sourcemaps all the way down
//     return browserify({
//         debug: true,
//         entries: [paths.dev.scripts+'/scripts.js']
//     }).bundle()
//     .pipe(source('scripts.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(paths.dist.scripts))
//     .pipe(connect.reload());
// });
//
// // Process Templating with Handlebars
// gulp.task('hbs', function () {
//     var options = {
//         ignorePartials: true,
//         batch : [paths.dev.hbs.partials],
//         helpers : {
//             capitals : function(str){
//                 return str.toUpperCase();
//             }
//         }
//     }
//
//     return gulp.src([paths.dev.hbs.root+'/**/*.hbs', '!'+paths.dev.hbs.root+'/partials/**/*.hbs'])
//     .pipe(handlebars(templateData, options))
//     .pipe(rename(function(path) {
//         path.extname = '.html';
//     }))
//     .pipe(gulp.dest(paths.dist.root))
//     .pipe(connect.reload());
// });
//
// // Process all html
// gulp.task('html', function () {
//     gulp.src(paths.dev.root+'/index.html')
//     .pipe(rename('index.html'))
//     .pipe(gulp.dest(paths.dist.root));
//
//     return gulp.src(paths.dist.root+'/index.html')
//     .pipe(connect.reload());
// });
//
// // Copy all fonts files
// gulp.task('fonts', function() {
//     gulp.src(paths.dev.fonts)
//     .pipe(gulp.dest(paths.dist.fonts));
//
//     return gulp.src(paths.dist.fonts)
//     .pipe(connect.reload());
// });
//
// // Copy all static images
// gulp.task('images', function() {
//     gulp.src(paths.dev.images)
//     .pipe(gulp.dest(paths.dist.images));
//
//     return gulp.src(paths.dist.images)
//     .pipe(connect.reload());
// });
//
// // Minify scss
// gulp.task('sass', function () {
//     return gulp.src(paths.dev.styles+'/styles.scss')
//     .pipe(sass())
//     .pipe(gulp.dest(paths.dist.styles))
//     .pipe(concat('styles.min.css'))
//     .pipe(gulp.dest(paths.dist.styles))
//     .pipe(minifyCSS())
//     .pipe(rename('styles.min.css'))
//     .pipe(gulp.dest(paths.dist.styles))
//     .pipe(connect.reload());
// });
//
// //
// // Watch over the files modified
// // ---------------------------------------------------------------------------------------------------------------
//
// // Rerun the task when a file changes
// gulp.task('watch', function() {
//     gulp.watch([paths.dev.scripts+'/**/*.js'], ['lint']);
//     gulp.watch([paths.dev.scripts+'/**/*.js'], ['scripts']);
//     gulp.watch(paths.dev.images, ['images']);
//     gulp.watch([paths.dev.styles+'/**/*.scss'], ['sass']);
//     gulp.watch([paths.dev.hbs.root+'/**/*.hbs'], ['hbs']);
// });
//
// //
// // $ gulp et voila
// // ---------------------------------------------------------------------------------------------------------------
// // The default task (called when you run `gulp` from cli)
// gulp.task('default', ['lint', 'scripts', 'hbs', 'fonts', 'images', 'sass', 'express', 'livereload', 'connect', 'watch']);




var gulp                    = require('gulp');
var connect                 = require('gulp-connect');
var browserify              = require('browserify');
var buffer                  = require('vinyl-buffer');
var uglify                  = require('gulp-uglify');
var source                  = require('vinyl-source-stream');
var rename                  = require('gulp-rename');
var sass                    = require('gulp-sass');
var concat                  = require('gulp-concat');
var minifyCSS               = require('gulp-minify-css');
var changed                 = require('gulp-changed');
var pathObj                 = require('./conf/paths.conf');
var templObj                = require('./conf/web.conf');
var handlebars              = require('gulp-compile-handlebars');

var paths                   = pathObj;
var templateData            = templObj;

//
// Start Gulp task
// -----------------------------------------------------------------------
    //
    // Swallow Error
    // -----------------------------------------------------------------------
        function swallowError (error) {
            console.log(error.toString());
            this.emit('end');
        }
    //
    // Server task
    // -----------------------------------------------------------------------
        gulp.task('connect', function() {
            connect.server({
                root: './wbarahona.github.io',
                port: 8000,
                livereload: true
            });
        });

    //
    // Process handlebars templates
    // -----------------------------------------------------------------------
        gulp.task('hbs', function () {
            var options = {
                ignorePartials: true,
                batch : [paths.dev.hbs.partials],
                helpers : {
                    capitals : function(str){
                        return str.toUpperCase();
                    }
                }
            }

            return gulp.src([paths.dev.hbs.root+'/**/*.hbs', '!'+paths.dev.hbs.root+'/partials/**/*.hbs'])
            .pipe(handlebars(templateData, options))
            .pipe(rename(function(path) {
                path.extname = '.html';
            }))
            .pipe(gulp.dest(paths.dist.root))
            .pipe(connect.reload());
        });

    //
    // Process Style
    // -----------------------------------------------------------------------
        gulp.task('sass', function () {
            gulp.src(paths.dev.styles+'/styles.scss')
                .pipe(sass())
                .on('error', swallowError)
                .pipe(gulp.dest(paths.dist.styles))
                .pipe(concat('styles.min.css'))
                .pipe(gulp.dest(paths.dist.styles))
                .pipe(minifyCSS())
                .pipe(rename('styles.min.css'))
                .pipe(gulp.dest(paths.dist.styles))
                .pipe(connect.reload());
        });

    //
    // Copy all fonts files
    // -----------------------------------------------------------------------
        gulp.task('fonts', function() {
            gulp.src(paths.dev.fonts)
            .pipe(gulp.dest(paths.dist.fonts))
            .pipe(connect.reload());
        });

    //
    // Copy all static images
    // -----------------------------------------------------------------------
        gulp.task('images', function() {
            gulp.src(paths.dev.images)
            .pipe(gulp.dest(paths.dist.images))
            .pipe(connect.reload());
        });

    //
    // Process scripts
    // -----------------------------------------------------------------------
        gulp.task('scripts', function() {
            // Minify and copy all JavaScript
            // with sourcemaps all the way down
            return browserify({
                debug: true,
                entries: [paths.dev.scripts+'/scripts.js']
            }).bundle()
            .pipe(source('scripts.min.js'))
            .pipe(changed(paths.dev.scripts))
            .pipe(buffer())
            .pipe(uglify({options: {
                mangle: {
                    except: ['jquery']
                }
            }}))
            .on('error', swallowError)
            .pipe(gulp.dest(paths.dist.scripts))
            .pipe(connect.reload());
        });

    //
    // Watch for changes on files
    // -----------------------------------------------------------------------
        gulp.task('watch', function () {
            gulp.watch([paths.dev.scripts+'/**/*.js'], ['scripts']);
            gulp.watch([paths.dev.styles+'/**/*.scss'], ['sass']);
            gulp.watch(paths.dev.images, ['images']);
            gulp.watch([paths.dev.hbs.root+'/**/*.hbs'], ['hbs']);
        });

    //
    // Default task to just have `$ gulp` et voila
    // -----------------------------------------------------------------------
        gulp.task('default', ['connect', 'scripts', 'sass', 'fonts', 'images', 'hbs', 'watch']);
