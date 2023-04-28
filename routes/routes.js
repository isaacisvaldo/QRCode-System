const express = require(`express`);
const router = express.Router();
//Controllers
const UserController =require ('../controllers/Usernormal')

//Home Page Digital
router.get('/' ,UserController.index); 
router.get('/Dashbord_user' ,UserController.Dashbord_user); 
module.exports = router;