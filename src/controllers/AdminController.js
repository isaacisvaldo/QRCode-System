
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
     async new_tb_category_area(req,res){
          try {
             const {nome_categoria,preco_hora}= req.body;
       
             const verify = await BD("categoria_area")
             .where("nome_categoria", 'like', `%${nome_categoria}%`)
             .first();
             if(!verify){
                const category = await BD("categoria_area").insert({ nome_categoria,estado_categoria:1,preco_hora })
                req.flash('certo', "Categoria Cadastrado!");
                res.redirect('/Listar_Categoria')  
             }else{
                req.flash('errado', "Esta categoria Ja esta cadastrado!");
                res.redirect('/Listar_Categoria') 
             }
          } catch (error) {
             
          }
       
         }
}
module.exports = new AdminController();