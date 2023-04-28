
//Dependencias
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const BD = require('../config/database')
//Sercret JWT
const JWTSecret = "djkshahjksdajksdhasISAACISVALDOPIMENTELBUNGA123jkdhasjkdhasjkdhasjkdkkkkklllllbbbnn";
class Conta{ 

 async Autenticar(req,res){
        try {
            var {email, senha} = req.body;
            console.log(email,senha)
            if(email.length !=0 || !( /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))){
              const cliente=await BD('clientes').where('username', email).orWhere('email',email).first()
                const admin=await BD('admin').where('username', email).orWhere('email',email).first()
                           
                if(cliente != undefined){
                    var correct = bcrypt.compareSync(senha, cliente.senha);
                    if(correct){
    
                      jwt.sign({idCliente: cliente.idCliente, email: cliente.email,acesso:0},JWTSecret,{expiresIn:'48h'}, async (err, token) => {
                            if(err){
                                res.status(400);
                                req.flash('errado', "Erro ao Gerar Token") 
                                res.redirect('/login')
                            }else{
                              req.session.cliente = {
                                    token:token,
                                    idCliente: cliente.idCliente,
                                    
                                 }
                                res.redirect('/cliente')
                             const actividade = await BD('actividades').insert({detalhes:'Iniciou Sessao No Sistema!',estado_atividade:0,cliente_id:cliente.idCliente})
                               
                            }
                        })
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/login')
                    }
                }else if(admin != undefined){
                    var correct = bcrypt.compareSync(senha, admin.senha);
                    if(correct){
                        jwt.sign({idAdmin: admin.idAdmin, email: admin.email,acesso:1},JWTSecret,{expiresIn:'48h'},(err, token) => {
                            if(err){
                                res.status(400);
                                res.json({err:"Falha interna"});
                            }else{
                                req.session.admin = {
                                    token:token,
                                    idAdmin:admin.idAdmin
                                    
                                 }
                                
                                res.redirect('/Dashboard')
                                
                            }
                        })
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/login')
                    }
                }else {
                    req.flash('errado', "e-mail desconhecido") 
                        res.redirect('/login')
                }
        
            }else{
                req.flash('errado', "E-mail Incorreto") 
                res.redirect('/login')
            }

        } catch (error) {
               req.flash('errado', "Ocorreu um problema") 
                res.redirect('/login')
            console.log(error)
        }
    }
    async logout(req,res){
        req.session.admin = undefined;
        req.session.cliente = undefined;
       res.redirect("/");
    
    }

}
module.exports = new Conta();