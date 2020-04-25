const {signUpModel} = require('../model');
module.exports = {
  async addAccountResult(obj){
    const result = await signUpModel.addAccount(obj);
    return result;
  },
  async addDataResult(obj){
    const result = await signUpModel.addData(obj);
    return result;
  }
}