const {signUpService} = require('../service');
module.exports = {
  async setAccount(ctx){
    const data = ctx.request.body;
    let result = await signUpService.addAccountResult(data);
    if(result){
      ctx.body = {
        success: true,
        info: '注册成功'
      }
    }else{
      ctx.body = {
        success: false,
        info: '用户名已存在'
      }
    }
  },
  async setData(ctx){
    const data = ctx.request.body;
    await signUpService.addDataResult(data);
  }
}