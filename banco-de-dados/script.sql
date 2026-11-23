CREATE DATABASE IF NOT EXISTS memorias_aventura;
USE memorias_aventura;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mensagem (
    id INT PRIMARY KEY,
    personagem VARCHAR(80) NOT NULL,
    episodio VARCHAR(60) NOT NULL,
    temporada INT NOT NULL,
    numero_episodio INT NOT NULL,
    frase VARCHAR(200),
    licao VARCHAR(200) NOT NULL
);

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

INSERT INTO mensagem (id, personagem, episodio, temporada, numero_episodio, frase, licao) VALUES
    (1, 'Jake', 'Puhoy', 5, 16,
        'Você tá se enrolando nos seus problemas imaginários.',
        'Nem todo silêncio quer dizer que algo deu errado. Antes de sofrer por um problema, vale conferir se ele existe mesmo.'),
    (2, 'Jake', 'O Herói Dele', 1, 25,
        'Ser ruim em alguma coisa é o primeiro passo para ficar meio bom nela.',
        'Errar faz parte de aprender. Cada tentativa deixa você um pouco melhor.'),
    (3, 'Finn, Jake, Marceline e Princesa Jujuba', 'O Que Faltava', 3, 10, NULL,
        'Dizer o que sentimos aproxima as pessoas, mesmo quando dá medo.'),
    (4, 'Finn e Jake', 'Incêndio', 3, 26, NULL,
        'Guardar a tristeza não faz ela sumir. Aceitar ajuda também é coragem.'),
    (5, 'Marceline e Rei Gelado', 'Me Lembro de Você', 4, 25, NULL,
        'Algumas lembranças ficam com a gente porque vieram junto com uma emoção forte.'),
    (6, 'Finn', 'Breezinha', 6, 6, NULL,
        'Depois de um término, cada pessoa tem o seu tempo para seguir em frente.'),
    (7, 'Finn', 'O Salão de Saída', 7, 24, NULL,
        'Persistir também pode significar mudar de estratégia.');

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

SELECT jogo, COUNT(*) AS total_partidas
FROM partida
GROUP BY jogo;

SELECT ROUND(AVG(pares_encontrados / tentativas * 100), 1) AS aproveitamento_medio
FROM partida
WHERE jogo = 'memoria' AND tentativas > 0;

SELECT ROUND(AVG(rodadas_concluidas), 1) AS media_rodadas
FROM partida
WHERE jogo = 'sequencia';

SELECT jogo, ROUND(AVG(duracao_segundos)) AS tempo_medio_segundos
FROM partida
GROUP BY jogo;

SELECT m.id, m.episodio, m.temporada, m.numero_episodio, COUNT(p.id) AS vezes_recebida
FROM mensagem m
LEFT JOIN partida p ON p.fk_mensagem = m.id AND p.fk_usuario = 1
GROUP BY m.id, m.episodio, m.temporada, m.numero_episodio
ORDER BY m.id;

SELECT p.id, p.jogo, u.nome AS jogador, m.episodio AS mensagem_recebida
FROM partida p
LEFT JOIN usuario u ON u.id = p.fk_usuario
LEFT JOIN mensagem m ON m.id = p.fk_mensagem;
