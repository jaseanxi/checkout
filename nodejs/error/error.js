module.exports = {
  UserRegisterError: {
    code: '10001',
    message: '参数错误or其他错误',
    result: ''
  },
  userPasswordError: {
    code: '10101',
    message: '密码不正确',
    result: ''
  },
  userIsundefined: {
    code: '10003',
    message: '用户不存在',
    result: ''
  },
  TokenExpiredError: {
    code: '405',
    message: '过期的token',
    result: ''
  },
  JsonWebTokenError: {
    code: '405',
    message: '无效的token',
    result: ''
  },
  userDeleteError: {
    code: '10086',
    message: '删除失败',
    result: ''
  }
}