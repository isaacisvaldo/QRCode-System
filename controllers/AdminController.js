
const Op = require('sequelize').Op;
const bcrypt = require('bcryptjs');
const BD = require('../config/database')


//console.log(req.Adm) dados do wey q logou
class AdminController{
//DIGITAL SEGUROS GERAL
 async Dashboard(req,res){
        try {
            const idAdmin=req.session.admin.idAdmin
            const ins = await BD('inscritos').select('*').catch(err => { console.log(err) });
            const feedbak = await BD('feedbaks').join('clientes', 'feedbaks.cliente_id	','=','clientes.idCliente').orderBy('idFeedbak','desc')
            const cliente = await BD('clientes').select('*').catch(err => { console.log(err) });
            const solicitacao = await BD('solicitacao').select('*').catch(err => { console.log(err) });
            const parceiros = await BD('parceiros').select('*').catch(err => { console.log(err) });
            const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
            const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
            console.log(actividades)

            res.render('Admin/Dashboard/index',{cliente,admin,solicitacao,actividades,feedbak,parceiros,ins})
        
 
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
 }   
 async dashboardAnalise(req,res){
    try {
        
        const idAdmin=req.session.admin.idAdmin
        const cliente = await BD('clientes').select('*').catch(err => { console.log(err) });
         const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        const visitantes = await BD('visitantes').select('*').catch(err => { console.log(err) });
        const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
           
     res.render('Admin/Dashboard/dashAnalise',{cliente,admin,actividades,solicitacao,visitantes})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}  
async meuPerfil(req,res){
    try {
        
        const token = req.session.admin.token
        const idAdmin=req.session.admin.idAdmin
         const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
          
        
     res.render('Admin/Dashboard/meuPerfil',{token,actividades,certo:req.flash('certo'),errado:req.flash('errado'),admin,solicitacao})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}   
//User
async listaUsuario(req,res){
    try {
        const idAdmin=req.session.admin.idAdmin
        const cliente = await BD('clientes').select('*').catch(err => { console.log(err) });
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        
                          const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/Dashboard/listaUsuario',{cliente,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}  
async perfilCliente(req,res){
    try {
        const idAdmin=req.session.admin.idAdmin
        const{cliente_id}= req.params
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                
        const cliente = await BD('clientes').where('idCliente',cliente_id).first().catch(err => { console.log(err) });
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/Dashboard/PerfilCliente',{cliente,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}  
async DeletarCliente(req,res){
    try {
      const {idCliente}=req.params;
      if (!isNaN(idCliente)) {
    const cliente = await BD('clientes').where('idCliente',idCliente).delete()
    if(cliente){
        req.flash('certo', "Cliente eliminado com sucesso!");
        res.redirect('/listaUsuario')
      
     }else{
        req.flash('errado', "Utilizador não Eliminado!");
        res.redirect('/listaUsuario')
     }     
  } else {
    req.flash('errado', "Ocorreu um problema!");
    res.redirect('/listaUsuario')
  }
   
    

    } catch (error) {
        res.json({errado: "Ocorreu um problema"})
        console.log(error)
    }
}
//ADMIN
async NovoAdmin(req, res) {
    try {
         
        console.log(req.User)//pega os dados dele
         const { nome, email, telefone, username, senha, senha2, nif } = req.body;
        if(nome.length < 5){
         req.flash('errado', "Nome demasiado Curto");
         res.redirect('/ListarAdmins')
         
 
        }else if ((/[A-Z]/.test(username))) {
         console.log((/[A-Z]/.test(username)))
           
             req.flash('errado', " user nao pode ter letra Maiscula");
             res.redirect('/ListarAdmins')
         } else if (( /\s/g.test(username))) {
             
             
             req.flash('errado', "User nao pode ter espaço");
             res.redirect('/ListarAdmins')
         } else  if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                 
                 
                 req.flash('errado', "E-mail invalido");
                 res.redirect('/ListarAdmins')
             } else if (senha.length < 8) {
                     
                 req.flash('errado', "Senha muito fraca");
                 res.redirect('/ListarAdmins')
                 } else  if (senha != senha2) {
                       
                        
                         req.flash('errado', "Senhas Diferentes");
                 res.redirect('/ListarAdmins')
                     } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {
                    
                        
                         req.flash('errado', "Numero de Telefone incorreto");
                         res.redirect('/ListarAdmins')
 
                     } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                         
                         
                         req.flash('errado', "NIF incorreto");
                         res.redirect('/ListarAdmins')
                     } else {
                         const cliente=await BD('admin').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                         const admin=await BD('clientes').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                         const cordenador=await BD('coordenador').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                         if(cliente.length < 1){
                         if(admin.length < 1){
                             if(cordenador.length < 1){
                                 const image= (req.file) ? req.file.filename: 'user.png';
                                 console.log("Posso cadastrar co  exito !")         
                                 var salt = bcrypt.genSaltSync(10);
                                 var hash = bcrypt.hashSync(senha, salt);
                                 const admin = await BD('admin').insert({image,nome, email, telefone, username, senha:hash, nif,role:0})
                                 req.flash('certo', " Conta criada com sucesso");
                                 res.redirect('/ListarAdmins')
                               
                                  
                             }else{
                        console.log(cordenador)
                                 req.flash('errado', "Usuario ja encontrado 1");
                                 res.redirect('/ListarAdmins')
                                 }
                  
                         }else{
                             console.log(admin)
                             req.flash('errado', "Usuario ja encontrado 2");
                             res.redirect('/ListarAdmins')
                         }
 
                      }else{
                         console.log(cliente)
                         req.flash('errado', "Usuario ja encontrado 3");
                         res.redirect('/ListarAdmins')
                      }
                     }
         
 
     } catch (error) {
         res.json({erro: "Houve um problema"})
         console.log(error)
     }
}
async ListarAdmins(req,res){
       try {
       
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
        const admins=await BD('admin').select('*').catch(err => { console.log(err) })
                const idAdmin=req.session.admin.idAdmin
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/Dashboard/listaAdmin',{solicitacao,actividades,admin,admins,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

       

       } catch (error) {
           res.send("Ocorreu um problema")
           console.log(error)
       }
}
async perfilAdmin(req,res){
    try {
        const idAdmin=req.session.admin.idAdmin
        const{admin_id}= req.params
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
        const admin_1=await BD('admin').where('idAdmin',admin_id).first().catch(err => { console.log(err) })
         const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/Dashboard/meuPerfil',{admin_1,solicitacao,actividades,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}  
async DeletarAdmin(req,res){
    try {
      const {idAdmin}=req.params;
      if (!isNaN(idAdmin)) {
    const admin = await BD('admin').where('idAdmin',idAdmin).delete()
    if(admin){
        req.flash('certo', "Admin eliminado com sucesso!");
        res.redirect('/ListarAdmins')
      
     }else{
        req.flash('errado', "Admin não Eliminado!");
        res.redirect('/ListarAdmins')
     }     
  } else {
   
    req.flash('errado', "Ocorreu um problema ao deletar!");
        res.redirect('/ListarAdmins')
  }
   
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
//ACESSO
async ListarAcesso(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     res.render('Admin/Dashboard/listaAcesso',{actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async Actividade(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
     const {cliente_id}= req.params;
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
     const actividade = await BD('actividades').where('cliente_id',cliente_id).select('*');
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
      console.log(actividade)
      const cliente = await BD('clientes').where('idCliente',cliente_id).first().catch(err => { console.log(err) });
        
     res.render('Admin/Dashboard/actividade',{actividades,cliente,solicitacao,actividade,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async  DeletarActividade(req,res){
    try {
      const {idActividade}=req.params;
      if (!isNaN(idActividade)) {
    const actividade =  await BD('actividades').where('idActividade',idActividade).delete()
    if(actividade){
        req.flash('certo', "Actividade eliminado com sucesso!");
        res.redirect('/ListarAcesso')
      
     }else{
        req.flash('errado', "actividade não Eliminado!");
        res.redirect('/ListarAcesso')
     }     
  } else {
   
    req.flash('errado', "Ocorreu um problema ao deletar!");
        res.redirect('/ListarAcesso')
  }
   
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}

//Cordenador
async NovoCordenador(req, res) {
    try {
         
       console.log(req.User)//pega os dados dele
        const { nome, email, telefone, username, senha, senha2, nif ,provincia,municipio} = req.body;
       if(nome.length < 5){
        req.flash('errado', "Nome demasiado Curto");
        res.redirect('/ListarCoordenador')
        

       }else if ((/[A-Z]/.test(username))) {
        console.log((/[A-Z]/.test(username)))
          
            req.flash('errado', " user nao pode ter letra Maiscula");
            res.redirect('/ListarCoordenador')
        } else if (( /\s/g.test(username))) {
            
            
            req.flash('errado', "User nao pode ter espaço");
            res.redirect('/ListarCoordenador')
        } else  if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                
                
                req.flash('errado', "E-mail invalido");
                res.redirect('/ListarCoordenador')
            } else if (senha.length < 8) {
                    
                req.flash('errado', "Senha muito fraca");
                res.redirect('/ListarCoordenador')
                } else  if (senha != senha2) {
                      
                       
                        req.flash('errado', "Senhas Diferentes");
                res.redirect('/ListarCoordenador')
                    } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {
                   
                       
                        req.flash('errado', "Numero de Telefone incorreto");
                        res.redirect('/ListarCoordenador')

                    } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                        
                        
                        req.flash('errado', "NIF incorreto");
                        res.redirect('/ListarCoordenador')
                    } else {
                        const cliente=await BD('admin').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                        const admin=await BD('clientes').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                        const cordenador=await BD('coordenador').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                        if(cliente.length < 1){
                        if(admin.length < 1){
                            if(cordenador.length < 1){
                                const image= (req.file) ? req.file.filename: 'user.png';
                                console.log("Posso cadastrar co  exito !")         
                                var salt = bcrypt.genSaltSync(10);
                                var hash = bcrypt.hashSync(senha, salt);
                                const cordenador = await BD('coordenador').insert({image,nome, email, telefone, username, senha:hash, nif,estado:0 ,provincia,municipio})
                               
                                req.flash('certo', " Conta criada com sucesso");
                                 res.redirect('/ListarCoordenador')
                            }else{
                       console.log(cordenador)
                                req.flash('errado', "Usuario ja encontrado 1");
                                res.redirect('/ListarCoordenador')
                                }
                 
                        }else{
                            console.log(admin)
                            req.flash('errado', "Usuario ja encontrado 2");
                            res.redirect('/ListarCoordenador')
                        }

                     }else{
                        console.log(cliente)
                        req.flash('errado', "Usuario ja encontrado 3");
                        res.redirect('/ListarCoordenador')
                     }
                    }
        

    } catch (error) {
        res.json({erro: "Houve um problema"})
        console.log(error)
    }
}
async ListarCoordenador(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
    
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const coordenadores =  await BD('coordenador').select('*').catch(err => { console.log(err) })
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
     res.render('Admin/Dashboard/listaCoordenador',{solicitacao,actividades,coordenadores,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async perfilCordenador(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
     const{cordenador_id}= req.params
    
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const cordenador = await BD('cordenador').where('idCoordenador',cordenador_id).first().catch(err => { console.log(err) });
                   const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
res.render('Admin/Dashboard/perfilCordenador',{solicitacao,actividades,cordenador,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async DeletarCordenador(req,res){
    try {
        const{cordenador_id}= req.params
    
      if (!isNaN(cordenador_id)) {
    const cordenador = await BD('coordenador').where('idCoordenador',cordenador_id).delete()
    if(cordenador){
        req.flash('certo', "Cordenador eliminado com sucesso!");
        res.redirect('/ListarCoordenador')
      
     }else{
        req.flash('errado', "Cordenador não Eliminado!");
        res.redirect('/ListarCoordenador')
     }     
  } else {
   
      req.flash('errado', "Ocorreu um problema Interno");
        res.redirect('/ListarCoordenador')
  }
   
    

    } catch (error) {
        req.flash('errado', "Ocorreu um problema Interno");
        res.redirect('/ListarCoordenador')
        console.log(error)
    }
}
//Retorno De Chamadas retornoChamada1
async ListarRetornoChamada(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
    
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const coordenadores =  await BD('coordenador').select('*').catch(err => { console.log(err) })
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
     res.render('Admin/Dashboard/listaRetorno',{solicitacao,actividades,coordenadores,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async RetornoChamada1(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
    const{solicitacao_id}=req.params
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const coordenadores =  await BD('coordenador').select('*').catch(err => { console.log(err) })
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
     const contacto = await BD('solicitacao').where('idSolicitacao',solicitacao_id).first().catch(err => { console.log(err) });
      
     res.render('Admin/Dashboard/retornoChamada1',{solicitacao,contacto,actividades,coordenadores,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
//Feedbaks
async feedbaks(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
  
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const coordenadores =  await BD('coordenador').select('*').catch(err => { console.log(err) })
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
     const feedbak = await BD('feedbaks').join('clientes', 'feedbaks.cliente_id	','=','clientes.idCliente')
            
     res.render('Admin/Dashboard/listaFeedbak',{solicitacao,feedbak,actividades,coordenadores,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async DeletarFeedbak(req,res){
    try {
      const {idFeedbak}=req.params;
      if (!isNaN(idFeedbak)) {
    const feedbaks = await BD('feedbaks').where('idFeedbak',idFeedbak).delete()
    if(feedbaks){
        req.flash('certo', "feedbak eliminado com sucesso!");
        res.redirect('/feedbaks')
      
     }else{
        req.flash('errado', "feedbak não Eliminado!");
        res.redirect('/feedbaks')
     }     
  } else {
   
    req.flash('errado', "Ocorreu um problema ao deletar!");
        res.redirect('/feedbaks')
  }
   
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async AprovarFeedbak(req,res){
    try {
      const {idFeedbak}=req.params;
      if (!isNaN(idFeedbak)) {
    const feedbaks = await BD('feedbaks').where('idFeedbak',idFeedbak).update({estadoFeedBak:1})
    if(feedbaks){
        req.flash('certo', "feedbak Aprovado com sucesso!");
        res.redirect('/feedbaks')
      
     }else{
        req.flash('errado', "Ocorreu um problema!");
        res.redirect('/feedbaks')
     }     
  } else {
   
    req.flash('errado', "Ocorreu um problema ao deletar!");
        res.redirect('/feedbaks')
  }
   
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async ReprovarFeedbak(req,res){
    try {
      const {idFeedbak}=req.params;
      if (!isNaN(idFeedbak)) {
    const feedbaks = await BD('feedbaks').where('idFeedbak',idFeedbak).update({estadoFeedBak:0})
    if(feedbaks){
        req.flash('certo', "feedbak Reprovado!");
        res.redirect('/feedbaks')
      
     }else{
        req.flash('errado', "Ouve um problema!");
        res.redirect('/feedbaks')
     }     
  } else {
   
    req.flash('errado', "Ocorreu um problema ao deletar!");
        res.redirect('/feedbaks')
  }
   
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}

//Fim Listar

async AlterarFoto(req, res) {
    try {
     
        const idAdmin=req.session.admin.idAdmin
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
    
        
        if(req.file){
        const image= (req.file) ? req.file.filename: admin.image;
        const update=await BD('admin').where('idAdmin',idAdmin).update({image})
        if(update){
            req.flash('certo', "Editado com sucesso");
            res.redirect('/meuPerfil')
        }else{
            req.flash('errado', "Ocorreu um Problema");
            res.redirect('/meuPerfil')
        }
        }else{
            req.flash('errado', "Ocorreu um Problema");
            res.redirect('/meuPerfil') 
        }
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}

async alterarSenha(req, res) {
    try {
       
        const {senhaatual,senha,senha2}= req.body;
        const idAdmin=req.session.admin.idAdmin
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
    
        var correct = bcrypt.compareSync(senhaatual, admin.senha);
        if(correct){
         if(senha != senha2){
            req.flash('errado', "Senha Actual incorrecta");
            res.redirect('/meuPerfil') 
         }else{
            if(senha.length<8){
                req.flash('errado', "Senha Muito Fraca!");
                res.redirect('/meuPerfil')  
            }else{
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(senha, salt);
                const update=await BD('admin').where('idAdmin',idAdmin).update({senha:hash})
                if(update){
                    req.flash('certo', "Editado com sucesso");
                    res.redirect('/meuPerfil')
                }else{
                    req.flash('errado', "Ocorreu um Problema");
                    res.redirect('/meuPerfil')
                }
            }
            
         }
        
        }else{
            req.flash('errado', "Senha Actual incorrecta");
            res.redirect('/perfilCliente') 
        }
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async EditarAdmin(req, res) {
    try {
         
    
        const {nome,email,telefone,username,nif} = req.body;
        const idAdmin=req.session.admin.idAdmin
     
      if(nome.length < 5){
        req.flash('errado', "Nome demasiado Curto");
        res.redirect('/meuPerfil')

       }else if ((/[A-Z]/.test(username))) {
        console.log((/[A-Z]/.test(username)))
            req.flash('errado', " user nao pode ter letra Maiscula");
            res.redirect('/meuPerfil')
        } else if (( /\s/g.test(username))) {
            console.log((/\s/g.test(username)))
            req.flash('errado', "User nao pode ter espaço");
            res.redirect('/meuPerfil')
        } else  if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "nao cadastrado");
                res.redirect('/meuPerfil')
            } else if (telefone.length !=9) {
                        req.flash('errado', "Numero de Telefone incorreto");
                        res.redirect('/meuPerfil')

                    } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                        req.flash('errado', "NIF incorreto");
                        res.redirect('/meuPerfil')
                    } else {
                        const update=await BD('admin').where('idAdmin',idAdmin).update({nome, email, telefone, username, nif })
                       if(update)
                       {
                        req.flash('certo', "Editado com sucesso");
                        res.redirect('/meuPerfil')
                       }else{
                        req.flash('errado', "Ocorreu um problema");
                        res.redirect('/meuPerfil')
                       }
                        
                       
                    }
        

    } catch (error) {
        res.json({erro: "Houve um problema"})
        console.log(error)
    }
}



//DIGITAL SEGUROS GERAL
//SEUS PACOTES

//CULTURAL SEGURO
async listaUsuarioC(req,res){
    
    try {
            
        const token = req.session.admin.token
        const idAdmin=req.session.admin.idAdmin
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
        const ins = await BD('inscritos').select('*').catch(err => { console.log(err) });  
        const feedbak = await BD('feedbaks').join('clientes', 'feedbaks.cliente_id	','=','clientes.idCliente').select('*');
        const cliente = await BD('clientes').select('*').catch(err => { console.log(err) });
         const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
       const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        

        res.render('Admin/CulturalSeguro/listaUsuario',{token,actividades,cliente,admin,solicitacao,feedbak,ins})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async painelGeralCUltural(req,res){
    
    try {
            
        const token = req.session.admin.token
        const idAdmin=req.session.admin.idAdmin
        const ins = await BD('inscritos').select('*').catch(err => { console.log(err) }); 
        const feedbak = await BD('feedbaks').join('clientes', 'feedbaks.cliente_id	','=','clientes.idCliente').select('*');
        const cliente = await BD('clientes').select('*').catch(err => { console.log(err) });
         const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const parceiros =await BD('parceiros').select('*').catch(err => { console.log(err) }); 
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
       
         res.render('Admin/CulturalSeguro/painelGeral',{token,cliente,admin,solicitacao,actividades,feedbak,parceiros,ins})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
//FIM CULTURAL SEGURO
//LEASING SEGURO
async painelGeralLeasingSeguro(req,res){
    
    try {
            
        
        const idAdmin=req.session.admin.idAdmin
        const feedbak = await BD('feedbaks').join('clientes', 'feedbaks.cliente_id	','=','clientes.idCliente').select('*');
        const cliente = await BD('clientes').where('acesso_Leasing', '<>',0).select('*').catch(err => { console.log(err) });
        const Investidores = await BD('clientes').where('acesso_Leasing', '=',2).select('*').catch(err => { console.log(err) });
        const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const parceiros =await BD('parceiros').select('*').catch(err => { console.log(err) }); 
        const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
       
         res.render('Admin/LeasingSeguro/painelGeral',{Investidores,cliente,admin,solicitacao,actividades,feedbak,parceiros})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async listaTornarInvestidorLeasing(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
    const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
    const sos = await BD('tornar_investidor').where('estado_',0).join('clientes', 'tornar_investidor.cliente_id	','=','clientes.idCliente').select('*').catch(err => { console.log(err) });
                 
    
     const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const parceiros =await BD('parceiros').select('*').catch(err => { console.log(err) })
     res.render('Admin/LeasingSeguro/listaTornarInvestidorLeasing',{sos,parceiros,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async TornarInvestidorLeasing1(req,res){
    try {
              const idAdmin=req.session.admin.idAdmin
              const {id_pedido}= req.params
               const sos = await BD('tornar_investidor').where('id_pedido',	id_pedido).join('clientes', 'tornar_investidor.cliente_id	','=','clientes.idCliente').join('periodo_investidor', 'periodo_investidor.id_tornar_investidor	','=','tornar_investidor.id_pedido').first()
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                 const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/LeasingSeguro/tornarInvestidorLeasing1',{sos,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    console.log(sos)

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async Upgrate_for_Investidor(req,res){
    try {
              const {idCliente,id_pedido}= req.body
              const cliente = await BD('clientes').where('idCliente', idCliente).update({acesso_Leasing:2});
           
             if(cliente){
               const sos = await BD('tornar_investidor').where('id_pedido',id_pedido).update({estado_:1})
               
                req.flash('certo', "Conta Habilitada com sucesso !");
                res.redirect('/listaTornarInvestidorLeasing')
             }else{
                req.flash('certo', "Conta  Não Foi Habilitada  !");
                res.redirect('/listaTornarInvestidorLeasing')
             }

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async ListarParceiros(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
    
     const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const parceiros =await BD('parceiros').select('*').catch(err => { console.log(err) })
     res.render('Admin/LeasingSeguro/listaParceirosComercial',{parceiros,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async NovoParceiro(req,res){
    try {
    const  {nomeParceiro,emailParceiro,telefoneParceiro,tipoParceria}= req.body
    if(nome.length < 5){
        req.flash('errado', "Nome Demasiado Curto") 
             res.redirect('/');

       }  else  if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailParceiro))) {
                
        req.flash('errado', "E-mail Invalido") 
        res.redirect('/');
            }  else if (!(/^[9]{1}[0-9]{8}$/.test(telefoneParceiro))) {
                   
             
             req.flash('errado', "Numero de Telefone incorreto") 
             res.redirect('/');
             }else{
                if(!(req.file)){
                    req.flash('errado', "Foto Não submetido") 
                    res.redirect('/');
                }
                else{
                    const estadoParceiro = 0;
                    const  imageParceiro=(req.file) ? req.file.filename: 'parceiro.jpg';
                    const par = await BD('parceiros').insert({nomeParceiro,emailParceiro,telefoneParceiro,tipoParceria,imageParceiro,estadoParceiro})
                   
                    if(par){
                    req.flash('certo', "Perceiro  Cadastrado !") 
                    res.redirect('/'); 
                   }else{
                    req.flash('errado', "Perceiro Não Cadastrado") 
                    res.redirect('/'); 
                   }
                    
                }
               
             }

   

    } catch (error) {
        req.flash('errado', "Ocorreu um Problema") 
        res.redirect('/');
        console.log(error)
    }
}
async listaUsuarioLeasing(req,res){
    try {
        const idAdmin=req.session.admin.idAdmin
               const cliente = await BD('clientes').where('acesso_Leasing','<>',0).select('*').catch(err => { console.log(err) });
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                          const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/LeasingSeguro/listaUsuarioLeasing',{cliente,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
} 
//FIM LEASING SEGURO
//SHOPSEGURO
async painelGeralShopseguro(req,res){
    
    try {
            
        
        const idAdmin=req.session.admin.idAdmin
        const ins = await BD('inscritos').select('*').catch(err => { console.log(err) }); 
        const feedbak = await BD('feedbaks').join('clientes', 'feedbaks.cliente_id	','=','clientes.idCliente').select('*');
        const cliente = await BD('clientes').select('*').catch(err => { console.log(err) });
         const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
        const parceiros =await BD('parceiros').select('*').catch(err => { console.log(err) }); 
                  const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
       
         res.render('Admin/ShopSeguro/painelGeral',{cliente,admin,solicitacao,actividades,feedbak,parceiros,ins})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}

async listaUsuarioShopSeguro(req,res){
    try {
        const idAdmin=req.session.admin.idAdmin
               const cliente = await BD('clientes').where('acesso_Leasing','<>',0).select('*').catch(err => { console.log(err) });
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                          const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/ShopSeguro/listaUsuarioshopseguro',{cliente,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
} 
async listaTornarVendedorShopSeguro(req,res){
    try {
              const idAdmin=req.session.admin.idAdmin
               const sos = await BD('tornar_vendedor').where('estado_solicitacao',0).join('clientes', 'tornar_vendedor.cliente_id	','=','clientes.idCliente').select('*').catch(err => { console.log(err) });
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                          const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/ShopSeguro/listaTornarVendedorshopseguro',{sos,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    console.log(sos)

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async TornarVendedorShopSeguro1(req,res){
    try {
              const idAdmin=req.session.admin.idAdmin
              const {solicitacao_id}= req.params
                 const sos = await BD('tornar_vendedor').where('id',solicitacao_id).join('clientes', 'tornar_vendedor.cliente_id	','=','clientes.idCliente').join('periodo_vendedor', 'periodo_vendedor.id_tornar_vendedor	','=','tornar_vendedor.id').first()
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                 const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/ShopSeguro/tornarVendedorshopseguro1',{sos,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    console.log(sos)

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async Upgrate_for_Vendedor(req,res){
    try {
              const {idCliente,solicitacao_id}= req.body
              const cliente = await BD('clientes').where('idCliente', idCliente).update({acesso_Ecommerce:2});
           
             if(cliente){
               const sos = await BD('tornar_vendedor').where('id',solicitacao_id).update({estado_solicitacao:1})
               
                req.flash('certo', "Conta Habilitada com sucesso !");
                res.redirect('/listaTornarVendedorShopSeguro')
             }else{
                req.flash('certo', "Conta  Não Foi Habilitada  !");
                res.redirect('/listaTornarVendedorShopSeguro')
             }

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}


async listaVendedorShopSeguro(req,res){
    try {
        const idAdmin=req.session.admin.idAdmin
               const cliente = await BD('clientes').where('acesso_Leasing','=',2).select('*').catch(err => { console.log(err) });
                 const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
                          const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
                const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
        res.render('Admin/ShopSeguro/listaVendedorshopseguro',{cliente,actividades,solicitacao,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
} 
async CategoriaProdutos(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const categorias =  await BD('categoria').select('*').catch(err => { console.log(err) })
    
     res.render('Admin/ShopSeguro/listaCategorias',{solicitacao,actividades,categorias,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async ProdutosActivos(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const produtos = await BD('produto').where('estadoProduto',1).join('clientes', 'clientes.idCliente', '=', 'produto.cliente_id').join('categoria', 'categoria.idCategoria', '=', 'produto.categoria_id').select('*')
      console.log(produtos)     
     res.render('Admin/ShopSeguro/listaProdutos_ativos',{solicitacao,actividades,produtos,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async ProdutosInativos(req,res){
    try {

     const idAdmin=req.session.admin.idAdmin
               const actividades = await BD('actividades').join('clientes', 'actividades.cliente_id	','=','clientes.idCliente').orderBy('idActividade','desc').select('*');
        
      const solicitacao = await BD('solicitacao').where('estado',0).select('*').orderBy('idSolicitacao','desc')
     const admin=await BD('admin').where('idAdmin',idAdmin).first().catch(err => { console.log(err) })
     const produtos = await BD('produto').where('estadoProduto',0).join('clientes', 'clientes.idCliente', '=', 'produto.cliente_id').join('categoria', 'categoria.idCategoria', '=', 'produto.categoria_id').select('*')
      console.log(produtos)     
     res.render('Admin/ShopSeguro/listaProdutos_inativos',{solicitacao,actividades,produtos,admin,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
 

    

    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async NovaCategoriaProdutos(req, res) {
    try {

        const {	nomeCategoria,detalhesCategoria} = req.body;
        const imageCategoria = (req.file) ? req.file.filename : 'default.png';
        console.log(nomeCategoria,detalhesCategoria);
        if (nomeCategoria.length < 5) {
            

            req.flash('errado', "Nome da categoria demasiado Curto!");
            res.redirect('/CategoriaProdutos')

        } else if (detalhesCategoria.length < 15) {
            
            
            req.flash('errado', "Descricao muito Curta!");
            res.redirect('/CategoriaProdutos')
           
        } else {
             const categoria=await BD('categoria').where('nomeCategoria', nomeCategoria).first()
            if (!categoria) {
              //posso cadastrar
              const categoria = await BD('categoria').insert({imageCategoria,nomeCategoria	,detalhesCategoria})
              req.flash('certo', "Categoria Cadastrado com Sucesso!");
              res.redirect('/CategoriaProdutos')
            } else {
                
               res.json({erro:'Descrição  ja Cadastrado'})
            }
        }


    } catch (error) {
       
       res.json({erro:'Houve um problema'})
       console.log(error)
    }
}
async DeletarCategoria(req,res){
    try {
      const {categoria_id}=req.params;
      if (!isNaN(categoria_id)) {
    const categoria = await BD('categoria').where('idCategoria',categoria_id).delete()
    if(categoria){
        req.flash('certo', "categoria eliminado com sucesso!");
        res.redirect('/CategoriaProdutos')
      
     }else{
        req.flash('errado', "categoria não Eliminado!");
        res.redirect('/CategoriaProdutos')
     }     
  } else {
    req.flash('errado', "Ocorreu um problema!");
    res.redirect('/CategoriaProdutos')
  }
   
    

    } catch (error) {
        res.json({errado: "Ocorreu um problema"})
        console.log(error)
    }
}





}
module.exports = new AdminController();