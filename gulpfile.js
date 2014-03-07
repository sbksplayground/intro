var gulp = require('gulp'),
    livereload = require('gulp-livereload');

var paths = {
        css: ['public/*.css'],
    };

gulp.task('css', function () {
    return gulp.src(paths.css)
            .pipe(gulp.dest('./public/'))
            .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
});

gulp.task('default',['watch']);
