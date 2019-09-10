const html = require('gulp-minify-html'); //压缩html
const css = require('gulp-minify-css'); //压缩css
const uglifyjs = require('gulp-uglify'); //压缩js
const watch = require('gulp-watch'); //事件监听
const sass = require('gulp-sass'); //sass转css
const babel = require('gulp-babel'); //es6转es5
const babelcore = require('babel-core'); //es6转es5
const babelpresetes2015 = require('babel-preset-es2015'); //es6转es5
const imagemin = require('gulp-imagemin'); //图片压缩
const sourcemaps = require('gulp-sourcemaps');

//复制文件
gulp.task('copyfile', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))
})

//压缩html文件
gulp.task('uglifyhtml', function() {
    return gulp.src('src/*.html')
        .pipe(html())
        .pipe(gulp.dest('dist/'))
})

//压缩css文件
gulp.task('uglifycss', function() {
    return gulp.src('src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/'))
})

//压缩js文件
gulp.task('uglifyjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js'))
})

//监听
gulp.task('default', function() {
    watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs'))
})

//sass转css
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })) //执行编译,compressed:压缩一行
        .pipe(gulp.dest('dist/css/'));
});

//es6转es5
gulp.task('babel', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        })).pipe(gulp.dest('dist/js/'))
})

//图片压缩
gulp.task('imagemin', function() {
    return gulp.src('src/img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'))
});