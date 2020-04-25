const {getDB} = require('../db');
module.exports = {
  async findUser (account) {
    const sql = 'SELECT * FROM users_account WHERE account=?';
    const [rows] = await getDB().execute(sql,[account]);
    return rows[0];
  }
}