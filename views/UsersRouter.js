const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

router.get("/", UsersController.allUser);
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.post("/agregarGasto", UsersController.agregarGasto);
router.post("/agregarIngreso", UsersController.agregarIngreso);



module.exports = router;