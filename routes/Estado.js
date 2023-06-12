const { Router } = require('express')
const {createEstado, getEstados} =
 require('../controllers/Estado')
 const bycript=require('bcryptjs');
 const {validarJWT}=require('../middleware/validar-jwt');
 const { validarRolAdmin } = require('../middleware/validar-rol-admin');


const router = Router()


// crear
router.post('/',[validarJWT], createEstado)


// consultar todos
router.get('/',[validarJWT], getEstados)


module.exports = router;