const bcrypt = require("bcryptjs");
const axios = require("axios");
const BD = require("../database/database");
const Qr = require("qrcode");

class UserController {
  async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {}
  }
  async Leitura(req, res) {
    try {
      const {id_reserva} = req.params;
    } catch (error) {
      console.error(error);
    }
  }
  async index(req, res) {
  try {
     
    const user = !req.session.user ? undefined : req.session.user.id
    const admin = !req.session.admin ? undefined : req.session.admin.id
    console.log(admin)
    res.render('user/index', { certo: req.flash('certo'), errado: req.flash('errado'), user, admin })
  } catch (error) {
    
  }
}
async categorias(req, res) {
  try {
     
    const user = !req.session.user ? undefined : req.session.user.id
    const admin = !req.session.admin ? undefined : req.session.admin.id
    console.log(admin)
    res.render('user/categorias', { certo: req.flash('certo'), errado: req.flash('errado'), user, admin })
  } catch (error) {
    console.log(error)
  }
}
async painel_user(req, res) {
  try {
    
  const user = !req.session.user ? undefined : req.session.user.id
  const admin = !req.session.admin ? undefined : req.session.admin.id
  if (req.session.admin) {
    res.redirect('/Dashboard')
  } else if(req.session.user){
    console.log(req.session.user)
    const usuario = await BD("users")
      .where("id_user", req.session.user.id)
      .first();
      const reserva = await BD('minha_reserva')
        .where("user_id", req.session.user.id)
        .andWhere('estado_reserva','<' ,2)
        .join('area', 'area.id_area', '=','minha_reserva.id_area' )
        .join('categoria_area', 'categoria_area.idcategoria_area', '=','area.categoria_area' )
        .select('*');
        console.log(reserva)
        const id = await BD('minha_reserva')
        .where("user_id", req.session.user.id)
        .andWhere('estado_reserva','<' ,2)
        .first();
        if(id){
          const url = `/Leitura_CoQr/${id.id_minha_reserva}`;
      Qr.toDataURL(url, async(erro, src) => {
      if (erro) {
        res.render("error/404")
      } else {
        //Ao renderizar devo fazer duas pesquisas nas reservas as que estão ativas e as que não estão ativas 
        res.render('user/painel_user', {
          errado: req.flash("errado"),
          info: req.flash("info"),
          certo: req.flash("certo"),
          user, usuario, admin, src, reserva
        })


   }
  
  }) 
        }else{
          res.render('user/painel_user', {
            errado: req.flash("errado"),
            info: req.flash("info"),
            certo: req.flash("certo"),
            user, usuario, admin, reserva,src:undefined
          })
        }
      
}
 
  } catch (error) {
    console.log(error)
    
  }
}
async perfil_user(req, res) {
 try{ 
  const user = !req.session.user ? undefined :req.session.user.id 
  const admin= !req.session.admin ? undefined :req.session.admin.id
  res.render('user/perfil_user',{certo:req.flash('certo'),errado:req.flash('errado'),user,admin})
} catch(error) {
   
    console.log(error)
}

















}
async form_reserva(req, res) {
  try {
  const user = !req.session.user ? undefined :req.session.user.id 
  const admin= !req.session.admin ? undefined :req.session.admin.id
  res.render('user/form_reserva',{certo:req.flash('certo'),errado:req.flash('errado'),user,admin})
} catch(error) {
    res.json({ erro: "Ocorreu um problema" });
    console.log(error)
}
}
async salvar_reserva(req, res) {
  try {
  const {matricula_viatura,	estado_reserva,	user_id,	id_area	,	hora_entrada	,hora_saida	 }=req.body
  const users = await BD('minha_reserva').insert({ matricula_viatura,	estado_reserva,	user_id,	id_area	,	hora_entrada	,hora_saida	})
  req.flash('certo', " Conta criada com sucesso");
  res.redirect('/form_login')
 } catch(error) {
    res.json({ erro: "Ocorreu um problema" });
    console.log(error)
}
}
async form_login(req, res) {
  try {
  res.render('user/form/login',{ 
   errado: req.flash("errado"),
  info: req.flash("info"),
  certo: req.flash("certo"),})
} catch(error){
    res.json({ erro: "Ocorreu um problema" });
    console.log(error)
}
}
async registro(req, res) {
  try{ 
   res.render('user/form/registro',{ 
     errado: req.flash("errado"),
    info: req.flash("info"),
    certo: req.flash("certo"),})
 } catch(error) {
 res.json({ erro: "Ocorreu um problema" });
 console.log(error)
 }

}
async perfil_user(req, res) {
  try{ 
  const user = !req.session.user ? undefined : req.session.user.id
  const admin = !req.session.admin ? undefined : req.session.admin.id
  const usuario = await BD("users")
  .where("id_user", req.session.user.id)
  .first();
  res.render('user/perfil_user', { certo: req.flash('certo'), errado: req.flash('errado'), user, admin, usuario })
  
  
  } catch(error) {
  res.json({ erro: "Ocorreu um problema" });
  console.log(error)
  }
 }
 async form_reserva(req, res) {

  try
  { 
  const user = !req.session.user ? undefined : req.session.user.id;
  const admin = !req.session.admin ? undefined : req.session.admin.id;
  const usuario = await BD("users")
    .where("id_user", req.session.user.id)
    .first();
  const area_categoria = await BD("area")
    .select('*')
    .join('categoria_area', 'categoria_area.idcategoria_area', '=', 'area.categoria_area');
  res.render('user/form/form_reserva', { certo: req.flash('certo'), errado: req.flash('errado'), user, area_categoria, admin, usuario })
  
  } catch(error) {
  res.json({ erro: "Ocorreu um problema" });
  console.log(error)
  }
  }
  async salvar_reserva(req, res) {
    try {
    const { matricula_viatura, user_id, id_area } = req.body
    const hora_entrada = '00:00:00';
    const hora_saida = '00:00:00';
    const reserva = await BD('minha_reserva')
    .where("user_id", req.session.user.id)
    .andWhere('estado_reserva','<' ,2)
    .select('*');
    if(reserva.length !=0){
    req.flash('errado', " Ja tens uma Reserva !");
    res.redirect('/painel_user')
    }else{
    const users = await BD('minha_reserva').insert({ matricula_viatura, estado_reserva: 0, user_id, id_area, hora_entrada, hora_saida })
    req.flash('certo', " Area Reservado com sucesso");
    res.redirect('/painel_user')
    }
    
    } catch(error) {
    res.json({ erro: "Ocorreu um problema" });
    console.log(error)
    }
  }
  async registrando(req, res) {
    try {
    const { username_user, nome_user, email_user, telefone_user, senha, nif_user, senha2 } = req.body
    const image_user = (req.file) ? req.file.filename : 'user.png';
    if (nome_user.length < 5) {
      req.flash('errado', "Nome demasiado Curto");
      res.redirect('/form_login')
    
    
    } else if ((/[A-Z]/.test(username_user))) {
      console.log((/[A-Z]/.test(username_user)))
    
      req.flash('errado', " user nao pode ter letra Maiscula");
      res.redirect('/form_login')
    } else if ((/\s/g.test(username_user))) {
    
    
      req.flash('errado', "User nao pode ter espaço");
      res.redirect('/form_login')
    } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email_user))) {
    
    
      req.flash('errado', "E-mail invalido");
      res.redirect('/form_login')
    } else if (senha.length < 8) {
    
      req.flash('errado', "Senha muito fraca");
      res.redirect('/form_login')
    } else if (senha != senha2) {
    
    
      req.flash('errado', "Senhas Diferentes");
      res.redirect('/form_login')
    } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone_user))) {
    
    
      req.flash('errado', "Numero de Telefone incorreto");
      res.redirect('/form_login')
    
    } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif_user))) {
    
    
      req.flash('errado', "NIF incorreto");
      res.redirect('/form_login')
    } else {
      var salt = bcrypt.genSaltSync(10);
      const senha_user = bcrypt.hashSync(senha, salt);
      const users = await BD('users').insert({ image_user, username_user, nome_user, email_user, telefone_user, senha_user, nif_user })
      req.flash('certo', " Conta criada com sucesso");
      res.redirect('/form_login')
    
    }
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
        console.log(user, senha);
        var correto = bcrypt.compareSync(senha, user.senha_user);
        console.log(correto)
        if (correto) {
          console.log("entrou");
          req.session.user = {
            id: user.id_user,
            perfil: user.nome_perfil,
            estado_perfil: user.estado_perfil
          }
          res.redirect("/");
        } else {
          req.flash("errado", "Credencias Inválidas !");
          res.redirect("/form_login");
        }
      } else if (admin) {
        console.log(admin, senha);
        var correto = bcrypt.compareSync(senha, admin.senha_admin);
        console.log(correto)
        if (correto) {
          console.log("entrou");
          req.session.admin = {
            id: admin.id_admin
    
          }
          res.redirect("/");
        } else {
          req.flash("errado", "Credencias Inválidas !");
          res.redirect("/form_login");
        }
      } else {
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

}
module.exports = new UserController();
