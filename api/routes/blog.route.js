const verifyUser = require("../../middleware/verifyToken.js");
const Blog = require("../controllers/blog.controller.js");
const router = require('express').Router();

router.post("/create", verifyUser ,Blog().createBlog);
router.put("/:id", verifyUser ,Blog().updateBlog);
router.delete("/:id", verifyUser,Blog().deleteBlog);
router.get("/:id", Blog().getBlog);
router.get("/", Blog().getallBlog);



module.exports = router;