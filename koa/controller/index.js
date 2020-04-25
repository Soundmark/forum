const sign_in = require('./sign-in-controller');
const sign_up = require('./sign-up-controller');
const post = require('./post-controller'); 
const get_data = require('./get-data-controller');
const get_user = require('./get-user-controller');
module.exports = {
  signInController: sign_in,
  signUpController: sign_up,
  postController: post,
  getDataController: get_data,
  getUserController: get_user
}