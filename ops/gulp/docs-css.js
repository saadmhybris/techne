const gulp = require('gulp')
const sass = require('gulp-sass')

const config = require('../config')
let environment = require('../lib/environment')

const debug = require('gulp-debug');

const task = (cb) => {
 	return gulp.src(['./dist/css/techne-all.css','./dist/css/techne-debug.css'])
		.pipe(gulp.dest('./www/css'));
}

gulp.task('docs-css', ['css'], task)
module.exports = task