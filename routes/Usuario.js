const { Router } = require('express')
const Usuario=require('../models/Usuario')
const {validationResult, check}=require('express-validator');
const bycript=require('bcryptjs');
const {validarJWT}=require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const {updateUsuarioByID} =require('../controllers/Usuario')




const router = Router()


// crear
router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('email','invalid.email').isEmail(),
    check('rol','invalid.rol').isIn(['ADMIN','OBSERVADOR']),
    check('contraseña','invalid.contraseña').not().isEmpty(),
    validarJWT,validarRolAdmin
],async function(req,res){

    try{

        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        

        const existeUsuario=await Usuario.findOne({email:req.body.email});
        if(existeUsuario){
            return res.status(400).send('Email ya existe');
        }

        let usuario=new Usuario();
        usuario.nombre= req.body.nombre;
        usuario.email= req.body.email;
        usuario.rol=req.body.rol;

        const salt=bycript.genSaltSync();
        const contraseña=bycript.hashSync(req.body.contraseña,salt);
        usuario.contraseña=contraseña;

        usuario.fechaCreacion=new Date();
        usuario.fechaActualizacion=new Date();

        usuario=await usuario.save();
        res.send(usuario);



    }catch(error){
        console.log(error);
        res.status(500).json({mensaje:'internal server error'});
    }
});


// consultar todos
    router.get('/',[validarJWT], async function(req,res){
        try{
            const usuarios=await Usuario.find();
            res.send(usuarios);

        }catch(error){
            console.log(error);
            res.status(500).send('Ocurrio un error')
        }


    })

// consultar todos
router.put('/:id',[validarJWT], updateUsuarioByID)

module.exports = router;