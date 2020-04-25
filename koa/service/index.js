const sign_in = require('./sign-in-service');
const sign_up = require('./sign-up-service');
const post = require('./post-service');
const get_data = require('./get-data-service');
const get_user = require('./get-user-service');
module.exports = {
  signInService: sign_in,
  signUpService: sign_up,
  postService: post,
  getDataService: get_data,
  getUserService: get_user
}