const express = require(`express`);
const router = express.Router();
//Controllers
const UserController =require ('../controllers/Usernormal')

//Home Page Digital
router.get('/' ,UserController.index); 
module.exports = router;