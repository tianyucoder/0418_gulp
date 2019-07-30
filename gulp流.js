//引入gulp
// let gulp = require('gulp');

/*
* 警告：Did you forget to signal async completion?
*   解决办法：
*     1.任务的回调函数中传递一个done参数，当任务全部处理完毕时，调用done。
*     2.将任务的回调函数用async声明，所有任务语句用await。
*     3.返回一个流（可读流）
* */

let {createReadStream,createWriteStream} = require('fs')
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

/*gulp.task('haha', function() {
  console.log('------------------1------------------')
  console.log('------------------1------------------')
  console.log('------------------1------------------')
  return createReadStream('./package.json')
});*/

//流
let rs =  createReadStream('./demo.html')
let ws = createWriteStream('./demo2.html')

rs.on('open',()=>{
   console.log('可读流打开了')
})
rs.on('close',()=>{
  console.log('可读流关闭了')
  ws.close()
})
ws.on('open',()=>{
  console.log('可写流打开了')
})
ws.on('close',()=>{
  console.log('可写流打开了')
})

/*rs.on('data',(data)=>{
    ws.write(data)
})*/

rs.pipe(ws)





