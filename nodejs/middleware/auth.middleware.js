const jwt = require('jsonwebtoken')
const {
  TokenExpiredError,
  JsonWebTokenError
} = require('../error/error')
const auth = async (ctx, next) => {
  try {
    const {
      token
    } = ctx.request.header
    ctx.state.user = jwt.verify(token, 'fjhtglxt') //token验证，如果合法则存在变量ctx.state.user中
  } catch (err) {
    console.log(err)
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已经过期', err)
        return ctx.app.emit('error', TokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', JsonWebTokenError, ctx)
    }
  }
  await next()
  //  TokenExpiredError:{
  //     code:'405',
  //     message:'过期的token',
  //     result:''
  //   },
  //   JsonWebTokenError:{
  //     code:'405',
  //     message:'无效的token',
  //     result:''
  //   },
}
module.exports = {
  auth
}