const {getDataModel} = require('../model');
module.exports = {
  async getIndexDataResult(){
    let result = await getDataModel.getIndexData();
    return result;
  },
  async getDetailDataResult(id){
    let result = await getDataModel.getDetailData(id);
    return result;
  },
  async getSortDataResult(sort){
    let result = await getDataModel.getSortData(sort);
    return result;
  }
}