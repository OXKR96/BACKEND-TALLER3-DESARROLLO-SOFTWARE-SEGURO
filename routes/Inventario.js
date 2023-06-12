const { Router } = require('express')
const { createInventario, getInventarios} =
 require('../controllers/Inventario')
 const bycript=require('bcryptjs');
const {validarJWT}=require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router()

// crear
router.post('/',[validarJWT],[validarRolAdmin], createInventario)

// consultar todos
router.get('/',[validarJWT], getInventarios)

module.exports = router;