const express = require(`express`);
const router = express.Router();
const user = require ('../middlewares/user')
const admin = require ('../middlewares/admin')
//Controllers
const UserController =require ('../controllers/Usernormal')
const AdminController =require ('../controllers/AdminController')

//Home Page User Normal
router.get('/' ,UserController.index); 
router.get('/form_login' ,UserController.form_login); 
router.post('/login' ,UserController.login); 
router.get('/registro' ,UserController.registro); 
router.post('/registrando' ,UserController.registrando); 
router.get('/painel_user',user,UserController.painel_user); 
router.get('/perfil_user',user ,UserController.perfil_user); 
router.get('/logout',UserController.logout); 
router.get('/form_reserva' ,UserController.form_reserva); 
router.get('/salvar_reserva' ,UserController.salvar_reserva); 


//
router.get('/Dashboard',admin,AdminController.Dashboard)

module.exports = router;