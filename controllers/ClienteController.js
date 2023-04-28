
const bcrypt = require('bcryptjs');
const BD = require('../config/database')
const axios = require("axios");


class ClienteController {


async index(req, res) {


        const feedbak = await BD('feedbaks').where('estadoFeedbak', 1).join('clientes', 'feedbaks.cliente_id	', '=', 'clientes.idCliente').select('*').catch(err => { console.log(err); });
        const parceiros = await BD('parceiros').select('*').catch(err => { console.log(err) })
        res.render('Site/index', { certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info'), feedbak, parceiros })
        const V = await BD('visitantes').insert({ lat: 88888, lng: 6667, estadoVisitante: 0 }).catch(err => { console.log(err) })
    } catch(error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
    async login(req, res) {
        try {
            res.render('Site/login', { errado: req.flash('errado'), info: req.flash('info') })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async cadastro(req, res) {
        try {
            res.render('Site/cadastro', { errado: req.flash('errado'), info: req.flash('info') })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async Solicitacao(req, res) {
        try {

            const { nome, email, telefone, assunto, mensagen } = req.body
            console.log(nome, email, telefone, assunto, mensagen)
            if (nome === "" || email === "" || telefone === "" || assunto === "" || mensagen === "") {
                req.flash('errado', "Occoreeu um problema")
                res.redirect('/');
            } else {

                const s = await BD('solicitacao').insert({ nome, email, telefone, assunto, mensagen, estado: 0 })
                req.flash('certo', "Solicitação enviada com sucesso")
                res.redirect('/');
            }


        } catch (error) {
            res.redirect('/');
            console.log(error)
        }
    }
    async Inscrever(req, res) {
        try {
            const { email } = req.body
            const verify = await BD('inscritos').where('email', email).select('*')

            if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "Email Invalido");
                res.redirect('/')
            } else if (verify.length > 0) {
                console.log(verify.length)
                req.flash('errado', "Este Email Ja esta Inscrito");
                res.redirect('/')
            } else {
                const ins = await BD('inscritos').insert({ email })
                req.flash('certo', "Foste Inscrito !");
                res.redirect('/')
            }

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }

    //Cliente logado
    async Cliente(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const comprasTotal = await BD('compras').where('Compra_id_cliente', idCliente).select('*')
            const compras = await BD('compras').where('Compra_id_cliente', idCliente).join('produto', 'compras.Compra_produto_id	', '=', 'produto.idProduto').join('clientes', 'clientes.idCliente', '=', 'produto.cliente_id').join('entrega', 'entrega.compra_id', '=', 'compras.idCompra').andWhere('estado_entrega',0).select('*')
           
            res.render('Cliente/index', { errado: req.flash('errado'), certo: req.flash('certo'), cliente,comprasTotal,compras })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async meuPerfil(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const bancario = await BD('cordenadas_bancarias').where('	cliente_id', idCliente).select('*');
            const trabalho = await BD('informacoes_trabalho').join('cordenadas_bancarias', 'informacoes_trabalho.banco_id	', '=', 'cordenadas_bancarias.id_cordenadas').where('	cliente_id', idCliente).select('*');
            res.render('Cliente/meuPerfil', { bancario, trabalho, errado: req.flash('errado'), certo: req.flash('certo'), cliente })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
}

    async NovoCliente(req, res) {
        try {

            const { nome, email, telefone, username, senha, senha2, nif, provincia, municipio, endereco } = req.body;
            const cod = "123456;"
            console.log(nome, email, telefone, username, senha, senha2, nif);
            if (nome.length < 5) {

                res.json({ erro: 'Nome demasiado Curto' })

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))

                res.json({ erro: ' user nao pode ter letra Maiscula' })

            } else if ((/\s/g.test(username))) {
                console.log((/\s/g.test(username)))

                res.json({ erro: 'User nao pode ter espaço' })
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {

                res.json({ erro: 'e-mail Incorrreto' })
            } else if (senha.length < 8) {

                res.json({ erro: 'Senha muito fraca' })
            } else if (senha != senha2) {

                res.json({ erro: 'Senha Diferentes' })
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {

                res.json({ erro: 'Numero de Telefone incorreto' })

            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {

                res.json({ erro: 'NIF incorreto' })
            } else {
                const cliente = await BD('admin').where('username', username).orWhere('email', email).orWhere('telefone', telefone)
                const admin = await BD('clientes').where('username', username).orWhere('email', email).orWhere('telefone', telefone)
                if (cliente.length < 1) {
                    if (admin.length < 1) {
                        const image = (req.file) ? req.file.filename : 'user.png';

                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const cliente = await BD('clientes').insert({ provincia, municipio, endereco, image, nome, cod, email, telefone, username, senha: hash, nif, estado: 1 })
                        res.json({ certo: 'Conta criado com sucesso' })

                    } else {

                        res.json({ erro: 'Dados ja Cadastrado' })
                    }

                } else {

                    res.json({ erro: 'Dados ja Cadastrado' })
                }
            }


        } catch (error) {

            res.json({ erro: 'Houve um problema' })
            console.log(error)
        }
    }
    async Feedbak(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            res.render('Cliente/feedbak', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async form_tornarVendedor(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            res.render('Cliente/shopSeguro/form_tornarVendedor', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async tornarVendedor(req, res) {
        try {

            const cliente_id = req.session.cliente.idCliente
            const { motivo, detalhes,limitePeriodo} = req.body
            const solicitacao = await BD('tornar_vendedor').where('cliente_id', cliente_id).andWhere('estado_solicitacao', 0).first()
            if (!solicitacao) {
                var data = new Date();
                var dia = String(data.getDate()).padStart(2,'0')
                var mes = String(data.getMonth() + 1).padStart(2,'0')
                var ano = String(data.getFullYear()).padStart(2,'0')
                var dataAtual = ano +'-'+mes+'-'+ dia
               
                        function addDias(data,dias) {
                            var res = new Date(data);
                            res.setDate(res.getDate() + 1 + dias);
                            return res
                        }
                    const dataFimPeriodo = addDias(dataAtual,limitePeriodo-1)
            
                const compravativoPedido = (req.file) ? req.file.filename : 'arquivo nao encontrado!';
                if (motivo.length < 2) {
                    req.flash('errado', "Nome Muito Curto!");
                    res.redirect('/form_tornarVendedor')
                } else if (detalhes.length < 10) {
                    req.flash('errado', "Detalhes muito curto");
                    res.redirect('/form_tornarVendedor')
                } else {
                    const soli = await BD('tornar_vendedor').insert({ motivo, detalhes, estado_solicitacao: 0, cliente_id })
                    if (soli) {
                      const periodovendedor = await BD('periodo_vendedor').insert({compravativoPedido,limitePeriodo,dataFimPeriodo,id_tornar_vendedor:soli })
                    

                        const actividade = await BD('actividades').insert({ detalhes: 'Enviou uma solicitaçºao para se tornar um vendedor na plataforma', estado_atividade: 0, cliente_id })
                        req.flash('certo', " Solicitação Submetido");
                        res.redirect('/form_tornarVendedor')
                    }
                    else {
                        req.flash('errado', "Houve um problema interno!");
                        res.redirect('/form_tornarVendedor')
                    }
                }
            } else {
                req.flash('errado', "Ja submeteste uma Solicitação");
                res.redirect('/form_tornarVendedor')
            }


        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async EnviarFeedbak(req, res) {
        try {
            const { comentario } = req.body
            if (comentario == "" || comentario.length < 8) {
                req.flash('errado', "Feedbak Muito curto!");
                res.redirect('/Feedbak')
            } else {
                const cliente_id = req.session.cliente.idCliente
                const feedbak = await BD('feedbaks').insert({ comentario, estadoFeedbak: 0, cliente_id })
                if (feedbak) {
                    req.flash('certo', "Feedbak relatado com sucesso!");
                    res.redirect('/Feedbak')
                } else {
                    req.flash('errado', "Feedbak Nao foi relatado!");
                    res.redirect('/Feedbak')
                }
            }

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }//provavelmente vai sair
    async BatePapo(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            res.render('Cliente/pageChat', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async AlterarFoto(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();

            if (req.file) {
                const image = (req.file) ? req.file.filename : cliente.image;
                const update = await BD('clientes').where('idCliente', idCliente).update({ image })
                if (update) {
                    req.flash('certo', "Editado com sucesso");
                    res.redirect('/perfilCliente')
                } else {
                    req.flash('errado', "Ocorreu um Problema");
                    res.redirect('/perfilCliente')
                }
            } else {
                req.flash('errado', "Ocorreu um Problema");
                res.redirect('/perfilCliente')
            }

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async EditarPerfilCliente(req, res) {
        try {
            const { nome, email, telefone, username, nif, provincia, municipio, endereco } = req.body;
            const idCliente = req.session.cliente.idCliente
            const telefonel = isNaN(telefone)
            if (nome.length < 5) {
                req.flash('errado', "Nome demasiado Curto");
                res.redirect('/perfilCliente')

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                req.flash('errado', " user nao pode ter letra Maiscula");
                res.redirect('/perfilCliente')
            } else if ((/\s/g.test(username))) {
                console.log((/\s/g.test(username)))
                req.flash('errado', "User nao pode ter espaço");
                res.redirect('/perfilCliente')
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "nao cadastrado");
                res.redirect('/perfilCliente')
            } else if (telefone.length != 9) {
                req.flash('errado', "Numero de Telefone incorreto");
                res.redirect('/perfilCliente')
            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                req.flash('errado', "NIF incorreto");
                res.redirect('/perfilCliente')
            } else {

                const cliente = await BD('clientes').where('idCliente', idCliente).update({ nome, email, telefone, username, nif, provincia, municipio, endereco })

                req.flash('certo', "A sua conta foi Editada !");
                res.redirect('/perfilCliente')
                console.log(cliente)



            }




        } catch (error) {
            res.json({ errado: "Houve um problema interno !" });
            console.log(error)
        }
    }
    async AlterSenha(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const { senhaatual, senha, senha2 } = req.body;
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            var correct = bcrypt.compareSync(senhaatual, cliente.senha);
            if (correct) {
                if (senha != senha2) {
                    req.flash('errado', "Senha Actual incorrecta");
                    res.redirect('/perfilCliente')
                } else {
                    if (senha.length < 8) {
                        req.flash('errado', "Senha Muito Fraca!");
                        res.redirect('/perfilCliente')
                    } else {
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const update = await BD('clientes').where('idCliente', idCliente).update({ senha: hash })
                        if (update) {
                            req.flash('certo', "Editado com sucesso");
                            res.redirect('/perfilCliente')
                        } else {
                            req.flash('errado', "Ocorreu um Problema");
                            res.redirect('/perfilCliente')
                        }
                    }

                }

            } else {
                req.flash('errado', "Senha Actual incorrecta");
                res.redirect('/perfilCliente')
            }

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async NovaContaBancaria(req, res) {
        try {
            const { nome_Banco, numero_conta, nib_conta, iban_conta } = req.body
            const cliente_id = req.session.cliente.idCliente
            if (iban_conta == "" || iban_conta.length < 8) {
                req.flash('errado', "iban_conta Muito curto!");
                res.redirect('/perfilCliente')
            } else if (nome_Banco.length < 2) {
                req.flash('errado', "nome_Banco Nao Aceite!");
                res.redirect('/perfilCliente')
            } else if (numero_conta.length < 8) {
                req.flash('errado', "numero_conta Nao Aceite!");
                res.redirect('/perfilCliente')
            } else if (nib_conta.length < 5) {
                req.flash('errado', "nib_conta Nao Aceite!");
                res.redirect('/perfilCliente')
            } else {
                const verify = await BD('cordenadas_bancarias').where('numero_conta', numero_conta).orWhere('iban_conta', iban_conta).orWhere('nib_conta', nib_conta).first()
                const verify2 = await BD('cordenadas_bancarias').where('cliente_id', cliente_id).select('*')
                if (!verify) {
                    if (verify2.length > 7) {
                        req.flash('errado', "Antigiu o limite Mximo de Contas!");
                        res.redirect('/perfilCliente')
                    } else {

                        const conta = await BD('cordenadas_bancarias').insert({ nome_Banco, numero_conta, nib_conta, iban_conta, estado_cordenadas: 0, cliente_id })
                        if (conta) {
                            req.flash('certo', "Cordenadas com sucesso!");
                            res.redirect('/perfilCliente')
                        } else {
                            req.flash('errado', "Cordenadas Nao foi relatado!");
                            res.redirect('/perfilCliente')
                        }
                    }

                } else {
                    req.flash('errado', "Cordenadas Ja Cadastrados!");
                    res.redirect('/perfilCliente')
                }

            }

        } catch (error) {
            res.redirect('/perfilCliente')
            console.log(error)
        }
    }
    async DeletarContaBancaria(req, res) {
        try {
            const { id_cordenadas } = req.params;
            console.log(id_cordenadas)
            if (!isNaN(id_cordenadas)) {
                const delet = await BD('cordenadas_bancarias').where('id_Cordenadas', id_cordenadas).delete()
                if (delet) {
                    req.flash('certo', "cordenadas_bancarias eliminado com sucesso!");
                    res.redirect('/perfilCliente')

                } else {
                    req.flash('errado', "cordenadas_bancarias não Eliminado!");
                    res.redirect('/perfilCliente')
                }
            } else {

                req.flash('errado', "Ocorreu um problema ao deletar!");
                res.redirect('/perfilCliente')
            }



        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async NovaEmpresa(req, res) {
        try {
            const { nome_empresa, salario_mensal, banco_id } = req.body
            if (nome_empresa == "" || nome_empresa.length < 6) {
                req.flash('errado', "nome_empresa Muito curto!");
                res.redirect('/perfilCliente')
            } else if (salario_mensal < 2) {
                req.flash('errado', "salario_mensal Nao Aceite!");
                res.redirect('/perfilCliente')
            } else {
                const verify = await BD('informacoes_trabalho').where('nome_empresa', nome_empresa).andWhere('banco_id', banco_id).first()
                if (!verify) {
                    const conta = await BD('informacoes_trabalho').insert({ nome_empresa, salario_mensal, banco_id })
                    if (conta) {
                        req.flash('certo', "Informacoes Registada com sucesso!");
                        res.redirect('/perfilCliente')
                    } else {
                        req.flash('errado', "Cordenadas Nao foi relatado!");
                        res.redirect('/perfilCliente')
                    }

                } else {
                    req.flash('errado', "Dados Ja Cadastrado No Sistema!");
                    res.redirect('/perfilCliente')
                }

            }

        } catch (error) {
            res.redirect('/perfilCliente')
            console.log(error)
        }
    }
    //LEASING
    async MeusPacotes(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const pacotes = await BD('meus_pacotes').where('cliente_id	', idCliente).select('*')
            const cliente = await BD('clientes').where('idCliente', idCliente).first().catch(err => { console.log(err) })
            res.render('Cliente/leasingSeguro/meusPacotes', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, pacotes })

        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async form_tornarInvestidor(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first().catch(err => { console.log(err) })
            res.render('Cliente/leasingSeguro/form_tornarInvestidor', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async tornarInvestidor(req, res) {
        try {
            const cliente_id = req.session.cliente.idCliente
            const {info_pedido,limitePeriodo} = req.body
            const solicitacao = await BD('tornar_investidor').where('cliente_id', cliente_id).andWhere('estado_', 0).first()
            if (!solicitacao) {
                var data = new Date();
                var dia = String(data.getDate()).padStart(2,'0')
                var mes = String(data.getMonth() + 1).padStart(2,'0')
                var ano = String(data.getFullYear()).padStart(2,'0')
                var dataAtual = ano +'-'+mes+'-'+ dia
               
                        function addDias(data,dias) {
                            var res = new Date(data);
                            res.setDate(res.getDate() + 1 + dias);
                            return res
                        }
                const dataFimPeriodo = addDias(dataAtual,limitePeriodo-1)
                const compravativoPedido = (req.file) ? req.file.filename : 'arquivo nao encontrado!';
                if (info_pedido.length < 2) {
                    req.flash('errado', "Nome Muito Curto!");
                    res.redirect('/form_tornarInvestidor')
               
                } else {
                    const sos = await BD('tornar_investidor').insert({info_pedido, estado_: 0, cliente_id })
                    if (sos) {
                        
                        const periodoinvestidor = await BD('periodo_investidor').insert({compravativoPedido,limitePeriodo,dataFimPeriodo,id_tornar_investidor:sos })
                    

                        const actividade = await BD('actividades').insert({ detalhes: 'Enviou uma solicitação para se tornar Investidor na plataforma Digital Seguros', estado_atividade: 0, cliente_id })
                        req.flash('certo', " Solicitação Submetido");
                        res.redirect('/form_tornarInvestidor')
                    }
                    else {
                        req.flash('errado', "Houve um problema interno!");
                        res.redirect('/form_tornarInvestidor')
                    }
                }
            } else {
                req.flash('errado', "Ja submeteste uma Solicitação");
                res.redirect('/form_tornarInvestidor')
            }


        } catch (error) {
            res.json({erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async Listar_Minhas_Solicitacoes(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first().catch(err => { console.log(err) })
            res.render('Cliente/leasingSeguro/lista_minhas_solicitacoes', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async painelInvestidor(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first().catch(err => { console.log(err) })
            res.render('Cliente/leasingSeguro/painelInvestidor', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async meusInvestimentos(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first().catch(err => { console.log(err) })
            res.render('Cliente/leasingSeguro/meusInvestimentos', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }

    async SolicitarMovimentoConta(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first().catch(err => { console.log(err) })
            res.render('Cliente/leasingSeguro/form_Solicitar_Movimento', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    //SHOPSEGURO
    async PainelVendedor(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            res.render('Cliente/shopSeguro/PainelVendedor', { errado: req.flash('errado'), certo: req.flash('certo'), cliente })


        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async meusProdutos(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const produtos = await BD('compras').where('cliente_id', idCliente).join('produto', 'compras.Compra_produto_id	', '=', 'produto.idProduto')
            res.render('Cliente/shopSeguro/meusProdutos', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, produtos })
            console.log(produtos)

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async produtosComprados(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const produtos = await BD('compras').where('Compra_id_cliente', idCliente).join('produto', 'compras.Compra_produto_id	', '=', 'produto.idProduto').join('imagensproduto', 'imagensproduto.produto_id', '=', 'produto.idProduto').select('*')
            res.render('Cliente/shopSeguro/produtosComprados', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, produtos })
            console.log(produtos)

        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
 
    async listaregistoCompras(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const produtos = await BD('compras').where('Compra_id_cliente', idCliente).andWhere('estado_compra',0).join('produto', 'compras.Compra_produto_id	', '=', 'produto.idProduto').join('entrega', 'entrega.compra_id', '=', 'compras.idCompra').join('clientes', 'clientes.idCliente', '=', 'produto.cliente_id').select('*')
            res.render('Cliente/shopSeguro/listaregistoCompras', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, produtos })


        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async EntregasMarcadas(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const produtos = await BD('compras').where('Compra_id_cliente', idCliente).join('produto', 'compras.Compra_produto_id	', '=', 'produto.idProduto').join('clientes', 'clientes.idCliente', '=', 'produto.cliente_id').join('entrega', 'entrega.compra_id', '=', 'compras.idCompra').andWhere('estado_entrega',0).select('*')
            res.render('Cliente/shopSeguro/entregasMarcadas', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, produtos })


        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    //Cultural Seguros

  async Galerias_fotos(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const galeria_fotos = await BD('galeria_fotos').join('fotos', 'fotos.galeria_fotos_id', '=', 'galeria_fotos.idgaleria_fotos').select('*')
            res.render('Cliente/culturalSeguro/Galerias_fotos', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, galeria_fotos })

console.log(galeria_fotos)
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async Musicas_adquiridas(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const galeria_fotos = await BD('galeria_fotos').join('fotos', 'fotos.galeria_fotos_id', '=', 'galeria_fotos.idgaleria_fotos').select('*')
            res.render('Cliente/culturalSeguro/Musicas_adquiridos', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, galeria_fotos })

console.log(galeria_fotos)
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async Artes_plasticas_adquiridos(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const galeria_fotos = await BD('galeria_fotos').join('fotos', 'fotos.galeria_fotos_id', '=', 'galeria_fotos.idgaleria_fotos').select('*')
            res.render('Cliente/culturalSeguro/Artes_plasticas_adquiridos', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, galeria_fotos })

console.log(galeria_fotos)
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }
    async Bilhetes_eventos_adquiridos(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const galeria_fotos = await BD('galeria_fotos').join('fotos', 'fotos.galeria_fotos_id', '=', 'galeria_fotos.idgaleria_fotos').select('*')
            res.render('Cliente/culturalSeguro/Bilhetes_eventos_adquiridos', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, galeria_fotos })

console.log(galeria_fotos)
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }

    async Videos_Digital_seguros(req, res) {
        try {
            const idCliente = req.session.cliente.idCliente
            const cliente = await BD('clientes').where('idCliente', idCliente).first();
            const galeria_fotos = await BD('galeria_fotos').join('fotos', 'fotos.galeria_fotos_id', '=', 'galeria_fotos.idgaleria_fotos').select('*')
            res.render('Cliente/culturalSeguro/Videos_Digital_seguros', { errado: req.flash('errado'), certo: req.flash('certo'), cliente, galeria_fotos })

console.log(galeria_fotos)
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
    }




}
module.exports = new ClienteController();