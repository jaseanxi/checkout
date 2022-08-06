const User = require('../model/user.model')
const UserLogin = require('../model/userLogin.model')
//引入user模型
const WeiXinSQL = require('../model/weixinInfo.model')
const jwt = require('jsonwebtoken')
//向其他服务器发送请求
const axios = require('axios')
const EMPbinding = require('../model/weixinEMPbinding.model')

const appid = 'wx487719318dda6051'
const secret = '963d893405ff4d46ec18f4b64e3b1656'
class UserService {
  async createUserInformation(date, number, address, name) {
    return await User.create({
      date,
      number,
      address,
      name
    }) //创建数据库条目 更多查询器参考https://www.sequelize.com.cn/core-concepts/model-querying-basics
  }
  async createUser(username, password) {
    return await UserLogin.create({
      username,
      password
    }) //创建数据库条目 更多查询器参考https://www.sequelize.com.cn/core-concepts/model-querying-basics
  }
  async getPersonInfo() {
    const res = await User.findAll({
      where: {
        deleteTime: null
      }
    })
    console.log(res)
    return res
  }

  async getUserinfo({
    username,
    id
  }) {
    const whereOpt = {}; //创建一个对象，这个对象就是包涵了需要查询的条件
    id && Object.assign(whereOpt, {
      id
    }) //合并对象，如果有这个参数的话就合并进去进行查询，可以复用查询
    username && Object.assign(whereOpt, {
      username
    })

    const res = await UserLogin.findOne({
      attributes: ['id', 'username', 'password', 'createdAt', 'updatedAt'], //查询成功后需要返回的字段
      where: whereOpt //查询条件
    })
    return res ? res.dataValues : false //如果成功查询到的话就返回数据，如果没有的话就GG
  }
  async DeleteUserinfo({
    username,
    deleteTime
  }) {
    return await User.update({
      deleteTime
    }, {
      where: {
        name: username
      }
    })
  }
  async getUniqueWeixinInfo(
    code
  ) {
    console.log(code)
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    // 发送 POST 请求
    let session_key = ''
    let openid = ''
    await axios({
      method: 'post',
      url,
      data: {
        code
      }
    }).then(function (response) {
      session_key = response.data.session_key
      openid = response.data.openid
      console.log(session_key, openid)
    });
    const whereOpt = {
      openid
    }
    const res = await EMPbinding.findOne({
      attributes: ['openid', 'EMPnumber'], //查询成功后需要返回的字段
      where: whereOpt //查询条件
    })
    console.log(res)
    return res
  }
  async reqBindingEMP(EMPnumber, code) {
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    // 发送 POST 请求
    let session_key = ''
    let openid = ''
    await axios({
      method: 'post',
      url,
      data: {
        code
      }
    }).then(function (response) {
      session_key = response.data.session_key
      openid = response.data.openid
      console.log(session_key, openid)
    });
    const whereOpt = {
      openid
    }
    const res = await EMPbinding.findOne({
      attributes: ['EMPnumber', 'openid'], //查询成功后需要返回的字段
      where: whereOpt //查询条件
    })
    // console.log(typeof (res) == undefined)
    // console.log(res)
    // console.log(res.dataValues.EMPnumber, '111')
    if (res === null || res.dataValues.EMPnumber === null) {
      console.log(111)
      return await EMPbinding.create({
        openid,
        EMPnumber
      })
    } else {
      return false
    }

  }
  async reqWeiXinCheck(EMPnumber) {
    console.log(EMPnumber)
    return await WeiXinSQL.create({
      EMPnumber,
      isCheck: true,
    })
  }
  getScanTime() {
    let time = new Date().getTime()
    console.log(time)
    return {
      time
    }
  }
  reqCheckTime(tokenTime) {
    let timeNow = new Date().getTime()
    console.log(timeNow)
    let decode = jwt.decode(tokenTime)
    let timePast = decode.time
    console.log(decode.time)
    let difference = timeNow - timePast
    if (difference <= 1000 * 10) {
      return true
    } else {
      return false
    }
  }
}


module.exports = new UserService()