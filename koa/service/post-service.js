const {postModel} = require('../model');
module.exports = {
  async addPostResult(obj){
    let result = await postModel.addPostData(obj);
    return result;
  },
  async deleteItemResult(obj){
    let result = await postModel.deleteItem(obj);
    return result;
  },
  async updateItemResult(obj){
    let result = await postModel.updateItem(obj);
    return result;
  }
}