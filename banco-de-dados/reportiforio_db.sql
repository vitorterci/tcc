-- Script SQL para criação do banco de dados Reportifório
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

-- 3. Tabela de Categorias
CREATE TABLE `categorias` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da categoria',
    `nome` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nome da categoria (único)',
    `descricao` TEXT COMMENT 'Descrição detalhada da categoria'
) COMMENT 'Armazena as categorias para organização dos relatórios';

-- 4. Tabela de Relatórios
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

-- 5. Tabela de Comentários
CREATE TABLE `comentarios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do comentário',
    `relatorio_id` INT NOT NULL COMMENT 'Chave estrangeira para o relatório comentado',
    `usuario_id` INT NOT NULL COMMENT 'Chave estrangeira para o usuário que fez o comentário',
    `comentario` TEXT NOT NULL COMMENT 'Conteúdo do comentário',
    `data` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do comentário',
    FOREIGN KEY (`relatorio_id`) REFERENCES `relatorios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT 'Armazena os comentários feitos nos relatórios';

-- 6. Tabela de Anexos
CREATE TABLE `anexos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do anexo',
    `relatorio_id` INT NOT NULL COMMENT 'Chave estrangeira para o relatório ao qual o anexo pertence',
    `nome_arquivo` VARCHAR(255) NOT NULL COMMENT 'Nome original do arquivo',
    `caminho` VARCHAR(500) NOT NULL COMMENT 'Caminho de armazenamento do arquivo',
    `tipo` VARCHAR(50) COMMENT 'Tipo MIME do arquivo (ex: application/pdf, image/png)',
    `tamanho` INT COMMENT 'Tamanho do arquivo em bytes',
    `data_upload` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do upload do anexo',
    FOREIGN KEY (`relatorio_id`) REFERENCES `relatorios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT 'Armazena informações sobre os arquivos anexados aos relatórios';

-- 7. Tabela de Logs
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

-- 8. Inserts de exemplo

-- Inserir usuários de exemplo
INSERT INTO `usuarios` (`nome`, `email`, `senha`, `cargo`, `foto_perfil`, `ultimo_login`, `status`)
VALUES
    ("Vitor Terci", "vitor.terci@example.com", "$2a$10$abcdefghijklmnopqrstuvwxyza1234567890", "Desenvolvedor", "/assets/img/vitor.png", NOW(), "ativo"),
    ("Andrey Santos", "andrey.santos@example.com", "$2a$10$abcdefghijklmnopqrstuvwxyza1234567890", "Designer", "/assets/img/andrey.png", NOW(), "ativo"),
    ("Paulo Ricardo", "paulo.ricardo@example.com", "$2a$10$abcdefghijklmnopqrstuvwxyza1234567890", "Gerente de Projetos", "/assets/img/paulo.png", NOW(), "ativo");

-- Inserir categorias de exemplo
INSERT INTO `categorias` (`nome`, `descricao`)
VALUES
    ("Financeiro", "Relatórios relacionados a finanças e contabilidade"),
    ("Marketing", "Relatórios de campanhas e análises de mercado"),
    ("Recursos Humanos", "Relatórios sobre pessoal e gestão de talentos");

-- Inserir relatórios de exemplo
INSERT INTO `relatorios` (`titulo`, `descricao`, `conteudo`, `categoria_id`, `usuario_id`, `status`)
VALUES
    ("Análise de Vendas do Último Trimestre", "Relatório detalhado sobre as vendas do último trimestre", "Conteúdo completo da análise de vendas...", 1, 1, "Publicado"),
    ("Campanha de Marketing Digital Q2", "Resultados e métricas da campanha de marketing digital do segundo trimestre", "Conteúdo completo da campanha de marketing...", 2, 2, "Publicado"),
    ("Relatório de Desempenho da Equipe", "Avaliação de desempenho da equipe de desenvolvimento", "Conteúdo completo do relatório de desempenho...", 3, 3, "Rascunho");

-- Inserir comentários de exemplo
INSERT INTO `comentarios` (`relatorio_id`, `usuario_id`, `comentario`)
VALUES
    (1, 2, "Ótima análise, Vitor! Os dados estão bem claros."),
    (1, 3, "Sugiro adicionar uma seção sobre projeções futuras."),
    (2, 1, "Excelente trabalho, Andrey! A campanha superou as expectativas.");

-- Inserir anexos de exemplo
INSERT INTO `anexos` (`relatorio_id`, `nome_arquivo`, `caminho`, `tipo`, `tamanho`)
VALUES
    (1, "vendas_q3.pdf", "/uploads/relatorios/vendas_q3.pdf", "application/pdf", 102400),
    (2, "metricas_marketing.xlsx", "/uploads/relatorios/metricas_marketing.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 51200);

-- Inserir logs de exemplo
INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`, `ip`)
VALUES
    (1, "login", "Usuário Vitor Terci logou no sistema", "192.168.1.100"),
    (1, "criar_relatorio", "Usuário Vitor Terci criou o relatório \"Análise de Vendas do Último Trimestre\"", "192.168.1.100"),
    (2, "editar_relatorio", "Usuário Andrey Santos editou o relatório \"Campanha de Marketing Digital Q2\"", "192.168.1.101");

-- 9. Views úteis

-- View para relatórios publicados
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

-- View para histórico de atividades dos usuários
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

-- 10. Procedures

DELIMITER //

-- Procedure para cadastrar um novo relatório
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

-- Procedure para atualizar um relatório existente
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

-- 11. Triggers

-- Trigger para registrar log após a inserção de um novo relatório
DELIMITER //
CREATE TRIGGER `after_insert_relatorio`
AFTER INSERT ON `relatorios`
FOR EACH ROW
BEGIN
    INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`)
    VALUES (NEW.usuario_id, "criar_relatorio", CONCAT("Relatório \"", NEW.titulo, "\" (ID: ", NEW.id, ") criado."));
END //
DELIMITER ;

-- Trigger para registrar log após a atualização de um relatório
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

-- Trigger para registrar log após a exclusão de um relatório
DELIMITER //
CREATE TRIGGER `after_delete_relatorio`
AFTER DELETE ON `relatorios`
FOR EACH ROW
BEGIN
    INSERT INTO `logs` (`usuario_id`, `acao`, `descricao`)
    VALUES (OLD.usuario_id, "excluir_relatorio", CONCAT("Relatório \"", OLD.titulo, "\" (ID: ", OLD.id, ") excluído."));
END //
DELIMITER ;

-- Trigger para registrar log após o login de um usuário (exemplo, a lógica de login real estaria na aplicação)
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
