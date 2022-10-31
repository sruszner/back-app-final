
const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGOATLAS;

const conexion =  mongoose.connect(URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('DB Connected');
})

mongoose.connection.on('error', () => {
    console.log('Error - DB');
})

module.exports = conexion;