const {getDB} = require('../db');
module.exports = {
  async addAccount(obj){
    const account = obj.account;
    const data = obj.data
    const sql = 'INSERT INTO users_account (userId,account,password) VALUES (?,?,?)';
    const [rows] = await getDB().execute(sql,[account.userId,account.account,account.password]);
    let addData = await this.addData(data);
    if(rows.affectedRows===1 ){
      return true;
    }else{
      return false;
    }
  },

  async addData(obj){
    const sql = 'INSERT INTO users_data (userId,account,userName,email,signName,gender,level,integral,subscriptions,fans,status,registerTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    let emptyArr = JSON.stringify([]);
    const [rows] = await getDB().execute(sql,[obj.userId,obj.account,obj.userName,obj.email,'编辑个性签名',obj.gender,obj.level,obj.integral,'[]','[]',obj.status,obj.registerTime]);
    if(rows.affectedRows===1){
      return true;
    }else{
      return false;
    }
  }
}