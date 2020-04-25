const Router = require('koa-router');
const {signInController} = require('../controller')

const router = new Router();

router.post('/user/signin',signInController.checkUser);

module.exports = router;