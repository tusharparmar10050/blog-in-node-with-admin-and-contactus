const createError = require("../helper/error")
const con = require("../config/database.js")


exports.create_blog = async (value) => {

    const c = await con.query(`INSERT INTO blog(image , title , subtitle, date, blogby , html) VALUES(?, ?, ?, ?, ?, ?)`, value)
    console.log("c.values", c.values)
    return {
        success: true,
        value: c.values

    }

}

exports.getBlog = (id, callback) => {
    con.query(`SELECT * FROM blog WHERE id = ?`, [id], (error, result) => {
        if (error) {
            return callback(error);
        }
        return callback(null, result[0]);
    })
}

exports.getallBlog = (callback) => {
    con.query(`SELECT * FROM blog`, (error, result) => {
        if (error) {
            return callback('error: ' + error)
        }
        return callback(null, result);

    })
}

exports.updateBlog = (id, updated_value, callback) => {
    con.query(`UPDATE blog SET image=?, title=?, subtitle=?, date=?, blogby=?, html=? WHERE id = ?`, [...updated_value, id], callback)
}

exports.deleteBlog = (id, callback) => {
    con.query('DELETE FROM blog WHERE id = ?', [id], (error, results) => {
        if (error) {
            callback(error);
        }
        callback(null, results);
    });
}