const express = require(`express`);
const router = express.Router();
//Controllers
const  Conta =require('../config/Conta');
const  Administracao =require('../controllers/AdminController');
const  Cliente=require('../controllers/ClienteController');
const CoordenadorController=require('../controllers/CoordenadorController');
const leasingSeguroController = require('../controllers/LeasingSeguroController');
const Ecommerceontroller = require('../controllers/ShopSeguroControllerApp');
const CulturalSeguroController = require('../controllers/CulturalSeguroController')
//middlewares
const foto = require('../config/upload')
const doc = require('../config/uploadDoc')
const LeasingAuth = require('../middlewares/leasingApp')
const E_commerceAulth = require('../middlewares/e_commerceApp')
const adminAuth= require('../middlewares/Admin')
const clienteAuth= require('../middlewares/Cliente')
const s = require('../middlewares/sessao')



//Home Page Digital
router.get('/' ,Cliente.index); 
router.get('/cadastro' ,Cliente.cadastro); 
router.get('/login' ,s,Cliente.login); 
router.post('/Solicitacao' ,Cliente.Solicitacao); 
router.post('/Inscrever_se' ,Cliente.Inscrever);
router.get('/logout' ,Conta.logout); 
router.post('/Autenticar', Conta.Autenticar); //Rota para fazer autenticação
router.post('/NovoCliente', Cliente.NovoCliente); //Rota para cadastrar novo cliente


//Rotas do Cliente(Home para Quem estiver Autenticado)
router.get('/cliente', clienteAuth,Cliente.Cliente); 
router.get('/perfilCliente', clienteAuth,Cliente.meuPerfil);
router.get('/Feedbak', clienteAuth,Cliente.Feedbak); 
router.post('/EnviarFeedbak', clienteAuth,Cliente.EnviarFeedbak); 
router.post('/AlterarFotoCliente',foto.single('image'), clienteAuth,Cliente.AlterarFoto); 
router.post('/EditarPerfilCliente', clienteAuth,Cliente.EditarPerfilCliente); 
router.post('/AlterSenha', clienteAuth,Cliente.AlterSenha); 
router.get('/form_tornarVendedor', clienteAuth,Cliente.form_tornarVendedor); 
router.post('/tornarVendedor', foto.single('arquivo'),clienteAuth,Cliente.tornarVendedor); 
router.post('/NovaContaBancaria',clienteAuth,Cliente.NovaContaBancaria); 
router.get('/DeletarContaBancaria/:id_cordenadas',clienteAuth,Cliente.DeletarContaBancaria); 
router.post('/NovaEmpresa',clienteAuth,Cliente.NovaEmpresa); 
router.get('/BatePapo', clienteAuth,Cliente.BatePapo); 

//LEASING
 
router.get('/MeusPacotes', clienteAuth,Cliente.MeusPacotes); 
router.get('/form_tornarInvestidor',clienteAuth,Cliente.form_tornarInvestidor)
router.post('/tornarInvestidor',foto.single('ficheiro'),clienteAuth,Cliente.tornarInvestidor)
//Investidor
router.get('/painelInvestidor', clienteAuth,Cliente.painelInvestidor); 
router.get('/meusInvestimentos', clienteAuth,Cliente.meusInvestimentos); 
router.get('/SolicitarMovimentoConta',clienteAuth,Cliente.SolicitarMovimentoConta)// Esta Rota vai chamar formulario para poder solicitar sacar o seu dinheiro
router.get('/Listar_Minhas_Solicitacoes',clienteAuth,Cliente.Listar_Minhas_Solicitacoes)



//SHOPSEGURO
router.get('/PainelVendedor', clienteAuth,Cliente.PainelVendedor); 
router.get('/produtosComprados', clienteAuth,Cliente.produtosComprados); 
router.get('/meusProdutos', clienteAuth,Cliente.meusProdutos); 
router.get('/EntregasMarcadas', clienteAuth,Cliente.EntregasMarcadas); 
router.get('/listaregistoCompras', clienteAuth,Cliente.listaregistoCompras); 

//Cultural Seguros
router.get('/Galerias_fotos', clienteAuth,Cliente.Galerias_fotos); 
router.get('/Musicas_adquiridas', clienteAuth,Cliente.Musicas_adquiridas); 
router.get('/Artes_plasticas_adquiridos', clienteAuth,Cliente.Artes_plasticas_adquiridos); 
router.get('/Bilhetes_eventos_adquiridos', clienteAuth,Cliente.Bilhetes_eventos_adquiridos); 
router.get('/Videos_Digital_seguros', clienteAuth,Cliente.Videos_Digital_seguros); 


//Rotas Administrativas
router.get('/Dashboard',adminAuth,Administracao.Dashboard)
router.get('/dashboardAnalise',adminAuth,Administracao.dashboardAnalise)



//Listar
router.get('/feedbaks',adminAuth,Administracao.feedbaks)
router.get('/DeletarFeedbak/:idFeedbak',adminAuth,Administracao.DeletarFeedbak)
router.get('/ReprovarFeedbak/:idFeedbak',adminAuth,Administracao.ReprovarFeedbak)
router.get('/AprovarFeedbak/:idFeedbak',adminAuth,Administracao.AprovarFeedbak)
router.get('/ListarRetornoChamada',adminAuth,Administracao.ListarRetornoChamada)
router.get('/RetornoChamada1/:solicitacao_id',adminAuth,Administracao.RetornoChamada1)
router.get('/listaUsuario',adminAuth,Administracao.listaUsuario)
router.get('/perfilCliente/:cliente_id',adminAuth,Administracao.perfilCliente)
router.get('/ListarAdmins',adminAuth, Administracao.ListarAdmins);
router.get('/perfilAdmin/:admin_id',adminAuth, Administracao.perfilAdmin);
router.get('/ListarAcesso',adminAuth, Administracao.ListarAcesso);
router.get('/Actividade/:cliente_id',adminAuth, Administracao.Actividade);
router.get('/ListarCoordenador',adminAuth, Administracao.ListarCoordenador);
router.get('/perfilCordenador/:cordenador_id',adminAuth, Administracao.perfilCordenador);
router.post('/NovoCordenador',adminAuth, Administracao.NovoCordenador);
router.post('/NovoAdministrador',foto.single('image'),adminAuth, Administracao.NovoAdmin); 

//Fim Listagem
//Deletar 
router.get('/DeletarCliente/:idCliente',adminAuth, Administracao.DeletarCliente);
router.get('/DeletarAdmin/:idAdmin', Administracao.DeletarAdmin); //Deletar Admins
router.get('/DeletarActividade/:idActividade', Administracao.DeletarActividade); //Deletar Admins
router.get('/DeletarCordenador/:cordenador_id', Administracao.DeletarCordenador); //Deletar Admins
//Fim Deletar 


//perfil Administrador
router.get('/meuPerfil',adminAuth,Administracao.meuPerfil)
router.post('/AlterarFotoAdmin',foto.single('image'), adminAuth,Administracao.AlterarFoto); 
router.post('/alterarSenhaAdmin',adminAuth,Administracao.alterarSenha)
router.post('/EditarminhaContaAdmin',adminAuth, Administracao.EditarAdmin);

 // Fim perfil Administrador

//Area culturalSeguro Administrador
router.get('/listaUsuarioC',adminAuth, Administracao.listaUsuarioC);
router.get('/painelGeralCUltural',adminAuth, Administracao.painelGeralCUltural);
//Area culturalSeguro Administrador



//LEASIN SEGUROS
router.get('/ListarParceiros',adminAuth, Administracao.ListarParceiros);
router.get('/listaTornarInvestidorLeasing',adminAuth, Administracao.listaTornarInvestidorLeasing);
router.get('/TornarInvestidorLeasing1/:id_pedido', adminAuth,Administracao.TornarInvestidorLeasing1);
router.post('/Upgrate_for_Investidor', adminAuth,Administracao.Upgrate_for_Investidor);
router.get('/listaUsuarioLeasing',adminAuth, Administracao.listaUsuarioLeasing);
router.get('/painelGeralLeasingSeguro', adminAuth,Administracao.painelGeralLeasingSeguro);


//SHOPSEGURO
router.get('/painelGeralShopseguro', adminAuth,Administracao.painelGeralShopseguro);
router.get('/listaUsuarioShopSeguro', adminAuth,Administracao.listaUsuarioShopSeguro);
router.get('/listaVendedorShopSeguro', adminAuth,Administracao.listaVendedorShopSeguro);
router.get('/listaTornarVendedorShopSeguro', adminAuth,Administracao.listaTornarVendedorShopSeguro);
router.get('/TornarVendedorShopSeguro1/:solicitacao_id', adminAuth,Administracao.TornarVendedorShopSeguro1);
router.post('/Upgrate_for_Vendedor', adminAuth,Administracao.Upgrate_for_Vendedor);
router.get('/CategoriaProdutos', adminAuth,Administracao.CategoriaProdutos);
router.get('/ProdutosActivos', adminAuth,Administracao.ProdutosActivos);
router.get('/ProdutosInativos', adminAuth,Administracao.ProdutosInativos);
router.post('/NovaCategoriaProdutos',adminAuth,foto.single('image'), Administracao.NovaCategoriaProdutos);
router.get('/DeletarCategoria/:categoria_id',adminAuth, Administracao.DeletarCategoria);

//Fim Area ADMIISTRATIVA


//Leasing APK««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
router.post('/LoginLeasing', leasingSeguroController.LoginLeasing);
router.post('/NovoClienteLeasing', leasingSeguroController.NovoCliente);
router.get('/Pacotes', leasingSeguroController.Pacotes);
router.get('/CategoriaPacotes', leasingSeguroController.CategoriaPacotes);
router.get('/Parceiros', leasingSeguroController.Parceiros);
router.get('/CordenadasBancarias/:cliente_id', leasingSeguroController.CordenadasBancarias);




//E-commerce APK««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
router.post('/LoginEcommerce', Ecommerceontroller.LoginE_commerce);
router.post('/NovoClienteEcommerce', Ecommerceontroller.NovoCliente);
router.get('/Categorias', Ecommerceontroller.Categorias);
router.get('/Categoria_Produtos/:categoria_id', Ecommerceontroller.Categoria_Produtos);
router.get('/Categoria/:categoria_id', Ecommerceontroller.Categoria);
router.get('/Produtos', Ecommerceontroller.Produtos);
router.get('/Produto/:produto_id', Ecommerceontroller.Produto);
router.post('/ComprarProduto', Ecommerceontroller.ComprarProduto);
router.post('/Avaliar_produto', Ecommerceontroller.Avaliar_produto);
router.get('/Quantidadades_venda_produto/:produto_id', Ecommerceontroller.Quantidadades_venda_produto);
router.post('/Pesquisa_Dinanica_Gshop', Ecommerceontroller.Pesquisa_Dinanica);
// vendedor
router.post('/TornarVendedorEcomerce',doc.single('arquivo'), Ecommerceontroller.TornarVendedor);
router.post('/RegistarProduto',foto.array('imagens',5), Ecommerceontroller.RegistarProduto);
router.post('/Promocao_produto',foto.array('imagens',6), Ecommerceontroller.Promocao_produto);
router.post('/RegistarImagensProduto',foto.array('imagens'), Ecommerceontroller.RegistarImagensProduto);
//«««««««««««««««««««««««««««««««««««CULTURAL SEGURO APK«««««««««««««««««««««««««««««««««««««««««««««««««««



//GERAL
router.post('/NovaEntidadeCultural', CulturalSeguroController.NovaEntidade);
router.post('/LoginCulturalSeguros', CulturalSeguroController.LoginCulturalSeguros);
router.get('/Pesquisa_Dinanica_Cultural', CulturalSeguroController.Pesquisa_Dinanica);
router.get('/Categorias_Musicas', CulturalSeguroController.Categorias_Musicas);
router.get('/Categorias_Livro', CulturalSeguroController.Categorias_Livro);
router.get('/Categorias_Evento', CulturalSeguroController.Categorias_Evento);
router.get('/categoria_artes_plasticas', CulturalSeguroController.categoria_artes_plasticas);

router.get('/Musicas', CulturalSeguroController.Musicas);
router.get('/Uma_Musica/:id_musica', CulturalSeguroController.Uma_Musica);

router.get('/Livros', CulturalSeguroController.Livros);
router.get('/Um_Livro/:id_livro', CulturalSeguroController.Um_Livro);

router.get('/Artes_plasticas', CulturalSeguroController.Artes_plasticas);
router.get('/Uma_Arte_plastica/:id_artes_plasticas', CulturalSeguroController.Uma_Arte_plastica);

router.get('/Eventos', CulturalSeguroController.Eventos);
router.get('/Um_Evento/:id_evento', CulturalSeguroController.Um_Evento);

router.get('/Musicas_Adquiridas/:id_entidade_adquiriu',CulturalSeguroController.Musicas_Adquiridas)
router.get('/Livros_Adquiridos/:id_entidade_adquiriu',CulturalSeguroController.Livros_Adquiridos)
router.get('/Bilhetes_Eventos_adquiridos/:id_entidade_adquiriu',CulturalSeguroController.Bilhetes_Eventos_adquiridos)
//ESCRITOR
router.post('/Cadastrar_Livro', CulturalSeguroController.Cadastrar_Livro);
//MUSICOS
//ARTISTA PLASTICOS
//ORGANIZADOR DE EVENTOS

module.exports = router;