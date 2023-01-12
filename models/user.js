const mongoose = require('mongoose')

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
            nombre : String,
            cantidad : Number
        }
    ],
    egresos : [
        {
            nombre : String,
            cantidad : Number
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