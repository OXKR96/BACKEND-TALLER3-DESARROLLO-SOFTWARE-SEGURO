const { Router } = require('express')
const {createTipoEquipo, getTipoEquipos} =
 require('../controllers/tipoEquipo')
 const bycript=require('bcryptjs');
 const {validarJWT}=require('../middleware/validar-jwt');
 const { validarRolAdmin } = require('../middleware/validar-rol-admin');


const router = Router()


// crear
router.post('/',[validarJWT], createTipoEquipo)


// consultar todos
router.get('/',[validarJWT], getTipoEquipos)


module.exports = router;
