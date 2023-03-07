const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

router.get("/", UsersController.allUser);

router.post("/register", UsersController.register);

router.post("/login", UsersController.login);

router.post("/agregarGasto", UsersController.agregarGasto);

router.delete("/quitarGasto", UsersController.quitarGasto);

router.post("/agregarIngreso", UsersController.agregarIngreso);

router.delete("/quitarIngreso", UsersController.quitarIngreso);





module.exports = router;