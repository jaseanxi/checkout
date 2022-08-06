const Router = require('@koa/router');
const {
  userSaveInformation,
  userInformation,
  userLogin,
  userRegister,
  getInfo,
  userDeleteInformation,
  getWeixinInfo,
  bindingEMP,
  WeiXinCheck,
  scanTime,
  checkTime
} = require('../controller/user.controller')

const {
  verifyLogin
} = require('../middleware/user.middleware');


const router = new Router({
  prefix: '/api'
}) //配置接口统一模块路径
// router.get('/add', (ctx, next) => {
//   ctx.body = "路由配置成功了"
// })
// router.post('/register', (ctx, next) => {
//   ctx.body = {
//     code: "0",
//     message: "注册成功"
//   }
// })
router.post('/managePerson', userSaveInformation)
router.get('/managePerson', userInformation)
router.post('/register', userRegister)
router.post('/login', verifyLogin, userLogin)
router.get('/getingo', getInfo)
router.post('/deleteInfo', userDeleteInformation) //删除的数据必须是字符串，如果数据类型发生错误，结果也会错误
router.post('/weixin', getWeixinInfo)
router.post('/bindingEMP', bindingEMP)
router.post('/check', WeiXinCheck)
router.get('/QrCode', scanTime)
router.post('/checkTime', checkTime)
module.exports = router //导出路由