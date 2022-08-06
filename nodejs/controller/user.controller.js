const {
  UserRegisterError,
  userDeleteError
} = require("../error/error");
const {
  createUser,
  getUserinfo,
  getPersonInfo,
  createUserInformation,
  DeleteUserinfo,
  getUniqueWeixinInfo,
  reqBindingEMP,
  reqWeiXinCheck,
  getScanTime,
  reqCheckTime
} = require('../service/user.service')
const jwt = require('jsonwebtoken')
const secret = 'xjc20000509'
const jwtAuth = require("koa-jwt")
class UserController {
  async userSaveInformation(ctx, next) {
    try { //错误捕捉
      jwtAuth({
        secret
      })
      const {
        date,
        number,
        address,
        name
      } = ctx.request.body
      console.log(date,
        number,
        address,
        name)
      const res = await createUserInformation(date, number, address, name)
      ctx.body = {
        code: 200,
        message: "数据存入成功",
        result: res
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', UserRegisterError, ctx) //触发error事件
    }
  }
  async userRegister(ctx, next) {
    try { //错误捕捉
      const {
        username,
        password
      } = ctx.request.body
      console.log(username,
        password)
      const res = await createUser(username,
        password)
      ctx.body = {
        code: 200,
        message: "注册成功",
        result: res
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', UserRegisterError, ctx) //触发error事件
    }
  }
  async userInformation(ctx, next) {
    try {
      const res = await getPersonInfo()
      ctx.body = {
        code: 200,
        message: "查询数据成功",
        data: res
      }
    } catch (error) {
      console.log(err)
      ctx.app.emit('error', UserRegisterError, ctx)
    }
  }

  async userLogin(ctx, next) {
    try {
      const {
        username
      } = ctx.request.body;

      const {
        password,
        ...res
      } = await getUserinfo({
        username
      }) //把密码排除掉不返回

      ctx.body = {
        code: 0,
        message: "登录成功",
        result: {
          token: jwt.sign(res, secret, {
            expiresIn: '1d'
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  async getInfo(ctx, next) {
    try {
      const {
        id
      } = ctx.state.user; //因为token里面加入了我们的个人信息所以我们可以解构出我们的id
      const res = await getUserinfo({
        id
      })
      ctx.body = {
        code: 0,
        message: '查询成功',
        result: res
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userDeleteError, ctx)
    }
  }
  async userDeleteInformation(ctx, next) {
    try {
      const {
        username,
        deleteTime
      } = ctx.request.body;
      const res = await DeleteUserinfo({
        username,
        deleteTime
      })
      ctx.body = {
        code: 200,
        message: '删除成功',
        result: res
      }
    } catch (err) {
      console.log(err)
    }
  }
  async getWeixinInfo(ctx, next) {
    try {
      const {
        code
      } = ctx.request.body;
      console.log(code)
      const res = await getUniqueWeixinInfo(code)
      ctx.body = {
        code: 200,
        message: '获取成功',
        data: res
      }
    } catch (error) {
      console.log(err)
    }
  }
  async bindingEMP(ctx, next) {
    try {
      const {
        EMPnumber,
        code
      } = ctx.request.body
      console.log(EMPnumber)
      const res = await reqBindingEMP(EMPnumber, code)
      ctx.body = {
        code: 200,
        message: '绑定成功',
        data: res
      }
    } catch (error) {
      console.log(err)
    }
  }
  async WeiXinCheck(ctx) {
    try {
      const {
        EMPnumber
      } = ctx.request.body
      const res = await reqWeiXinCheck(EMPnumber)
      ctx.body = {
        code: 200,
        message: '打卡成功',
        data: res
      }
    } catch (error) {
      console.log(err)
    }
  }
  scanTime(ctx) {
    try {
      const res = getScanTime()
      ctx.body = {
        code: 200,
        message: "返回时间成功",
        data: {
          token: jwt.sign(res, secret, {
            expiresIn: '1d'
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  async checkTime(ctx) {
    try {
      const {
        tokenTime
      } = ctx.request.body
      const res = await reqCheckTime(tokenTime)
      ctx.body = {
        code: 200,
        message: '111',
        data: res
      }
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new UserController()