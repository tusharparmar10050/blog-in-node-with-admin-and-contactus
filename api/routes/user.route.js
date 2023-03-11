const User = require("../controllers/user.controller.js");
const router = require('express').Router();
const verifyUser = require("../../middleware/verifyToken.js");

router.post("/register", User().createUser);
router.post("/login", User().loginUser);
router.put("/:id", User().updateUser);
router.delete("/:id", verifyUser,User().deleteUser);


module.exports = router;