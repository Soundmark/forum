const {getDataService} = require('../service');
module.exports = {
  async getIndexDataControl(ctx){
    ctx.body = await getDataService.getIndexDataResult();
  },
  async getDetailDataControl(ctx){
    let {id} = ctx.query;
    ctx.body = await getDataService.getDetailDataResult(id);
  },
  async getSortDataControl(ctx){
    let {sort} = ctx.query
    ctx.body = await getDataService.getSortDataResult(sort);
  }
}