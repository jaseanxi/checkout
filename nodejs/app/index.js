const Koa = require('koa')
const app = new Koa()
const router = require('../router/index.js')
const koaBody = require('koa-body')
app.use(koaBody())


app.use(router.routes()).use(router.allowedMethods()) //allowedMethods koa-router的中间件，用于处理请求方式不同进行特殊处理;
app.on('error', (err, ctx) => { //新增
  let status = 500
  switch (err.code) { //这里可以判断你传进来的错误码，相应的改变返回的状态码，可以更好的知道发生了什么类型的错误，这里是一个例子，具体可以根据你前后端自己协调
    case '10001':
      status = 400
      break
    case '10002':
      status = 409
      break

    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
})



module.exports = app //导出