
const usuario = require('../models/Usuario')
const Usuario = require('../models/Usuario')
const { request, response} = require('express')

// crear
const createUsuario= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        const email = data.email
        console.log(data)
        const usuarioBD = await Usuario.findOne({ email })
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe usuario'})
        }
        const usuario = new Usuario(data)
        console.log(usuario)
        await usuario.save()
        return res.status(201).json(usuario)
    }catch(e){
        console.log(e)
        return res.status(500).json({e})
    }
}
//listar todos
const getUsuarios= async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const usuariosDB = await Usuario.find({estado})//select * from estados where estado=?
            return res.json(usuariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const updateUsuarioByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        /*const tipoequipoDB = await Marca.findById(id)
        if(!tipoequipoDB){
            return res.json({msg: 'No existe el tipo equipo'})
        }*/
        data.fechaActualizacion = new Date()
        console.log(data)
        const usuarios = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.json(usuarios)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = {createUsuario, getUsuarios,updateUsuarioByID}