
const bcrypt = require('bcryptjs');
const axios = require("axios");
const BD = require('../database/database')
const Qr = require ('qrcode')


class UserController {
async index(req, res) {
  const user = !req.session.user ? undefined :req.session.user.id 
  const admin= !req.session.admin ? undefined :req.session.admin.id
  console.log(admin)
      res.render('user/index',{certo:req.flash('certo'),errado:req.flash('errado'),user,admin})
    } catch(error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
      async painel_user(req, res) {
      const user = !req.session.user ? undefined :req.session.user.id 
      const admin= !req.session.admin ? undefined :req.session.admin.id
      if(req.session.admin) {
      res.redirect('/Dashboard')
      }else{
        const usuario = await BD("users")
        .where("id_user", req.session.user.id)
        .first();
        const reserva = await BD("minha_reserva")
        .where("user_id",req.session.user.id)
        .select('*');
        const url = `${usuario}`;
        Qr.toDataURL(url, (erro, src) => {
           if (erro) {
              res.render("error/404")
           } else {
            //Ao renderizar devo fazer duas pesquisas nas reservas as que estão ativas e as que não estão ativas 
              res.render('user/painel_user',{certo:req.flash('certo'),errado:req.flash('errado'),user,usuario,admin,src,reserva})
     
           }
          })

     }
       
  
      } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
      async perfil_user(req, res) {
        const user = !req.session.user ? undefined :req.session.user.id 
        const admin= !req.session.admin ? undefined :req.session.admin.id
        res.render('user/perfil_user',{certo:req.flash('certo'),errado:req.flash('errado'),user,admin})
      } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
      async form_reserva(req, res) {
        const user = !req.session.user ? undefined :req.session.user.id 
        const admin= !req.session.admin ? undefined :req.session.admin.id
        res.render('user/form_reserva',{certo:req.flash('certo'),errado:req.flash('errado'),user,admin})
      } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
      async salvar_reserva(req, res) {
        const {matricula_viatura,	estado_reserva,	user_id,	id_area	,	hora_entrada	,hora_saida	 }=req.body
        const users = await BD('minha_reserva').insert({ matricula_viatura,	estado_reserva,	user_id,	id_area	,	hora_entrada	,hora_saida	})
        req.flash('certo', " Conta criada com sucesso");
        res.redirect('/form_login') } catch(error) {
          res.json({ erro: "Ocorreu um problema" });
          console.log(error)
      }
//User Nao Logado ...
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
      async registrando (req , res){
      try {
        const {username_user,nome_user,email_user,telefone_user,senha,nif_user,senha2}= req.body
        const image_user = (req.file) ? req.file.filename :'user.png';
        console.log(username_user,nome_user,email_user,telefone_user,senha,nif_user,senha2)

        var salt = bcrypt.genSaltSync(10);
        const senha_user = bcrypt.hashSync(senha, salt);
        const users = await BD('users').insert({ image_user,username_user,nome_user,email_user,telefone_user,senha_user,nif_user})
        req.flash('certo', " Conta criada com sucesso");
        res.redirect('/form_login')
         
      } catch (error) {
        req.flash('errado', " Erro Interno");
        res.redirect('/form_login')  
      }       
  }
  async login(req, res) {
    try {
      const { email, senha } = req.body;
    if (email.length != 0 || !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
      const user = await BD("users")
        .where("username_user", email)
        .orWhere("email_user", email)
       
        .first();
        const admin = await BD("admin")
        .where("username_admin", email)
        .orWhere("email_admin", email)
      
        .first();
      
        
      
      if (user) {
        console.log(user,senha);
        var correto = bcrypt.compareSync(senha, user.senha_user);
        console.log(correto)
        if (correto){
          console.log("entrou");
          req.session.user = {
            id:user.id_user,
            perfil:user.nome_perfil,
            estado_perfil:user.estado_perfil 
          }  
           res.redirect("/"); 
            }else{
              req.flash("errado", "Credencias Inválidas !");
              res.redirect("/form_login");
            }   
      }else if(admin){
        console.log(admin,senha);
        var correto = bcrypt.compareSync(senha, admin.senha_admin);
        console.log(correto)
        if (correto){
          console.log("entrou");
          req.session.admin = {
            id:admin.id_admin
          
          }  
           res.redirect("/"); 
            }else{
              req.flash("errado", "Credencias Inválidas !");
              res.redirect("/form_login");
            }  
      }else{
        req.flash("errado", "E-mail Desconhecido !");
        res.redirect("/form_login");
      }
    } else {
      req.flash("errado", "E-mail Incorreto !");
      res.redirect("/form_login");
    }
    } catch (error) {
      console.log(error)
    }
  }
  
  async logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }

}
module.exports = new UserController();