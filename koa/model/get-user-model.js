const {getDB} = require('../db');
function deleteArrKey(key, arr){
  let position=null;
  arr.forEach((item,index)=>{
    if(item===key){
      position = index
    }
  })
  if(position !== null){
    arr.splice(position, 1);
  }
  return arr;
}
module.exports = {
  async getUserData(userId){
    const sql = 'SELECT * FROM users_data WHERE userId=?';
    const [rows] = await getDB().execute(sql, [userId]);
    return rows[0];
  },
  async getPostData(obj){
    const sql = 'SELECT id,author,title,time,comments,likes,indexContent,indexImg,sort From detail_data WHERE id=?';
    let postData = [];
    let rows;
    for(item of obj.arr){
      [rows] = await getDB().execute(sql, [item]);
      if(rows[0]){
        postData.push(rows[0]);
      }else{
        const sqlGet = 'SELECT * FROM users_data WHERE userId=?';
        const sqlDelete = 'UPDATE users_data SET posts=? WHERE userId=?';
        const [rows2] = await getDB().execute(sqlGet, [obj.userId]);
        let posts = rows2[0].posts;
        posts = deleteArrKey(item, posts);
        posts = JSON.stringify(posts)
        const [rows3] = await getDB().execute(sqlDelete, [posts, obj.userId])
      }
    }
    return postData;
  },
  async getFavorData(obj){
    const sql = 'SELECT id,author,title,time,comments,likes,indexContent,indexImg,sort From detail_data WHERE id=?';
    let favorData = [];
    let rows;
    for(item of obj.arr){
      [rows] = await getDB().execute(sql, [item]);
      if(rows[0]){
        favorData.push(rows[0]);
      }else{
        const sqlGet = 'SELECT * FROM users_data WHERE userId=?';
        const sqlDelete = 'UPDATE users_data SET favors=? WHERE userId=?';
        const [rows2] = await getDB().execute(sqlGet, [obj.userId]);
        let favors = rows2[0].favors;
        favors = deleteArrKey(item, favors);
        favors = JSON.stringify(favors)
        const [rows3] = await getDB().execute(sqlDelete, [favors, obj.userId])
      }
    }
    return favorData;
  },
  async updateData(obj){
    const sql = 'UPDATE users_data SET '+obj.dataName+'=? WHERE userId=?';
    const [rows] = await getDB().execute(sql, [obj.data,obj.userId]);
    if(rows.affectedRows===1){
      return true
    }else{
      return false
    }
  }
}