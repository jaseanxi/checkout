const {
  DataTypes
} = require('sequelize')
const seq = require('../db/sql')
//username,password 为表的字段

const UserLogin = seq.define('userLogin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户名"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "用户密码"
  }
})
//模型同步
UserLogin.sync()
//-   `User.sync()` - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
//-   `User.sync({ force: true })` - 将创建表,如果表已经存在,则将其首先删除
//-   `User.sync({ alter: true })` - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
module.exports = UserLogin