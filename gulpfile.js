const 
    gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    clean        = require('gulp-clean-css'),
    csscomb      = require('gulp-csscomb'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer')

gulp.task('sass', () => {
    var processors = [
        autoprefixer({
            browsers: ['>5%', 'ie 8']
        })
    ]

    gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(clean())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
})

gulp.task('csscomb', () => {
    gulp
        .src('src/scss/*.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('src/scss'))
})

gulp.task('js', () => {
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream())
})

gulp.task('serve', ['sass'], () => {

    browserSync.init({
        server: "./src"
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass', 'csscomb'])
    gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('fonts', () => {
  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
})

gulp.task('fa', () => {
  gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
})

gulp.task('default', ['js','serve', 'fa', 'fonts'])
