const {postController} = require('../controller');
const Router = require('koa-router');

const router = new Router();
router.post('/user/post', postController.addPostControl);
router.post('/user/deleteItem', postController.deleteItemControl);
router.post('/user/updatePost', postController.updateItemControl);

module.exports = router;