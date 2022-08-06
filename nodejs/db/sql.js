const {
  Sequelize
} = require("sequelize")
const seq = new Sequelize("personmanage", "root", "root", {
  host: "localhost",
  dialect: "mysql"
}) //实例化,xxxx是你的数据库密码
//连接测试
seq.authenticate().then(() => {
  console.log("和你的数据连接成功了！")
}).catch((err) => {
  console.log("数据库连接失败", err)
})

module.exports = seq