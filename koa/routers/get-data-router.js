const Router = require('koa-router');
const {getDataController} = require('../controller');

const router = new Router();
router.get('/api/getData', getDataController.getIndexDataControl);
router.get('/api/getDetail', getDataController.getDetailDataControl);
router.get('/api/getSortData', getDataController.getSortDataControl);

module.exports = router;