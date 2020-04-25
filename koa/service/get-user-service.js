const {getUserModel} = require('../model');
module.exports = {
  async getUserDataResult(userId){
    let result = await getUserModel.getUserData(userId);
    return result;
  },
  async getPostDataResult(obj){
    let result = await getUserModel.getPostData(obj);
    return result;
  },
  async getFavorDataResult(obj){
    let result = await getUserModel.getFavorData(obj);
    return result;
  },
  async updateDataResult(obj){
    let result = await getUserModel.updateData(obj);
    return result;
  }
}