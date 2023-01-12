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
    } = req.body ;
    
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

UsersController.agregarGasto = async (req,res) => { 

    try { 

// todo: hacer la funcion de agregar un gasto 
    }catch (error) {
        return res.send(error)
    }
}


module.exports = UsersController;