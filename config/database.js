const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
})
con.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Database connection established")
    }
})

module.exports = con