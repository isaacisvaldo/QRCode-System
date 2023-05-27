
const Op = require('sequelize').Op;
const bcrypt = require('bcryptjs');
const BD = require('../database/database')


//console.log(req.Adm) dados do wey q logou
class AdminController {
     async Dashboard(req, res,) {
          const idAdmin = req.session.admin.id
          const admin_geral = await BD("admin")
               .where("id_admin", idAdmin)
               .first();
          res.render("admin/index", { admin_geral })
          try {

          } catch (error) {
               console.log(error)
          }
     }
     async Listar_usuarios(req, res,) {
          const idAdmin = req.session.admin.id
          const admin_geral = await BD("admin")
               .where("id_admin", idAdmin)
               .first();
          const usuarios = await BD("users")
               .select('*');
          res.render("admin/listarUsuarios", { admin_geral, usuarios })
          try {

          } catch (error) {
               console.log(error)
          }
     }
     async Listar_Categoria(req, res,) {
          const idAdmin = req.session.admin.id
          const admin_geral = await BD("admin")
               .where("id_admin", idAdmin)
               .first();
          const categoria = await BD("categoria_area")
               .select('*');
          res.render("admin/listarCategoria", {admin_geral, categoria })
          try {

          } catch (error) {
               console.log(error)
          }
     }
     async Nova_Categoria(req, res,) {
         const {nome_categoria,preco_hora}= req.body

         const categoria = await BD("categoria_area").insert({nome_categoria,estado_categoria:1,preco_hora});
         res.redirect("/Listar_Categoria")

          try {

          } catch (error) {
               console.log(error)
          }
     }
     async Listar_Areas(req, res,) {
          const idAdmin = req.session.admin.id
          const admin_geral = await BD("admin")
               .where("id_admin", idAdmin)
               .first();
          const usuarios = await BD("users")
               .select('*');
          res.render("admin/listarAreas", { admin_geral, usuarios })
          try {

          } catch (error) {
               console.log(error)
          }
     }
}
module.exports = new AdminController();