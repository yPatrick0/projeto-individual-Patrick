-- ============================================================
-- MEMÓRIAS DE AVENTURA - script do banco de dados (versão 2)
-- Projeto Individual · Patrick Scaglia Rodrigues · SPTech 2026.2
--
-- Modelo lógico (3 tabelas):
--   usuario  (1) ----< (N) partida
--   mensagem (1) ----< (N) partida
--
--   Um usuário pode jogar várias partidas.
--   Uma mensagem de episódio pode ser recebida em várias partidas.
--   Cada partida guarda quem jogou (fk_usuario) e qual mensagem
--   apareceu no fim (fk_mensagem).
--   fk_usuario pode ficar NULL enquanto o login não estiver
--   integrado: a partida é anônima.
--
-- Rode este arquivo inteiro no MySQL da VM Linux (Workbench ou terminal).
-- Se você já rodou a versão anterior (2 tabelas), apague o banco antes:
--   DROP DATABASE memorias_aventura;
-- ============================================================

CREATE DATABASE IF NOT EXISTS memorias_aventura;
USE memorias_aventura;

-- ------------------------------------------------------------
-- TABELA usuario: quem se cadastra no site
-- ------------------------------------------------------------
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- TABELA mensagem: os episódios e as lições mostradas no fim dos jogos
--   frase fica NULL quando a fala da série ainda não foi conferida.
--   Os ids são os mesmos do vetor em public/js/mensagens-episodios.js.
-- ------------------------------------------------------------
CREATE TABLE mensagem (
    id INT PRIMARY KEY,
    personagem VARCHAR(80) NOT NULL,
    episodio VARCHAR(60) NOT NULL,
    temporada INT NOT NULL,
    numero_episodio INT NOT NULL,
    frase VARCHAR(200),
    licao VARCHAR(200) NOT NULL
);

-- ------------------------------------------------------------
-- TABELA partida: o resultado de cada jogo terminado
--   jogo = 'memoria'   -> usa tentativas e pares_encontrados
--   jogo = 'sequencia' -> usa rodadas_concluidas e erros
--   venceu = 1 (terminou o jogo) ou 0 (acabaram as vidas)
-- ------------------------------------------------------------
CREATE TABLE partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    jogo VARCHAR(20) NOT NULL,
    venceu TINYINT NOT NULL,
    tentativas INT,
    pares_encontrados INT,
    rodadas_concluidas INT,
    erros INT NOT NULL DEFAULT 0,
    duracao_segundos INT NOT NULL,
    dt_partida DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NULL,
    fk_mensagem INT NULL,
    CONSTRAINT fk_partida_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    CONSTRAINT fk_partida_mensagem FOREIGN KEY (fk_mensagem) REFERENCES mensagem(id),
    CONSTRAINT chk_partida_jogo CHECK (jogo IN ('memoria', 'sequencia')),
    CONSTRAINT chk_partida_venceu CHECK (venceu IN (0, 1))
);

-- ------------------------------------------------------------
-- MENSAGENS DOS EPISÓDIOS (conteúdo do site, não é teste)
-- Lições = interpretação do autor. Falas: Puhoy (informada pelo
-- autor, dublagem) e His Hero (tradução livre).
-- ------------------------------------------------------------
INSERT INTO mensagem (id, personagem, episodio, temporada, numero_episodio, frase, licao) VALUES
    (1, 'Jake', 'Puhoy', 5, 16,
        'Você tá se enrolando nos seus problemas imaginários.',
        'Nem todo silêncio quer dizer que algo deu errado. Antes de sofrer por um problema, vale conferir se ele existe mesmo.'),
    (2, 'Jake', 'His Hero', 1, 25,
        'Ser ruim em alguma coisa é o primeiro passo para ficar meio bom nela.',
        'Errar faz parte de aprender. Cada tentativa deixa você um pouco melhor.'),
    (3, 'Finn, Jake, Marceline e Princesa Jujuba', 'What Was Missing', 3, 10, NULL,
        'Dizer o que sentimos aproxima as pessoas, mesmo quando dá medo.'),
    (4, 'Finn e Jake', 'Incendium', 3, 26, NULL,
        'Guardar a tristeza não faz ela sumir. Aceitar ajuda também é coragem.'),
    (5, 'Marceline e Rei Gelado', 'I Remember You', 4, 25, NULL,
        'Algumas lembranças ficam com a gente porque vieram junto com uma emoção forte.'),
    (6, 'Finn', 'Breezy', 6, 6, NULL,
        'Depois de um término, cada pessoa tem o seu tempo para seguir em frente.'),
    (7, 'Finn', 'The Hall of Egress', 7, 24, NULL,
        'Persistir também pode significar mudar de estratégia.');

-- ------------------------------------------------------------
-- DADOS DE TESTE
-- Servem só para conferir se o dashboard mostra os gráficos.
-- Não são resultados reais de visitantes. Para começar do zero:
--   DELETE FROM partida;  DELETE FROM usuario;
-- (a tabela mensagem continua, porque é conteúdo do site)
-- ------------------------------------------------------------
INSERT INTO usuario (nome, email, senha) VALUES
    ('Usuário Teste 1', 'teste1@memorias.com', 'teste123'),
    ('Usuário Teste 2', 'teste2@memorias.com', 'teste123');

INSERT INTO partida (jogo, venceu, tentativas, pares_encontrados, rodadas_concluidas, erros, duracao_segundos, fk_usuario, fk_mensagem) VALUES
    ('memoria',   1, 9,    6,    NULL, 3, 48, 1,    1),
    ('memoria',   1, 12,   6,    NULL, 6, 65, 2,    2),
    ('memoria',   1, 7,    6,    NULL, 1, 39, NULL, 1),
    ('sequencia', 1, NULL, NULL, 6,    1, 92, 1,    6),
    ('sequencia', 0, NULL, NULL, 3,    3, 51, 2,    2),
    ('sequencia', 0, NULL, NULL, 4,    3, 70, NULL, 1);

-- ------------------------------------------------------------
-- CONSULTAS DO DASHBOARD (as mesmas que estão em partidaModel.js)
-- ------------------------------------------------------------

-- 1) Partidas por jogo: qual jogo é mais jogado?
SELECT jogo, COUNT(*) AS total_partidas
FROM partida
GROUP BY jogo;

-- 2) Aproveitamento no jogo da memória: pares encontrados ÷ tentativas × 100
SELECT ROUND(AVG(pares_encontrados / tentativas * 100), 1) AS aproveitamento_medio
FROM partida
WHERE jogo = 'memoria' AND tentativas > 0;

-- 3) Média de rodadas concluídas na Sequência de Hora de Aventura
SELECT ROUND(AVG(rodadas_concluidas), 1) AS media_rodadas
FROM partida
WHERE jogo = 'sequencia';

-- 4) Tempo médio por partida, separado por jogo
SELECT jogo, ROUND(AVG(duracao_segundos)) AS tempo_medio_segundos
FROM partida
GROUP BY jogo;

-- 5) Episódios mais indicados (JOIN entre partida e mensagem)
SELECT m.episodio, m.temporada, m.numero_episodio, COUNT(p.id) AS vezes_indicado
FROM mensagem m
JOIN partida p ON p.fk_mensagem = m.id
GROUP BY m.id, m.episodio, m.temporada, m.numero_episodio
ORDER BY vezes_indicado DESC
LIMIT 5;

-- Conferência dos relacionamentos: cada partida com o usuário e a mensagem
SELECT p.id, p.jogo, u.nome AS jogador, m.episodio AS mensagem_recebida
FROM partida p
LEFT JOIN usuario u ON u.id = p.fk_usuario
LEFT JOIN mensagem m ON m.id = p.fk_mensagem;
