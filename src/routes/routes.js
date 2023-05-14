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
router.get('/categorias' ,UserController.categorias); 
router.get('/registro' ,UserController.registro); 
router.post('/registrando' ,UserController.registrando); 
router.get('/painel_user',user,UserController.painel_user); 
router.get('/perfil_user',user ,UserController.perfil_user); 
router.get('/logout',UserController.logout); 
router.get('/form_reserva',user ,UserController.form_reserva); 


router.get('/Leitura_CoQr/:id_reserva' ,UserController.Leitura); 

router.post('/salvar_reserva',user ,UserController.salvar_reserva); 


//Admin Controller
router.get('/Dashboard',admin,AdminController.Dashboard)
router.get('/Listar_usuarios',admin,AdminController.Listar_usuarios)
router.get('/Listar_Categoria',admin,AdminController.Listar_Categoria)
router.get('/Listar_Areas',admin,AdminController.Listar_Areas)

module.exports = router;