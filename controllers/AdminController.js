
const Op = require('sequelize').Op;
const bcrypt = require('bcryptjs');
const BD = require('../database/database')


//console.log(req.Adm) dados do wey q logou
class AdminController{
      async Dashboard(req, res,){
        const idAdmin = req.session.admin.id
   const admin_geral = await BD("admin")
   .where("id_admin", idAdmin)
   .first();
    res.render("admin/index",{admin_geral})
try {
    
} catch (error) {
    
}
     }
}
module.exports = new AdminController();