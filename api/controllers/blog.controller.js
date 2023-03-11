const con = require('../../config/database.js')
const blogModule = require('../../modules/blog.js')
const createError = require('../../helper/error.js');

const Blog = () => {
    return {
        createBlog: async (req, res) => {
            try {
                value = [req.body.image, req.body.title, req.body.subtitle, req.body.date, req.body.blogby, req.body.html]
                const response = await blogModule.create_blog(value);
                console.log("response", response)
                return res.status(200).json(response);
            } catch (error) {
                return error
            }

        },

        updateBlog: (req, res) => {
            const id = req.params.id
            const updated_value = [req.body.image, req.body.title, req.body.subtitle, req.body.date, req.body.blogby, req.body.html]
            blogModule.updateBlog(id, updated_value, (error, data) => {
                if (error) throw error;
                res.send('Recording updated successfully')
            })
        },

        deleteBlog: (req, res, next) => {
            const id = req.params.id
            blogModule.deleteBlog(id, (error, results) => {
                if (error){
                    console.log(error)
                    return res.status(500).send('Error deleting blog');
                }
                res.send('Blog deleted')
            })
        },

        getallBlog: (req, res, next) => {
            blogModule.getallBlog(function(error, data) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error getting blogs',
                        error: error
                    });
                }
                console.log(data)
                return res.status(200).json(data);
            })
        },

        getBlog: (req, res, next) => {
            const id = req.params.id;
            blogModule.getBlog(id, function (error, data) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error getting blog by id: ' + id,
                        error: error,
                    });
                }
                console.log(data)
                return res.status(200).json(data);
            })
        }
    }
}
module.exports = Blog