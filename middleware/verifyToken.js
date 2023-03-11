const con = require('../config/database.js')
require("dotenv").config();
const jwt = require('jsonwebtoken')
const createError = require('../helper/error.js')

function verifyUser(req, res, next) {
  const id = req.headers['id'];
  const jwt_token = req.headers['token'];


  con.query(`SELECT token FROM user WHERE id = ?`,[id], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.status(404).send({success: false, message: 'enter proper user'})
      // User not found
    } else {
      const storedToken = results[0].token;
      if (storedToken === jwt_token){
        
        // res.status(200).send({ success: true, message:'User is Authenticated'});
        next();
          // jwt.verify(storedToken, process.env.JWT_KEY, (error,decoded) => {
          //   if (error) {
          //     res.send('error: ' + err)
          // } else {
          // }
          // });
      }else{
        return next(createError(403, "User is Unauthenticated"))

      }
    }
  });
}

module.exports = verifyUser
