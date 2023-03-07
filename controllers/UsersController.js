const UsersController = {};
const authConfig = require('../config/auth');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

UsersController.allUser = async (req, res) => {

    try {

        await User.find()
            .then(data => {
                res.send(data)
            }).catch(error => {
                res.send(error)
            })

    } catch (error) {

        res.send(error)
    }

}

UsersController.register = async (req, res) => {

    let {
        firstName,
        lastName,
        userName,
    } = req.body;

    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    User.find({
        userName: userName
    }).then(datosRepetidos => {
        if (datosRepetidos == false) {

            User.create({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: password
            }).then(user => {
                res.send(`${user.firstName}, Has sido registrado con exito`);
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.send("El usuario con ese e-mail ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });
}

UsersController.login = async (req, res) => {

    let {
        userName,
        password
    } = req.body;

    User.findOne({
        userName: userName
    }).then(Usuario => {

        if (!Usuario) {
            res.send("Usuario o contraseña inválido");

        } else {

            if (bcrypt.compareSync(password, Usuario.password)) {

                let token = jwt.sign({
                    user: Usuario
                }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                Usuario.token = token
                res.json({
                    user: Usuario,
                    token: token,
                    loginSucces: true
                })

            } else {
                res.status(401).json({
                    msg: "Usuario o contraseña inválidos"
                });
            }
        };

    }).catch(error => {
        res.send(error);
    })

}

UsersController.agregarGasto = async (req, res) => {

    let {
        id_user,
        nombre,
        cantidad
    } = req.body;

    try {
        await User.findOneAndUpdate({
            _id: id_user
        }, {
            $push: {
                egresos: {
                    "nombre": nombre,
                    "cantidad": cantidad
                }
            }
        })

        await User.findById({
            _id: id_user
        }).then(informacion => {

            const [egreso] = informacion.egresos.slice(-1);
            const {
                nombre,
                cantidad
            } = egreso;

            res.status(200).send(`Has ingresado ${nombre} bajo el monto de ${cantidad} euros.`)
        }).catch(error => {
            res.status(500).send(error)
        })


    } catch (error) {
        return res.send(error)
    }
}

UsersController.quitarGasto = async (req, res) => {

    let {
        id_user,
        id_egreso,
    } = req.body;

    try {

        await User.updateOne({
            _id: id_user,
        }, {
            $pull: {
                egresos: {
                    _id: id_egreso
                }
            }
        }).then(info => {
        return res.send("se ha quitado el gasto")
        })

    } catch (error) {
        return res.send(error)
    }
}
UsersController.agregarIngreso = async (req, res) => {

    let {
        id_user,
        nombre,
        cantidad
    } = req.body;

    try {
        await User.findOneAndUpdate({
            _id: id_user
        }, {
            $push: {
                ingresos: {
                    "nombre": nombre,
                    "cantidad": cantidad
                }
            }
        })

        await User.findById({
            _id: id_user
        }).then(informacion => {

            const [ingreso] = informacion.ingresos.slice(-1);
            const {
                nombre,
                cantidad
            } = ingreso;

            res.status(200).send(`Has ingresado ${nombre} bajo el monto de ${cantidad} euros.`)
        }).catch(error => {
            res.status(500).send(error)
        })


    } catch (error) {
        return res.send(error)
    }
}

UsersController.quitarIngreso = async (req, res) => {
    let {
        id_user,
        id_egreso,
    } = req.body;

    try {

        await User.updateOne({
            _id: id_user,
        }, {
            $pull: {
                ingresos: {
                    _id: id_egreso
                }
            }
        }).then(info => {
        return res.send("se ha quitado el gasto")
        })

    } catch (error) {
        return res.send(error)
    }
}

module.exports = UsersController;