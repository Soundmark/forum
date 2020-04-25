const sign_in = require('./sign-in-model');
const sign_up = require('./sign-up-model');
const post = require('./post-model');
const get_data = require('./get-data-model');
const get_user = require('./get-user-model');
module.exports={
  signInModel: sign_in,
  signUpModel: sign_up,
  postModel: post,
  getDataModel: get_data,
  getUserModel: get_user
}