const {signInService} = require('../service');
const jwt = require('jsonwebtoken')
module.exports = {
  async checkUser (ctx) {
    const {account,password} = ctx.request.body;
    const userData = await signInService.getUser(account);
    if(userData){
      if(userData.password === password){
        const userToken = {
          id: userData.userId,
          name: userData.account
        };
        //jwt密钥
        const secret = 'vue-koa-forum';
        const token = jwt.sign(userToken, secret, {expiresIn: '10s'}); //签发token
        ctx.body = {
          success: true,
          info: '登录成功',
          id: userData.userId,
          name: userData.account,
          token: token
        }
        }else{
          ctx.body = {
            success: false,
            info: '密码错误'
        };
      }
    }else{
      ctx.body = {
        success: false,
        info: '账号不存在'
      }
    }
  }
}