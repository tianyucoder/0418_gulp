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

//语法检查
gulp.task('jshint', function() {
  // 将你的任务的任务代码放在这
  return gulp.src('./src/js/*.js')
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter(stylish));
});

//语法转换
gulp.task('babel', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({ //进行语法转换
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))//输出到指定目录
});

//模块化语法转换
gulp.task('browserify', function() {
  return gulp.src('./build/js/index.js')
    .pipe(browserify())//将CommonJs语法转换为浏览器能识别的语法
    .pipe(rename('built.js'))//为了防止冲突将文件重命名
    .pipe(gulp.dest('build/js/'))//输出到指定位置
});

//压缩js
gulp.task('uglify', function () {
  return gulp.src('build/js/built.js')
    .pipe(uglify())  //压缩js
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('dist/js'))
});


//配置默认任务
gulp.task('default', gulp.series('jshint', 'babel', 'browserify','uglify'))





