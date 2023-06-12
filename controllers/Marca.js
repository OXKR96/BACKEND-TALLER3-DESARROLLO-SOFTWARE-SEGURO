const Marca = require('../models/marca')
const { request, response} = require('express')


// crear
const createMarca = async (req = request,
    res = response) => {
    try{
        const nombre = req.body.nombre
            ? req.body.nombre.toUpperCase()
            : ''
        const marcaDB = await Marca.findOne({nombre})//select * from marca where nombre=?
       
        if(marcaDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  // nombre: nombre
        }
        const marca = new Marca(data)
        console.log(marca)
        await marca.save()
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}


//listar todos
const getMarcas = async (req = request,
    res = response) => {
        try{
            const { estado } = req.query
            const marcasDB = await Marca.find({estado})//select * from marca where estado=?
            return res.json(marcasDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}




module.exports = {createMarca, getMarcas}