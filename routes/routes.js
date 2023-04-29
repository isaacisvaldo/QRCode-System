const express = require(`express`);
const router = express.Router();
//Controllers
const UserController =require ('../controllers/Usernormal')

//Home Page User Normal
router.get('/' ,UserController.index); 
router.get('/form_login' ,UserController.form_login); 
router.get('/registro' ,UserController.registro); 

module.exports = router;