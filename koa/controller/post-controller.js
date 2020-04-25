const {postService} = require('../service');
module.exports = {
  async addPostControl(ctx){
    let data = ctx.request.body;
    let result = await postService.addPostResult(data);
    if(result){
      ctx.body={
        success: true,
        info: '发表成功'
      }
    }
  },
  async deleteItemControl(ctx){
    let obj = ctx.request.body;
    let result = await postService.deleteItemResult(obj);
    if(result){
      ctx.body='删除成功'
    }
  },
  async updateItemControl(ctx){
    let obj = ctx.request.body;
    let result = await postService.updateItemResult(obj);
    if(result){
      ctx.body={
        success: true,
        info: '修改成功'
      }
    }
  }
}