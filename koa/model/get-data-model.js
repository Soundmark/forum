const {getDB} = require('../db');
module.exports = {
  async getIndexData(){
    const sql = 'SELECT id,author,title,time,comments,likes,indexContent,indexImg,sort FROM `detail_data`';
    const [rows] = await getDB().execute(sql);
    return rows;
  },
  async getDetailData(id){
    const sql = 'SELECT * FROM detail_data WHERE id=?';
    const [rows] = await getDB().execute(sql, [id]);
    return rows[0];
  },
  async getSortData(sort){
    const sql = 'SELECT id,author,title,time,comments,likes,indexContent,indexImg FROM detail_data WHERE sort=?';
    const [rows] = await getDB().execute(sql, [sort]);
    return rows;
  }
}