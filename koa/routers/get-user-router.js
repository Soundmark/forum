const Router = require('koa-router');
const {getUserController} = require('../controller');

const router = new Router();
router.get('/api/getUserData', getUserController.getUserDataControl);
router.post('/api/getPostData', getUserController.getPostDataControl);
router.post('/api/getFavorData', getUserController.getFavorDataControl);
router.post('/api/updateData', getUserController.updateDataControl);

module.exports = router;