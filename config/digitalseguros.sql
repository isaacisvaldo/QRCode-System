-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Fev-2023 às 15:25
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `digitalseguros`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `actividades`
--

CREATE TABLE `actividades` (
  `idActividade` int(10) UNSIGNED NOT NULL,
  `detalhes` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `estado_atividade` int(11) NOT NULL DEFAULT 0,
  `cliente_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `actividades`
--

INSERT INTO `actividades` (`idActividade`, `detalhes`, `data`, `estado_atividade`, `cliente_id`) VALUES
(1, 'Iniciou Sessao No Apk Leasing', '2023-02-01 15:24:57', 0, 1),
(2, 'Iniciou Sessao No Apk Leasing', '2023-02-01 15:24:59', 0, 1),
(3, 'Iniciou Sessao No Apk Leasing', '2023-02-01 15:25:01', 0, 1),
(4, 'Iniciou Sessao No Apk Leasing', '2023-02-01 15:25:01', 0, 1),
(5, 'Iniciou Sessao No Apk Leasing', '2023-02-01 15:25:02', 0, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nif` varchar(255) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nif` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `municipio` varchar(255) NOT NULL,
  `cod` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `estado` int(11) NOT NULL,
  `data_Criacao` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `acesso_Leasing` int(11) NOT NULL DEFAULT 0,
  `acesso_Ecommerce` int(11) NOT NULL DEFAULT 0,
  `acesso_Cultural` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`idCliente`, `image`, `username`, `nome`, `email`, `telefone`, `senha`, `nif`, `provincia`, `municipio`, `cod`, `endereco`, `estado`, `data_Criacao`, `acesso_Leasing`, `acesso_Ecommerce`, `acesso_Cultural`) VALUES
(1, 'user.png', 'gelson@', 'Gelson Mesquita', 'iam@gmail.com', '930883042', '$2a$10$ROxPD8meLhGdG8snKDCjxuJmw7hN57Txwys2lziXL1yjE0knGE3t6', '123486789LA124', 'luanda', 'Belas', '123456;', 'Ndoze', 1, '2023-02-01 15:24:45', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `coordenador`
--

CREATE TABLE `coordenador` (
  `idCoordenador` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nif` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `municipio` varchar(255) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `feedbaks`
--

CREATE TABLE `feedbaks` (
  `idFeedbak` int(10) UNSIGNED NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `horaFeedbak` varchar(255) NOT NULL,
  `dataFeedbak` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `estadoFeedbak` int(11) NOT NULL,
  `cliente_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `inscritos`
--

CREATE TABLE `inscritos` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` int(11) NOT NULL,
  `data` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20230129122142_\'create_admin\'.js', 1, '2023-02-01 14:05:53'),
(2, '20230130112410_clientes.js', 1, '2023-02-01 14:05:53'),
(3, '20230130115055_feedbaks.js', 2, '2023-02-01 14:06:43'),
(4, '20230201121155_tornar_investidor.js', 3, '2023-02-01 14:07:55'),
(5, '20230201113706_create_leasing.js', 4, '2023-02-01 14:09:03'),
(6, '20230201115738_informacoes_trabalho.js', 5, '2023-02-01 14:13:57'),
(7, '20230201120547_create_investimento.js', 6, '2023-02-01 14:14:50'),
(8, '20230130122702_visitantes.js', 7, '2023-02-01 14:16:07'),
(9, '20230201111150_saldo_contabilizado.js', 7, '2023-02-01 14:16:07'),
(10, '20230201114602_cordenadas_bancarias.js', 7, '2023-02-01 14:16:07'),
(11, '20230130134337_actividades.js', 8, '2023-02-01 14:18:18'),
(12, '20230130135730_create_coordenador.js', 8, '2023-02-01 14:18:18'),
(13, '20230131173012_categoria_pacotes.js', 8, '2023-02-01 14:18:18'),
(14, '20230131180224_parceiro_financeiro.js', 8, '2023-02-01 14:18:18'),
(15, '20230130131308_pacotes.js', 9, '2023-02-01 14:20:48'),
(16, '20230130132224_meus_pacotes.js', 10, '2023-02-01 14:22:42'),
(17, '20230130133507_inscritos.js', 10, '2023-02-01 14:22:42'),
(18, '20230130121708_parceiro.js', 11, '2023-02-01 14:23:19'),
(19, '20230130125107_solicitacao.js', 11, '2023-02-01 14:23:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `meus_pacotes`
--

CREATE TABLE `meus_pacotes` (
  `idMeupacote` int(10) UNSIGNED NOT NULL,
  `saldoatual` int(11) NOT NULL,
  `validade` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 0,
  `cliente_id` int(10) UNSIGNED DEFAULT NULL,
  `pacote_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pacotes`
--

CREATE TABLE `pacotes` (
  `idPacote` int(10) UNSIGNED NOT NULL,
  `quantia_Disponivel` int(11) NOT NULL,
  `nome_Pacote` varchar(255) NOT NULL,
  `informacao_Pacote` varchar(255) NOT NULL,
  `data_criacao` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `estado_Pacote` int(11) NOT NULL DEFAULT 0,
  `categoria_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `parceiros`
--

CREATE TABLE `parceiros` (
  `idParceiro` int(10) UNSIGNED NOT NULL,
  `imageParceiro` varchar(255) NOT NULL,
  `nomeParceiro` varchar(255) NOT NULL,
  `emailParceiro` varchar(255) NOT NULL,
  `telefoneParceiro` varchar(255) NOT NULL,
  `estadoParceiro` int(11) NOT NULL,
  `senhaParceiro` varchar(255) NOT NULL,
  `tipoParceria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitacao`
--

CREATE TABLE `solicitacao` (
  `idSolicitacao` int(10) UNSIGNED NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `assunto` varchar(255) NOT NULL,
  `mensagen` text NOT NULL,
  `data` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `visitantes`
--

CREATE TABLE `visitantes` (
  `idVisitante` int(10) UNSIGNED NOT NULL,
  `lat` float(8,2) NOT NULL,
  `lng` float(8,2) NOT NULL,
  `estadoVisitante` int(11) NOT NULL,
  `dataVisita` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `visitantes`
--

INSERT INTO `visitantes` (`idVisitante`, `lat`, `lng`, `estadoVisitante`, `dataVisita`) VALUES
(1, 88888.00, 6667.00, 0, '2023-02-01 15:23:41');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`idActividade`),
  ADD KEY `actividades_cliente_id_foreign` (`cliente_id`);

--
-- Índices para tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Índices para tabela `coordenador`
--
ALTER TABLE `coordenador`
  ADD PRIMARY KEY (`idCoordenador`);

--
-- Índices para tabela `feedbaks`
--
ALTER TABLE `feedbaks`
  ADD PRIMARY KEY (`idFeedbak`),
  ADD KEY `feedbaks_cliente_id_foreign` (`cliente_id`);

--
-- Índices para tabela `inscritos`
--
ALTER TABLE `inscritos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Índices para tabela `meus_pacotes`
--
ALTER TABLE `meus_pacotes`
  ADD PRIMARY KEY (`idMeupacote`),
  ADD KEY `meus_pacotes_cliente_id_foreign` (`cliente_id`),
  ADD KEY `meus_pacotes_pacote_id_foreign` (`pacote_id`);

--
-- Índices para tabela `pacotes`
--
ALTER TABLE `pacotes`
  ADD PRIMARY KEY (`idPacote`),
  ADD KEY `pacotes_categoria_id_foreign` (`categoria_id`);

--
-- Índices para tabela `parceiros`
--
ALTER TABLE `parceiros`
  ADD PRIMARY KEY (`idParceiro`);

--
-- Índices para tabela `solicitacao`
--
ALTER TABLE `solicitacao`
  ADD PRIMARY KEY (`idSolicitacao`);

--
-- Índices para tabela `visitantes`
--
ALTER TABLE `visitantes`
  ADD PRIMARY KEY (`idVisitante`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `actividades`
--
ALTER TABLE `actividades`
  MODIFY `idActividade` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `coordenador`
--
ALTER TABLE `coordenador`
  MODIFY `idCoordenador` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `feedbaks`
--
ALTER TABLE `feedbaks`
  MODIFY `idFeedbak` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `inscritos`
--
ALTER TABLE `inscritos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `meus_pacotes`
--
ALTER TABLE `meus_pacotes`
  MODIFY `idMeupacote` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pacotes`
--
ALTER TABLE `pacotes`
  MODIFY `idPacote` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `parceiros`
--
ALTER TABLE `parceiros`
  MODIFY `idParceiro` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `solicitacao`
--
ALTER TABLE `solicitacao`
  MODIFY `idSolicitacao` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `visitantes`
--
ALTER TABLE `visitantes`
  MODIFY `idVisitante` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `feedbaks`
--
ALTER TABLE `feedbaks`
  ADD CONSTRAINT `feedbaks_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `meus_pacotes`
--
ALTER TABLE `meus_pacotes`
  ADD CONSTRAINT `meus_pacotes_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `meus_pacotes_pacote_id_foreign` FOREIGN KEY (`pacote_id`) REFERENCES `pacotes` (`idPacote`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `pacotes`
--
ALTER TABLE `pacotes`
  ADD CONSTRAINT `pacotes_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_pacotes` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
