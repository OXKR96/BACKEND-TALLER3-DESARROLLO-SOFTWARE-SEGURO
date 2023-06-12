const express = require('express')
const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const tipoEquipo = require('./routes/tipoEquipo')
app.use('/api/tiposequipos', tipoEquipo)

const Estado = require('./routes/Estado')
app.use('/api/Estados', Estado)

const Usuario= require('./routes/Usuario')
app.use('/api/Usuarios', Usuario)

const Marca= require('./routes/Marca')
app.use('/api/Marcas', Marca)

const Auth= require('./routes/auth')
app.use('/api/Auth', Auth)

const Inventario= require('./routes/Inventario')
app.use('/api/Inventarios', Inventario)





module.exports = app
