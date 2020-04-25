const {getDB} = require('../db');
module.exports = {
  async addPostData(obj){
    const sql1 = 'INSERT INTO detail_data (id,userId,author,title,time,content,indexContent,indexImg,sort) VALUES (?,?,?,?,?,?,?,?,?)' ;
    const sql2 = 'SELECT * FROM users_data WHERE userId=?';
    const sql3 = 'UPDATE users_data SET posts=? WHERE userId=?';
    const [rows1] = await getDB().execute(sql1, [obj.id,obj.userId,obj.author,obj.title,obj.time,obj.content,obj.indexContent,obj.indexImg,obj.sort]);
    const [rows2] = await getDB().execute(sql2, [obj.userId]);
    let data;
    if(rows2[0].posts){
      data = rows2[0].posts
    }else{
      data = [];
    }
    data.push(obj.id);
    data = JSON.stringify(data);
    const [rows3] = await getDB().execute(sql3, [data,obj.userId]);
    if(rows1.affectedRows===1 && rows3.affectedRows===1){
      return true
    }else{
      return false
    }
  },
  async deleteItem(obj){
    const sql1 = 'DELETE FROM detail_data WHERE id=?';
    const [rows1] = await getDB().execute(sql1, [obj.id]);
    if(rows1.affectedRows===1){
      return true
    }else{
      return false
    }
  },
  async updateItem(obj){
    await this.deleteItem(obj);
    const sql = 'INSERT INTO detail_data (id,userId,author,title,time,content,indexContent,indexImg,sort) VALUES (?,?,?,?,?,?,?,?,?)';
    const [rows] = await getDB().execute(sql, [obj.id,obj.userId,obj.author,obj.title,obj.time,obj.content,obj.indexContent,obj.indexImg,obj.sort]);
    if(rows.affectedRows===1){
      return true
    }else{
      return false
    }
  }
}