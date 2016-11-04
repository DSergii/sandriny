var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefix', () =>
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('style.css'))
);