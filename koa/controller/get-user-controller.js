const {getUserService} = require('../service');
module.exports = {
  async getUserDataControl(ctx){
    let {userId} = ctx.query;
    ctx.body = await getUserService.getUserDataResult(userId);
  },
  async getPostDataControl(ctx){
    let obj = ctx.request.body;
    ctx.body = await getUserService.getPostDataResult(obj);
  },
  async getFavorDataControl(ctx){
    let obj = ctx.request.body;
    ctx.body = await getUserService.getFavorDataResult(obj);
  },
  async updateDataControl(ctx){
    let obj = ctx.request.body;
    ctx.body = await getUserService.updateDataResult(obj);
  }
}