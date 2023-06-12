const Inventario = require('../models/Inventario')
const { request, response} = require('express')
const Usuario = require('../models/Usuario')
const Marca = require('../models/marca')
const Estado = require('../models/Estado')
const TipoEquipo = require('../models/tipoEquipo')
const {validationResult, check}=require('express-validator');
const bycript=require('bcryptjs');
const {validarJWT}=require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

// crear
const createInventario= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { usuario, marca, estado, tipoEquipo } = data;
        //validando usuario
        const usuarioDB = Usuario.findOne({
            _id: usuario._id,
            estado: true
        })// select * from usuarios where _id=? and estado=true
        if(!usuarioDB){
            return res.status(400).json({msg: 'usuario invalido'})
        }
        // validando marca
        const marcaDB = Marca.findOne({
            _id: marca._id,
            estado: true
        })// select * from marcas where _id=? and estado=true
        if(!marcaDB){
            return res.status(400).json({msg: 'marca invalida'})
        }
        // validando estado
        const estadoDB = Estado.findOne({
            _id: estado._id,
            estado: true
        })// select * from estados where _id=? and estado=true
        if(!estadoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }
        // validando tipo equipo
        const tipoEquipoDB = TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
        })// select * from tipoequipos where _id=? and estado=true
        if(!tipoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }      
        const inventario = new Inventario(data)

        await inventario.save()
        
        return res.status(201).json(inventario)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getInventarios = async (req = request, 
    res = response) => {
        try{
            const inventariosDB = await Inventario.find()//select * from inventarios
                .populate({
                    path: 'usuario',
                    match: { estado: true }
                })
                .populate({
                    path: 'marca',
                    match: { estado: true }
                })
                .populate({
                    path: 'estado',
                    match: { estado: true }
                })
                .populate({
                    path: 'tipoEquipo',
                    match: { estado: true }
                })
            return res.json(inventariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar inventario
const updateInventarioByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const inventario  = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}


module.exports = { createInventario, getInventarios, updateInventarioByID }