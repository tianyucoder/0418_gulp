//引入gulpo
let gulp = require('gulp');

/*
* 警告：Did you forget to signal async completion?
*     1.任务的回调函数中传递一个done参数，当任务全部处理完毕时，调用done。
*     2.将任务的回调函数用async声明，所有任务语句用await。
*     3.返回一个流（可读流）
* */

let {createReadStream} = require('fs')
//定义你的任务
/*gulp.task('haha',  function(done) {
   console.log('------------------1------------------')
   console.log('------------------1------------------')
   console.log('------------------1------------------')
  done()
});*/

/*gulp.task('haha', async function() {
  await console.log('------------------1------------------')
  await console.log('------------------1------------------')
  await console.log('------------------1------------------')
});*/

gulp.task('haha', function() {
  console.log('------------------1------------------')
  console.log('------------------1------------------')
  console.log('------------------1------------------')
  return createReadStream('./package.json')
});


