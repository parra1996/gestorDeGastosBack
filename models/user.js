const mongoose = require('mongoose')
const { type } = require('os')
const { NUMBER, INTEGER } = require('sequelize')

const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    ingresos : [
        {

        }
    ],
    egresos : [
        {

        }
    ],
    resumen_anual : [
        {
            ano : Number,
            cantidad : Number
        }
    ],
    created: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User