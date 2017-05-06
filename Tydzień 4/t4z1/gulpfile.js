/* Z użyciem wybranego automatora zadań, stwórz swój własny workflow, który ułatwi
codzienną pracę przy tworzeniu stron lub aplikacji internetowych. Utwórz zadanie watch,
które pozwoli śledzić zmiany w wybranych plikach i np. kompilować kod SASS do kodu
CSS, dodawać prefiksy (np. -webkit-) czy odświeżać widok w przeglądarce. Dodatkowo
utwórz zadanie build, które pozwoli zminifikować i połączyć wiele plików JavaScript w
jeden i dzięki temu utworzyć produkcyjną wersję aplikacji. Zadania jakie stworzysz, zależą
od Ciebie! */ 
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: 'src'
	});
	
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/scss/**/*.scss', ['sass']);
});

	gulp.task('sass', function() {
		return gulp.src('src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
	});
	
	gulp.task('css', function() {
		return gulp.src('src/css/**/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
	});
	
	gulp.task('clean', function() {
		return del(['dist']);
	});
	
	gulp.task('build', function() {
		sequence('clean', ['css']);
	});
	
	gulp.task('default', ['serve']);