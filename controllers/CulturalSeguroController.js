const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const BD = require('../config/database');

class CulturalSeguroController {

    async NovaEntidade(req, res) {
        try {
    
            const { nome, email, telefone, username, senha, senha2, nif,provincia,municipio,endereco,acesso_Cultural} = req.body;
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
                        const cliente = await BD('clientes').insert({provincia,municipio,endereco, image, nome,cod,acesso_Cultural, email, telefone, username, senha: hash, nif, estado: 1 })
                         if(cliente){
                            const produto = await BD('saldo_utilizar_cultural').insert({ saldo_disponivel:20,cliente_saldo_disponivel_id:cliente})
                            res.json({certo:'Conta criado com sucesso'})
                         }else{
                            res.json({erro:'Occoreu um problema ao Cadastrar'})
                         }
                        
                       
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
    async LoginCulturalSeguros(req, res) {
        try {
            var { email, senha } = req.body;
            console.log(email, senha)
            if (email.length != 0 || !(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                const cliente = await BD('clientes').where('username', email).orWhere('email', email).first()

                if (cliente != undefined) {
                    var correct = bcrypt.compareSync(senha, cliente.senha);
                    if (correct) {

                        const cliente_id = cliente.idCliente;

                        jwt.sign({ idCliente: cliente.idCliente, email: cliente.email, acesso: 0 }, JWTSecret, { expiresIn: '120h' }, async (err, token) => {
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

    //«««««««««««««««««««««« GERAL »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
    async Pesquisa_Dinanica(req, res) {
        try {
            //produto, categoria,Vendendor
            const {pesquisa}= req.body
            const musicas = await BD('musicas').where('nomeMusica', 'like', `%${pesquisa}%`).join('clientes', 'clientes.idCliente', '=', 'musicas.musico_id').join('categoria_musica', 'categoria_musica.idcategoria_musica', '=', 'musicas.categoria_musica_id').select('*')
            const livros = await BD('livros').where('nomeMusica', 'like', `%${pesquisa}%`).where('nomeLivro', 'like', `%${pesquisa}%`).join('clientes', 'clientes.idCliente', '=', 'livros.escritor_id').join('categoria_livro', 'categoria_livro.idcategoria_livro', '=', 'livros.categoria_livro_id').select('*')
            const artes_plasticas = await BD('artes_plasticas').where('nomeartes_plasticas', 'like', `%${pesquisa}%`).join('clientes', 'clientes.idCliente', '=', 'artes_plasticas.artista_id').join('categoria_artes_plasticas', 'categoria_artes_plasticas.idcategoria_artes_plasticas', '=', 'artes_plasticas.idartes_plasticas').select('*')
            const eventos = await BD('eventos').where('	nomeEvento', 'like', `%${pesquisa}%`).join('clientes', 'clientes.idCliente', '=', 'eventos.organizador_evento_id	').join('categoria_evento', 'categoria_evento.idcategoria_evento', '=', 'eventos.categoria_evento_id').select('*')
          //const entidade = await BD('clientes').where('nome','like', `%${pesquisa}%`).orWhere('username','like', `%${pesquisa}%`).andWhere('acesso_Cultural','>',1).select('*')
          
            const categorias_musicas = await BD('categoria_musica').where('nomecategoria_musica', 'like', `%${pesquisa}%`).select('*')
            const categoria_livro = await BD('categoria_livro').where('nomecategoria_livro', 'like', `%${pesquisa}%`).select('*')
            const categoria_evento = await BD('categoria_evento').where('nomecategoria_evento', 'like', `%${pesquisa}%`).select('*')
            const categoria_artes_plasticas = await BD('categoria_artes_plasticas').where('nomecategoria_artes_plasticas', 'like', `%${pesquisa}%`).select('*')
           
           
            res.json({musicas,livros,artes_plasticas,eventos,categorias_musicas,categoria_livro,categoria_evento,categoria_artes_plasticas})

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Categorias_Musicas(req, res) {
        try {

            const categorias_musicas = await BD('categoria_musica').select('*')
            res.json({ categorias_musicas })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Categorias_Livro(req, res) {
        try {

            const categoria_livro = await BD('categoria_livro').select('*')
            res.json({ categoria_livro })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Categorias_Evento(req, res) {
        try {

            const categoria_evento = await BD('categoria_evento').select('*')
            res.json({ categoria_evento })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async categoria_artes_plasticas(req, res) {
        try {

            const categoria_artes_plasticas = await BD('categoria_artes_plasticas').select('*')
            res.json({ categoria_artes_plasticas })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }

    async Musicas(req, res) {
        try {

           const musicas = await BD('musicas').join('clientes', 'clientes.idCliente', '=', 'musicas.musico_id').join('categoria_musica', 'categoria_musica.idcategoria_musica', '=', 'musicas.categoria_musica_id').select('*')
            res.json({ musicas })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Uma_Musica(req, res) {
        try {
            const {id_musica} =req.params;

           const musica = await BD('musicas').where('idMusica',id_musica).join('clientes', 'clientes.idCliente', '=', 'musicas.musico_id').join('categoria_musica', 'categoria_musica.idcategoria_musica', '=', 'musicas.categoria_musica_id').select('*')
            res.json({ musica })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Livros(req, res) {
        try {

           const livros = await BD('livros').join('clientes', 'clientes.idCliente', '=', 'livros.escritor_id').join('categoria_livro', 'categoria_livro.idcategoria_livro', '=', 'livros.categoria_livro_id').select('*')
            res.json({ livros })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Um_Livro(req, res) {
        try {
           const {id_livro} = req.params
           const livro = await BD('livros').where('idLivro',id_livro).join('clientes', 'clientes.idCliente', '=', 'livros.escritor_id').join('categoria_livro', 'categoria_livro.idcategoria_livro', '=', 'livros.categoria_livro_id').select('*')
            res.json({ livro })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Artes_plasticas(req, res) {
        try {

           const artes_plasticas = await BD('artes_plasticas').join('clientes', 'clientes.idCliente', '=', 'artes_plasticas.artista_id').join('categoria_artes_plasticas', 'categoria_artes_plasticas.idcategoria_artes_plasticas', '=', 'artes_plasticas.idartes_plasticas').select('*')
            res.json({ artes_plasticas })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Uma_Arte_plastica(req, res) {
        try {
           const {id_artes_plasticas}= req.params;
           const artes_plastica = await BD('artes_plasticas').where('idartes_plasticas',id_artes_plasticas).join('clientes', 'clientes.idCliente', '=', 'artes_plasticas.artista_id').join('categoria_artes_plasticas', 'categoria_artes_plasticas.idcategoria_artes_plasticas', '=', 'artes_plasticas.idartes_plasticas').select('*')
            res.json({ artes_plastica})

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Eventos(req, res) {
        try {

           const eventos = await BD('eventos').join('clientes', 'clientes.idCliente', '=', 'eventos.organizador_evento_id	').join('categoria_evento', 'categoria_evento.idcategoria_evento', '=', 'eventos.categoria_evento_id').select('*')
            res.json({ eventos })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Um_Evento(req, res) {
        try {
           const {id_evento}= req.params;
           const evento = await BD('eventos').where('idEvento',id_evento).join('clientes', 'clientes.idCliente', '=', 'eventos.organizador_evento_id	').join('categoria_evento', 'categoria_evento.idcategoria_evento', '=', 'eventos.categoria_evento_id').select('*')
            res.json({evento})

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Musicas_Adquiridas(req, res) {
        try {
            const {id_entidade_adquiriu}= req.params

           const musicas_adquiridas = await BD('musicas_adquiridas').where('id_entidade_adquiriu',id_entidade_adquiriu).join('musicas', 'musicas.idMusica', '=', 'musicas_adquiridas.id_musica_adquirida').join('clientes', 'clientes.idCliente', '=', 'musicas.musico_id').join('categoria_musica', 'categoria_musica.idcategoria_musica', '=', 'musicas.categoria_musica_id').select('*')
            res.json({ musicas_adquiridas })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Livros_Adquiridos(req, res) {
        try {
      const {id_entidade_adquiriu}=req.params;
           const livros_adquiridos = await BD('livros_adquiridos').where('id_entidade_adquiriu',id_entidade_adquiriu).join('livros', 'livros.idLivro', '=', 'livros_adquiridos.id_livro_adquirido').join('clientes', 'clientes.idCliente', '=', 'livros.escritor_id').join('categoria_livro', 'categoria_livro.idcategoria_livro', '=', 'livros.categoria_livro_id').select('*')
            res.json({ livros_adquiridos })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Bilhetes_Eventos_adquiridos(req, res) {
        try {
            const {id_entidade_adquiriu}=req.params;
           const bilhetes_Eventos_adquiridos = await BD('bilhetes_adquiridos').where('id_entidade_adquiriu',id_entidade_adquiriu).join('eventos', 'eventos.idEvento', '=', 'bilhetes_adquiridos.id_bilhete_evento').join('clientes', 'clientes.idCliente', '=', 'eventos.organizador_evento_id	').join('categoria_evento', 'categoria_evento.idcategoria_evento', '=', 'eventos.categoria_evento_id').select('*')
            res.json({ bilhetes_Eventos_adquiridos })

        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }

    //«««««««««««««««««««««« ESCRITOR »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
    async Cadastrar_Livro(req, resp) {
        try {
            const {nomeLivro,descricaoLivro,precoLivro,quantidadeLivro,estadoLivro,categoria_livro_id,escritor_id	 }= req.body
        
            const saldo = await BD('saldo_utilizar_cultural').where('cliente_saldo_disponivel_id','=',escritor_id).first()
            const saldoAtual =saldo.salso 
            if(saldoAtual < 10){
                resp.json({verify:'Tens pouco Credito para Publicar uma arte'})   
            }else{
            if(nomeLivro===""||descricaoLivro===""||precoLivro===""){
                resp.json({verify:'Um dos dados em Falta'})  
            }else{
                if (req.files) {
                    const upl = req.files;
                        const obra = upl.filter(t => {
                        return { path: t.filename }
                    })
                    const capaLivro = obra[0].filename
                    const ficheiro = obra[1].filename
                    
                    const livros = await BD('livros').insert({nomeLivro,descricaoLivro,ficheiro,capaLivro,precoLivro	,quantidadeLivro,	estadoLivro,categoria_livro_id,	escritor_id	})
                     resp.json({certo:"livro cadastrado no Cultural"})
                }
            }
              
                
            }
          
           
    
        } catch (error) {
            resp.json(error)
            console.log(error)
        }
    }
    //«««««««««««««««««««««« MUSICO »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
    //«««««««««««««««««««««« ORGANZADOR EVENTO »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
    //«««««««««««««««««««««« ARTISTA (PINTOR DE QUADRO) »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
}module.exports = new CulturalSeguroController();