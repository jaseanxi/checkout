const {
  getUserinfo
} = require('../service/user.service')
const {
  userPasswordError,
  userIsundefined,
  userLoginError
} = require("../error/error");
const verifyLogin = async (ctx, next) => { //验证密码中间件
  try {
    const {
      username,
      password
    } = ctx.request.body;
    const res = await getUserinfo({
      username
    });
    //用户不存在
    if (!res) {
      console.log('用户不存在', ctx.request.body)
      ctx.app.emit('error', userIsundefined, ctx)
      return
    }
    if (password !== res.password) {
      console.log(password, res.password)
      ctx.app.emit('error', userPasswordError, ctx)
      return
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', userLoginError, ctx)
  }
  await next(); //进入下一个中间件
}

module.exports = {
  verifyLogin
}