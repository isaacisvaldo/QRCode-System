const express = require(`express`);
const router = express.Router();
//Controllers
const UserController =require ('../controllers/Usernormal')

//Home Page User Normal
router.get('/' ,UserController.index); 

module.exports = router;