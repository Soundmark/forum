const {signUpController} = require('../controller');
const Router = require('koa-router');

const router = new Router();
router.post('/user/signup',signUpController.setAccount);

module.exports = router;