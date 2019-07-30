//引入gulp
let gulp = require('gulp');
//引入gulp-jshint
const jshint = require('gulp-jshint')
//引入jshint-stylish
const stylish = require('jshint-stylish');
//引入gulp-babel
const babel = require('gulp-babel');
//引入gulp-browserify
const browserify = require('gulp-browserify');
//引入gulp-rename
const rename = require('gulp-rename');
//引入gulp-uglify
const uglify = require('gulp-uglify')
//引入gulp-less
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
// const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const opn = require('opn');

//语法检查
gulp.task('jshint', function() {
  // 将你的任务的任务代码放在这
  return gulp.src('./src/js/*.js')
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter(stylish))
    .pipe(livereload());
});

//语法转换
gulp.task('babel', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({ //进行语法转换
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))//输出到指定目录
    .pipe(livereload());
});

//模块化语法转换
gulp.task('browserify', function() {
  return gulp.src('./build/js/index.js')
    .pipe(browserify())//将CommonJs语法转换为浏览器能识别的语法
    .pipe(rename('built.js'))//为了防止冲突将文件重命名
    .pipe(gulp.dest('build/js/'))//输出到指定位置
    .pipe(livereload());
});

//压缩js
gulp.task('uglify', function () {
  return gulp.src('build/js/built.js')
    .pipe(uglify())  //压缩js
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

//编译less且扩展前缀
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({
      plugins: [autoprefix]//自动扩展前缀
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

gulp.task('concat', function() {
  return gulp.src('./build/css/*.css')
    .pipe(concat('built.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

gulp.task('cssmin', function () {
  return gulp.src('build/css/built.css')
    .pipe(cssmin())
    .pipe(rename('dist.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('htmlmin', () => {
  return gulp.src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true ,//去除空格
      removeComments:true //去除注释
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('imagemin', function () {
  return gulp.src('./src/img/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(livereload());
});

//自动执行任务，编译代码
gulp.task('watch', function() {
  //1. 在所有可能要执行任务后面加上 .pipe(livereload());
  livereload.listen();
  //通过自己服务器打开项目，自动刷新
  connect.server({
    root: 'dist',
    port: 3001,
    livereload: true  // 自动刷新
  });
  //自动打开浏览器
  opn('http://localhost:3001/index.html');
  //监视指定文件（第一个参数），一旦文件发生变化，就自动执行后面的任务（第二个参数）
  gulp.watch('src/less/*.less', gulp.series(['less','concat','cssmin']));
  gulp.watch('./src/js/*.js', gulp.series(['jshint','babel','browserify','uglify']));
  gulp.watch('./src/index.html', gulp.series('htmlmin'));
});

//配置默认任务
gulp.task('default', gulp.series('jshint', 'babel', 'browserify','uglify','less','concat','cssmin','htmlmin','watch'))





