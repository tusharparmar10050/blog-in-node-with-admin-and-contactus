const con = require('../config/database.js')
const bcrypt = require('bcryptjs');


exports.registerUser = (value, callback) => {
    con.query(`INSERT INTO user(username , email , password) VALUES(?, ?, ?)`, value, (error, result) => {
        if (error) {
            console.log('error adding user: ', error);
            callback(error, null);
        }else {
            console.log('User added successfully!');
            callback(null, result);
          }
    })

}
exports.updateUser = async (id, username, email) => {
    try {
      const result = await con.query(`UPDATE user SET username = ?, email = ? WHERE id = ?`, [username, email, id]);
      const user = { id, username, email };
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

exports.deleteUser = (id, callback) => {
    con.query(`DELETE FROM user WHERE id = ?`, [id], (error, result) => {
        if (error) {
            return callback('error: ' + error)
        }
        return callback(null, result);
    });
}