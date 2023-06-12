const { Router } = require('express')
const {createMarca, getMarcas} =
 require('../controllers/marca')
 const bycript=require('bcryptjs');
 const {validarJWT}=require('../middleware/validar-jwt');
 const { validarRolAdmin } = require('../middleware/validar-rol-admin');


const router = Router()


// crear
router.post('/',[validarJWT], createMarca)


// consultar todos
router.get('/',[validarJWT], getMarcas)


module.exports = router;