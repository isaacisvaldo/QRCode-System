
const bcrypt = require('bcryptjs');
const axios = require("axios");


class ClienteController {


async index(req, res) {


      res.render('user/index',{certo:req.flash('certo'),errado:req.flash('errado')})
    } catch(error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
    async painel_user(req, res) {
        res.render('user/painel_user',{certo:req.flash('certo'),errado:req.flash('errado')})
      } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
      async perfil_user(req, res) {
        res.render('user/perfil_user',{certo:req.flash('certo'),errado:req.flash('errado')})
      } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
//User Logado
    async form_login(req, res) {
        res.render('user/form/login',{ 
         errado: req.flash("errado"),
        info: req.flash("info"),
        certo: req.flash("certo"),})
      } catch(error){
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
      async registro(req, res) {
        res.render('user/form/registro',{ 
         errado: req.flash("errado"),
        info: req.flash("info"),
        certo: req.flash("certo"),})
      } catch(error){
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }

}
module.exports = new ClienteController();