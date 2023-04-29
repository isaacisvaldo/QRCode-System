
const bcrypt = require('bcryptjs');
const axios = require("axios");


class ClienteController {


async index(req, res) {


      res.render('user/index',{certo:req.flash('certo'),errado:req.flash('errado')})
    } catch(error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
//User Logado
    async Dashbord_user(req, res) {


        res.render('User/index',{certo:req.flash('certo'),errado:req.flash('errado')})
      } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }

}
module.exports = new ClienteController();