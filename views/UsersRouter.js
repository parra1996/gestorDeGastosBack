const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

router.get("/", UsersController.allUser);
router.post("/register", UsersController.register);
router.post("/login", UsersController.login)


module.exports = router;