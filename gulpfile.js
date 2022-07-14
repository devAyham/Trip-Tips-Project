
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const sass = gulpSass(require('sass'));


gulp.task('sass' , async function(){ 
    gulp.src('./src/App.scss').pipe(sass()).pipe(gulp.dest('./src'))
} );

gulp.task('watch' , function(){
    gulp.watch('./src/**/**/*.scss' && './src/**/**/**/*.scss' , async function(){
        gulp.src('./src/App.scss').pipe(sass()).pipe(gulp.dest('./src'))
});
}) ;