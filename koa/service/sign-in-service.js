const {signInModel} = require('../model');
module.exports = {
  async getUser (account) {
    const result = await signInModel.findUser(account);
    return result
  }
}