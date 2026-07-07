-- Script SQL para criação do banco de dados Reportifório e Jogos
-- Desenvolvido para o projeto TCC

-- 1. Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `reportiforio`;
USE `reportiforio`;

-- 2. Tabela de Usuários
CREATE TABLE `usuarios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do usuário',
    `nome` VARCHAR(255) NOT NULL COMMENT 'Nome completo do usuário',
    `email` VARCHAR(255) NOT NULL UNIQUE COMMENT 'Endereço de e-mail do usuário (único)',
    `senha` VARCHAR(255) NOT NULL COMMENT 'Senha do usuário (hash)',
    `cargo` VARCHAR(100) COMMENT 'Cargo ou função do usuário',
    `foto_perfil` VARCHAR(255) COMMENT 'Caminho para a foto de perfil do usuário',
    `data_cadastro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do cadastro do usuário',
    `ultimo_login` TIMESTAMP NULL COMMENT 'Data e hora do último login do usuário',
    `status` ENUM('ativo', 'inativo', 'bloqueado') DEFAULT 'ativo' COMMENT 'Status atual do usuário'
) COMMENT 'Armazena informações sobre os usuários do sistema';

-- 3. Tabela de Jogos
CREATE TABLE `jogos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do jogo',
    `nome` VARCHAR(255) NOT NULL COMMENT 'Nome do jogo',
    `categoria` VARCHAR(100) COMMENT 'Categoria do jogo (ex: indie, ação)',
    `plataforma` VARCHAR(100) COMMENT 'Plataforma do jogo (ex: pc, ps5, xbox, switch, mobile)',
    `genero` VARCHAR(100) COMMENT 'Gênero do jogo (ex: sandbox, estratégia, rpg)',
    `img` VARCHAR(500) COMMENT 'URL da imagem de capa do jogo',
    `etaria` VARCHAR(10) COMMENT 'Classificação etária do jogo (ex: L, 10, 12, 14, 16, 18)',
    `descricao` TEXT COMMENT 'Descrição detalhada do jogo',
    `status` ENUM('Disponível', 'Em breve', 'Indisponível') DEFAULT 'Disponível' COMMENT 'Status de disponibilidade do jogo',
    `ano` VARCHAR(4) COMMENT 'Ano de lançamento do jogo',
    `preco` DECIMAL(10, 2) COMMENT 'Preço do jogo'
) COMMENT 'Armazena informações sobre os jogos disponíveis';

-- 4. Tabela de Categorias (mantida do original, se necessário para relatórios)
CREATE TABLE `categorias` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da categoria',
    `nome` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nome da categoria (único)',
    `descricao` TEXT COMMENT 'Descrição detalhada da categoria'
) COMMENT 'Armazena as categorias para organização dos relatórios';

-- 5. Tabela de Relatórios (mantida do original)
CREATE TABLE `relatorios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do relatório',
    `titulo` VARCHAR(255) NOT NULL COMMENT 'Título do relatório',
    `descricao` TEXT COMMENT 'Breve descrição do relatório',
    `conteudo` LONGTEXT COMMENT 'Conteúdo completo do relatório',
    `categoria_id` INT NOT NULL COMMENT 'Chave estrangeira para a tabela de categorias',
    `usuario_id` INT NOT NULL COMMENT 'Chave estrangeira para a tabela de usuários (autor do relatório)',
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora da criação do relatório',
    `data_atualizacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização do relatório',
    `status` ENUM('Rascunho', 'Publicado', 'Arquivado') DEFAULT 'Rascunho' COMMENT 'Status atual do relatório',
    FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT 'Armazena os relatórios criados pelos usuários';

-- 6. Tabela de Comentários (mantida do original)
CREATE TABLE `comentarios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do comentário',
    `relatorio_id` INT NOT NULL COMMENT 'Chave estrangeira para o relatório comentado',
    `usuario_id` INT NOT NULL COMMENT 'Chave estrangeira para o usuário que fez o comentário',
    `comentario` TEXT NOT NULL COMMENT 'Conteúdo do comentário',
    `data` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do comentário',
    FOREIGN KEY (`relatorio_id`) REFERENCES `relatorios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT 'Armazena os comentários feitos nos relatórios';

-- 7. Tabela de Anexos (mantida do original)
CREATE TABLE `anexos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do anexo',
    `relatorio_id` INT NOT NULL COMMENT 'Chave estrangeira para o relatório ao qual o anexo pertence',
    `nome_arquivo` VARCHAR(255) NOT NULL COMMENT 'Nome original do arquivo',
    `caminho` VARCHAR(500) NOT NULL COMMENT 'Caminho de armazenamento do arquivo',
    `tipo` VARCHAR(100) COMMENT 'Tipo MIME do arquivo (ex: application/pdf, image/png)',
    `tamanho` INT COMMENT 'Tamanho do arquivo em bytes',
    `data_upload` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do upload do anexo',
    FOREIGN KEY (`relatorio_id`) REFERENCES `relatorios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT 'Armazena informações sobre os arquivos anexados aos relatórios';

-- 8. Tabela de Logs (mantida do original)
CREATE TABLE `logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do registro de log',
    `usuario_id` INT COMMENT 'Chave estrangeira para o usuário que realizou a ação (pode ser NULL para ações do sistema)',
    `acao` VARCHAR(100) NOT NULL COMMENT 'Tipo de ação realizada (ex: criar_relatorio, editar_usuario, login)',
    `descricao` TEXT COMMENT 'Descrição detalhada da ação',
    `ip` VARCHAR(45) COMMENT 'Endereço IP de onde a ação foi realizada',
    `data` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora da ação',
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT 'Registra todas as ações importantes realizadas no sistema';

-- Índices adicionais para otimização de consultas
CREATE INDEX `idx_relatorios_usuario_id` ON `relatorios` (`usuario_id`);
CREATE INDEX `idx_relatorios_categoria_id` ON `relatorios` (`categoria_id`);
CREATE INDEX `idx_comentarios_relatorio_id` ON `comentarios` (`relatorio_id`);
CREATE INDEX `idx_comentarios_usuario_id` ON `comentarios` (`usuario_id`);
CREATE INDEX `idx_anexos_relatorio_id` ON `anexos` (`relatorio_id`);
CREATE INDEX `idx_logs_usuario_id` ON `logs` (`usuario_id`);
CREATE INDEX `idx_logs_acao` ON `logs` (`acao`);

-- Inserts de exemplo para usuários (mantidos do original)
INSERT INTO `usuarios` (`nome`, `email`, `senha`, `cargo`, `foto_perfil`, `ultimo_login`, `status`)
VALUES
    ("Vitor Terci", "vitor.terci@example.com", "$2a$10$abcdefghijklmnopqrstuvwxyza1234567890", "Desenvolvedor", "/assets/img/vitor.png", NOW(), "ativo"),
    ("Andrey Santos", "andrey.santos@example.com", "$2a$10$abcdefghijklmnopqrstuvwxyza1234567890", "Designer", "/assets/img/andrey.png", NOW(), "ativo"),
    ("Paulo Ricardo", "paulo.ricardo@example.com", "$2a$10$abcdefghijklmnopqrstuvwxyza1234567890", "Gerente de Projetos", "/assets/img/paulo.png", NOW(), "ativo");

-- Inserts de exemplo para jogos (baseado em assets/js/home.js)
INSERT INTO `jogos` (`nome`, `categoria`, `plataforma`, `genero`, `img`, `etaria`, `descricao`, `status`, `ano`, `preco`)
VALUES
    ('Minecraft', 'indie', 'pc', 'sandbox', 'https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6ee32ee51b7aa5df0a674cb1dd5564173b8403cd1fe49f606a7bca981a435a0298c0e277b3e347d804e1fd8f174238ecbabc0c67f9a4782a8581638776010f023d', 'L', 'Um jogo de sandbox 3D onde você pode construir, explorar e sobreviver em mundos infinitos.', 'Disponível', '2011', 99.90),
    ('The Escapists', 'estratégia', 'pc', 'estratégia', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/4667cfa4-c112-5fc6-b1d1-cbe7296263eb/6efae07d-89a5-523e-a5bc-14061fbec762.jpg', '12', 'Um jogo de estratégia onde você planeja e executa fugas de prisões de segurança máxima.', 'Disponível', '2015', 49.90),
    ('Graveyard Keeper', 'indie', 'pc', 'simulação', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/90c33e3c-d87d-53a5-9b68-0867a7cb183a/08ff30ba-7935-5672-9aa3-bad3e2c747b4.jpg', '10', 'Um simulador de gerenciamento de cemitério com um toque de humor negro.', 'Disponível', '2018', 39.90),
    ('Towerborne', 'ação', 'xbox', 'ação', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/5734a2c4-a123-51ba-858d-fc6d6e14aee0/01a84265-e09c-5682-92ce-681c89a1afe2.jpg', '14', 'Um jogo de ação e aventura cooperativo em um mundo de fantasia.', 'Em breve', '2024', 199.90),
    ('Hades', 'roguelike', 'pc', 'roguelike', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/eb1817ed-c2a4-52ff-a973-8135cde6f11c/538ec15a-e39d-5044-a27e-87a3634539c4.jpg', '16', 'Um jogo roguelike de ação aclamado pela crítica, ambientado no submundo grego.', 'Disponível', '2020', 129.90),
    ('Stardew Valley', 'indie', 'pc', 'simulação', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/4c0c8a41-9b2a-5a16-9e23-4e8f377de3e5/2c8cafd4-f8ab-52f1-81ab-44c99cf03f5f.jpg', 'L', 'Um jogo de simulação de fazenda com elementos de RPG e exploração.', 'Disponível', '2016', 29.99),
    ('Elden Ring', 'rpg', 'ps5', 'ação', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/eb1817ed-c2a4-52ff-a973-8135cde6f11c/538ec15a-e39d-5044-a27e-87a3634539c4.jpg', '18', 'Um RPG de ação em mundo aberto desenvolvido pela FromSoftware.', 'Disponível', '2022', 299.90),
    ('Baldur\'s Gate 3', 'rpg', 'pc', 'rpg', 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/5734a2c4-a123-51ba-858d-fc6d6e14aee0/01a84265-e09c-5682-92ce-681c89a1afe2.jpg', '16', 'Um RPG épico baseado no universo de Dungeons & Dragons.', 'Disponível', '2023', 299.90),
    ('Stellar Blade', 'ação', 'ps5', 'ação', 'https://gmedia.playstation.com/is/image/SIEPDC/stellar-blade-hero-banner-desktop-01-en-12jan24?$1600px$', '18', 'Um jogo de ação e aventura frenético com visuais deslumbrantes no PS5.', 'Disponível', '2024', 349.90),
    ('Metaphor: ReFantazio', 'rpg', 'pc', 'rpg', 'https://metaphor.atlus.com/img/share.jpg', '14', 'Um novo RPG de fantasia épica dos criadores de Persona.', 'Disponível', '2024', 299.00),
    ('EA Sports CF 25', 'esporte', 'ps5', 'esporte', 'https://media.rawg.io/media/games/0bd/0bd564a39bc6275812e987747814639b.jpg', 'L', 'O retorno triunfante do futebol americano universitário aos consoles.', 'Disponível', '2024', 349.90),
    ('Black Myth: Wukong', 'ação', 'pc', 'ação', 'https://media.rawg.io/media/games/60e/60ee69389334547b6781254687a4128b.jpg', '16', 'RPG de ação baseado na mitologia chinesa \'Jornada ao Oeste\'.', 'Disponível', '2024', 229.00),
    ('Helldivers 2', 'ação', 'pc', 'ação', 'https://media.rawg.io/media/games/90b/90b9308269666014494a8e25048b3764.jpg', '18', 'Lute pela liberdade em uma galáxia hostil neste shooter cooperativo.', 'Disponível', '2024', 199.50),
    ('Tekken 8', 'ação', 'ps5', 'ação', 'https://media.rawg.io/media/games/f66/f663475f46487922d0590135898516e8.jpg', '14', 'O próximo capítulo da lendária franquia de jogos de luta.', 'Disponível', '2024', 349.90),
    ('Dragon\'s Dogma 2', 'rpg', 'pc', 'rpg', 'https://media.rawg.io/media/games/33d/33d73516087968516f461e8927878696.jpg', '18', 'Uma jornada épica em um mundo de fantasia rico e detalhado.', 'Disponível', '2024', 299.00),
    ('Final Fantasy VII Rebirth', 'rpg', 'ps5', 'rpg', 'https://media.rawg.io/media/games/287/2872161492061033621f379237649553.jpg', '14', 'A continuação da épica releitura de Final Fantasy VII.', 'Disponível', '2024', 349.90),
    ('Balatro', 'indie', 'pc', 'roguelike', 'https://media.rawg.io/media/games/0bd/0bd564a39bc6275812e987747814639b.jpg', 'L', 'Um roguelike de poker hipnótico e extremamente viciante.', 'Disponível', '2024', 44.99),
    ('Zelda: Echoes of Wisdom', 'aventura', 'switch', 'ação', 'https://media.rawg.io/media/games/7c4/7c448208955140e9409895f3295f9c4f.jpg', 'L', 'Desta vez, Zelda assume o papel principal para salvar Hyrule.', 'Disponível', '2024', 299.00),
    ('Silent Hill 2', 'terror', 'pc', 'terror', 'https://media.rawg.io/media/games/60e/60ee69389334547b6781254687a4128b.jpg', '18', 'O remake aclamado do clássico de terror psicológico.', 'Disponível', '2024', 349.50),
    ('Animal Crossing', 'indie', 'switch', 'simulação', 'https://media.rawg.io/media/games/858/85847668637777777777777777777777.jpg', 'L', 'Crie seu próprio paraíso em uma ilha deserta.', 'Disponível', '2020', 299.00),
    ('Cyberpunk 2077', 'rpg', 'pc', 'rpg', 'https://media.rawg.io/media/games/26d/26d4437715bee6013893a79560309990.jpg', '18', 'Um RPG de ação em mundo aberto ambientado na futurista Night City.', 'Disponível', '2020', 199.90),
    ('God of War Ragnarök', 'ação', 'ps5', 'ação', 'https://media.rawg.io/media/games/709/709bf53f557babc90b7132a6771099c2.jpg', '18', 'Kratos e Atreus devem viajar pelos nove reinos em busca de respostas.', 'Disponível', '2022', 299.90),
    ('Forza Horizon 5', 'esporte', 'xbox', 'esporte', 'https://media.rawg.io/media/games/082/082365507c0422401a91e0ba83210f30.jpg', 'L', 'Sua aventura definitiva no Horizon espera por você nas paisagens do México.', 'Disponível', '2021', 249.00),
    ('Sea of Thieves', 'multiplayer', 'xbox', 'ação', 'https://media.rawg.io/media/games/da1/da1b267761b77274020950348744576c.jpg', '12', 'Seja o pirata que você sempre quis ser neste jogo de aventura em mundo compartilhado.', 'Disponível', '2018', 149.00),
    ('It Takes Two', 'aventura', 'pc', 'ação', 'https://media.rawg.io/media/games/5eb/5eb49302c5c39b36c05156a090cbccd0.jpg', '12', 'Uma aventura cooperativa inovadora e emocionante.', 'Disponível', '2021', 199.00),
    ('Genshin Impact', 'rpg', 'mobile', 'rpg', 'https://media.rawg.io/media/games/d03/d030347839f7466ad90a947367460a72.jpg', '12', 'Um RPG de ação em mundo aberto gratuito com um vasto mundo de fantasia.', 'Disponível', '2020', 0.00),
    ('Among Us', 'multiplayer', 'mobile', 'social', 'https://media.rawg.io/media/games/e74/e7445c45df4057604a87c38300302839.jpg', 'L', 'Um jogo de trabalho em equipe e traição no espaço.', 'Disponível', '2018', 0.00),
    ('Resident Evil Village', 'terror', 'ps5', 'terror', 'https://media.rawg.io/media/games/c05/c05359670081e626e386057283626786.jpg', '18', 'Experimente o horror de sobrevivência como nunca antes no oitavo capítulo principal.', 'Disponível', '2021', 179.90),
    ('Hollow Knight', 'indie', 'pc', 'ação', 'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590c61f2216508f7f6c3.jpg', '10', 'Uma aventura épica em um vasto reino em ruínas de insetos e heróis.', 'Disponível', '2017', 27.99),
    ('Spider-Man 2', 'ação', 'ps5', 'ação', 'https://media.rawg.io/media/games/214/2143f71da0590135898516e8.jpg', '12', 'Peter Parker e Miles Morales enfrentam o vilão Venom em Nova York.', 'Disponível', '2023', 349.90),
    ('Starfield', 'rpg', 'xbox', 'rpg', 'https://media.rawg.io/media/games/5ec/5ec769389334547b6781254687a4128b.jpg', '14', 'O primeiro novo universo em 25 anos da Bethesda Game Studios.', 'Disponível', '2023', 299.00),
    ('Alan Wake 2', 'terror', 'pc', 'terror', 'https://media.rawg.io/media/games/618/618c201492061033621f379237649553.jpg', '18', 'Um horror psicológico envolvente que continua a história do escritor Alan Wake.', 'Disponível', '2023', 220.00),
    ('Cuphead', 'indie', 'switch', 'ação', 'https://media.rawg.io/media/games/225/225f7f1850590c61f2216508f7f6c3.jpg', 'L', 'Um jogo de ação clássico focado em batalhas de chefes com estilo de desenho animado.', 'Disponível', '2017', 36.99),
    ('Grand Theft Auto V', 'ação', 'pc', 'ação', 'https://media.rawg.io/media/games/b11/b1155a3f557babc90b7132a6771099c2.jpg', '18', 'Um jovem ladrão, um assaltante de bancos e um psicopata aterrorizante.', 'Disponível', '2013', 69.90),
    ('Valorant', 'multiplayer', 'pc', 'ação', 'https://media.rawg.io/media/games/93e/93e69389334547b6781254687a4128b.jpg', '14', 'Um jogo de tiro tático 5v5 baseado em personagens ambientado em um futuro próximo.', 'Disponível', '2020', 0.00);

-- Inserts de exemplo para categorias (mantidos do original)
INSERT INTO `categorias` (`nome`, `descricao`)
VALUES
    ("Financeiro", "Relatórios relacionados a finanças e contabilidade"),
    ("Marketing", "Relatórios de campanhas e análises de mercado"),
    ("Recursos Humanos", "Relatórios sobre pessoal e gestão de talentos");

-- Inserts de exemplo para relatórios (mantidos do original)
INSERT INTO `relatorios` (`titulo`, `descricao`, `conteudo`, `categoria_id`, `usuario_id`, `status`)
VALUES
    ("Análise de Vendas do Último Trimestre", "Relatório detalhado sobre as vendas do último trimestre", "Conteúdo completo da análise de vendas...", 1, 1, "Publicado"),
    ("Campanha de Marketing Digital Q2", "Resultados e métricas da campanha de marketing digital do segundo trimestre", "Conteúdo completo da campanha de marketing...", 2, 2, "Publicado"),
    ("Relatório de Desempenho da Equipe", "Avaliação de desempenho da equipe de desenvolvimento", "Conteúdo completo do relatório de desempenho...", 3, 3, "Rascunho");

-- Inserts de exemplo para comentários (mantidos do original)
INSERT INTO `comentarios` (`relatorio_id`, `usuario_id`, `comentario`)
VALUES
    (1, 2, "Ótima análise, Vitor! Os dados estão bem claros."),
    (1, 3, "Sugiro adicionar uma seção sobre projeções futuras."),
    (2, 1, "Excelente trabalho, Andrey! A campanha superou as expectativas.");

-- Inserts de exemplo para anexos (mantidos do original)
INSERT INTO `anexos` (`relatorio_id`, `nome_arquivo`, `caminho`, `tipo`, `tamanho`)
VALUES
    (1, "vendas_q3.pdf", "/uploads/relatorios/vendas_q3.pdf", "application/pdf", 102400),
    (2, "metricas_marketing.xlsx", "/uploads/relatorios/metricas_marketing.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 51200);

-- Inserts de exemplo para logs (mantidos do original)
INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`, `ip`)
VALUES
    (1, "login", "Usuário Vitor Terci logou no sistema", "192.168.1.100"),
    (1, "criar_relatorio", "Usuário Vitor Terci criou o relatório \"Análise de Vendas do Último Trimestre\"", "192.168.1.100"),
    (2, "editar_relatorio", "Usuário Andrey Santos editou o relatório \"Campanha de Marketing Digital Q2\"", "192.168.1.101");

-- Views úteis (mantidas do original)

CREATE VIEW `relatorios_publicados` AS
SELECT
    r.id AS relatorio_id,
    r.titulo,
    r.descricao,
    r.data_criacao,
    r.data_atualizacao,
    u.nome AS autor,
    c.nome AS categoria
FROM
    `relatorios` r
JOIN
    `usuarios` u ON r.usuario_id = u.id
JOIN
    `categorias` c ON r.categoria_id = c.id
WHERE
    r.status = "Publicado";

CREATE VIEW `historico_usuarios` AS
SELECT
    l.data AS data_acao,
    u.nome AS usuario,
    l.acao,
    l.descricao,
    l.ip
FROM
    `logs` l
LEFT JOIN
    `usuarios` u ON l.usuario_id = u.id
ORDER BY
    l.data DESC;

-- Procedures (mantidas do original)

DELIMITER //

CREATE PROCEDURE `cadastrar_relatorio`(
    IN p_titulo VARCHAR(255),
    IN p_descricao TEXT,
    IN p_conteudo LONGTEXT,
    IN p_categoria_id INT,
    IN p_usuario_id INT,
    IN p_status ENUM("Rascunho", "Publicado", "Arquivado")
)
BEGIN
    INSERT INTO `relatorios` (`titulo`, `descricao`, `conteudo`, `categoria_id`, `usuario_id`, `status`)
    VALUES (p_titulo, p_descricao, p_conteudo, p_categoria_id, p_usuario_id, p_status);
END //

CREATE PROCEDURE `atualizar_relatorio`(
    IN p_relatorio_id INT,
    IN p_titulo VARCHAR(255),
    IN p_descricao TEXT,
    IN p_conteudo LONGTEXT,
    IN p_categoria_id INT,
    IN p_status ENUM("Rascunho", "Publicado", "Arquivado")
)
BEGIN
    UPDATE `relatorios`
    SET
        `titulo` = p_titulo,
        `descricao` = p_descricao,
        `conteudo` = p_conteudo,
        `categoria_id` = p_categoria_id,
        `status` = p_status
    WHERE
        `id` = p_relatorio_id;
END //

DELIMITER ;

-- Triggers (mantidas do original)

DELIMITER //
CREATE TRIGGER `after_insert_relatorio`
AFTER INSERT ON `relatorios`
FOR EACH ROW
BEGIN
    INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`)
    VALUES (NEW.usuario_id, "criar_relatorio", CONCAT("Relatório \"", NEW.titulo, "\" (ID: ", NEW.id, ") criado."));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER `after_update_relatorio`
AFTER UPDATE ON `relatorios`
FOR EACH ROW
BEGIN
    IF OLD.titulo <> NEW.titulo OR OLD.descricao <> NEW.descricao OR OLD.status <> NEW.status THEN
        INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`)
        VALUES (NEW.usuario_id, "atualizar_relatorio", CONCAT("Relatório \"", NEW.titulo, "\" (ID: ", NEW.id, ") atualizado."));
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER `after_delete_relatorio`
AFTER DELETE ON `relatorios`
FOR EACH ROW
BEGIN
    INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`)
    VALUES (OLD.usuario_id, "excluir_relatorio", CONCAT("Relatório \"", OLD.titulo, "\" (ID: ", OLD.id, ") excluído."));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER `after_update_ultimo_login`
AFTER UPDATE ON `usuarios`
FOR EACH ROW
BEGIN
    IF OLD.ultimo_login IS NULL OR OLD.ultimo_login <> NEW.ultimo_login THEN
        INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`)
        VALUES (NEW.id, "login", CONCAT("Usuário \"", NEW.nome, "\" (ID: ", NEW.id, ") realizou login."));
    END IF;
END //
DELIMITER ;
