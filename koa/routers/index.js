 const sign_in = require('./sign-in-router');
 const sign_up = require('./sign-up-router');
 const post = require('./post-router');
 const get_data = require('./get-data-router');
 const get_user = require('./get-user-router');

module.exports = (app)=>{
  app.use(sign_in.routes());
  app.use(sign_up.routes());
  app.use(post.routes());
  app.use(get_data.routes());
  app.use(get_user.routes());
}