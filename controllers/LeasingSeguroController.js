const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const BD = require('../config/database')
//Sercret JWT
const JWTSecret = "djkshahjksdajksdhasISAACISVALDOPIMENTELBUNGA123jkdhasjkdhasjkdhasjkdkkkkklllllbbbnn";
class leasingController {

    async LoginLeasing(req, res) {
        try {
            var { email, senha } = req.body;
            console.log(email, senha)
            if (email.length != 0 || !(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                const cliente = await BD('clientes').where('username', email).orWhere('email', email).first()

                if (cliente != undefined) {
                    var correct = bcrypt.compareSync(senha, cliente.senha);
                    if (correct) {

                        const cliente_id = cliente.idCliente;

                        jwt.sign({ idCliente: cliente.idCliente, email: cliente.email, acesso: 0 }, JWTSecret, { expiresIn: '48h' }, async (err, token) => {
                            if (err) {
                                res.status(400);
                                res.json({ erro: "Erro ao Gerar Token" })

                            } else {
                                const actividade = await BD('actividades').insert({ detalhes: 'Iniciou Sessao No Aplicativo Leasing Seguro', estado_atividade: 0, cliente_id })


                                res.json({ token, cliente })


                            }
                        })
                    } else {

                        res.json({ erro: "Credencias Inválida" })

                    }
                } else {

                    res.json({ erro: "e-mail desconhecido" })

                }

            } else {

                res.json({ erro: "E-mail Incorreto" })

            }

        } catch (error) {

            res.json({ erro: "Ocorreu um problema" })

            console.log(error)
        }
    }
    async NovoCliente(req, res) {
        try {
    
            const { nome, email, telefone, username, senha, senha2, nif,provincia,municipio,endereco } = req.body;
            const cod ="123456;"
            console.log(nome, email, telefone, username, senha, senha2, nif);
            if (nome.length < 5) {
                
                res.json({erro:'Nome demasiado Curto'})
    
            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                
                res.json({erro:' user nao pode ter letra Maiscula'})
               
            } else if ((/\s/g.test(username))) {
                console.log((/\s/g.test(username)))
             
               res.json({erro:'User nao pode ter espaço'})
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
               
               res.json({erro:'e-mail Incorrreto'})
            } else if (senha.length < 8) {
                
               res.json({erro:'Senha muito fraca'})
            } else if (senha != senha2) {
                
               res.json({erro:'Senha Diferentes'})
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {
               
               res.json({erro:'Numero de Telefone incorreto'})
    
            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
              
               res.json({erro:'NIF incorreto'})
            } else {
                 const cliente=await BD('admin').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                const admin=await BD('clientes').where('username', username).orWhere('email',email).orWhere('telefone',telefone)
                if (cliente.length < 1) {
                    if (admin.length < 1) {
                        const image = (req.file) ? req.file.filename : 'user.png';
                        
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const cliente = await BD('clientes').insert({provincia,municipio,endereco, image, nome,cod, email, telefone, username, senha: hash, nif, estado: 1 })
                        res.json({certo:'Conta criado com sucesso'})
                       
                    } else {
                        
                       res.json({erro:'Dados ja Cadastrado'})
                    }
    
                } else {
                    
                   res.json({erro:'Dados ja Cadastrado'})
                }
            }
    
    
        } catch (error) {
           
           res.json({erro:'Houve um problema'})
           console.log(error)
        }
    }

    //Pesquisas......	saldo_contabilizado
    async Pacotes(req, res) {
        try {
        const pacotes=await BD('pacotes').select('*'); 
        res.json({pacotes})

        }catch (error) {
            res.json({ erro: "Ocorreu um problema" })
            console.log(error)
        }
    }
    async CategoriaPacotes(req, res) {
        try {
        const categorias=await BD('categoria_pacotes').join('pacotes', 'pacotes.categoria_id','=','categoria_pacotes.idCategoria').select('*'); 
        res.json({categorias})

        }catch (error) {
            res.json({ erro: "Ocorreu um problema" })
            console.log(error)
        }
    }
    async CordenadasBancarias(req, res) {
        try {
            const {cliente_id}= req.params;
        const cordenadas_bancarias=await BD('cordenadas_bancarias').where('cliente_id',cliente_id).select('*'); 
        res.json({cordenadas_bancarias})

        }catch (error) {
            res.json({ erro: "Ocorreu um problema" })
            console.log(error)
        }
    }
    async Parceiros(req, res) {
        try {   
        const parceiros=await BD('parceiros').select('*'); 
        res.json({parceiros})
        }catch (error) {
            res.json({ erro: "Ocorreu um problema" })
            console.log(error)
        }
    }
    async saldo_contabilizado(req, res) {
        try { 
            const {cliente_id}= req.params;  
        const parceiros=await BD('saldo_contabilizado').where('cliente_id',cliente_id).select('*'); 
        res.json({parceiros})
        }catch (error) {
            res.json({ erro: "Ocorreu um problema" })
            console.log(error)
        }
    }


} module.exports = new leasingController();