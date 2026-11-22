var database = require("../database/config");

// Grava uma partida. Os valores já chegam conferidos pelo controller.
// Valores que não se aplicam ao jogo chegam como null e viram NULL no banco.
function registrar(jogo, venceu, tentativas, paresEncontrados, rodadasConcluidas, erros, duracaoSegundos, fkUsuario, fkMensagem) {
    var instrucaoSql = `
        INSERT INTO partida (jogo, venceu, tentativas, pares_encontrados, rodadas_concluidas, erros, duracao_segundos, fk_usuario, fk_mensagem)
        VALUES ('${jogo}', ${venceu}, ${tentativas}, ${paresEncontrados}, ${rodadasConcluidas}, ${erros}, ${duracaoSegundos}, ${fkUsuario}, ${fkMensagem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Os indicadores abaixo usam só as partidas do usuário logado
// (WHERE fk_usuario = id), por isso cada pessoa vê o próprio painel.

// Indicador 1: quantas partidas de cada jogo
function contarPorJogo(idUsuario) {
    var instrucaoSql = `
        SELECT jogo, COUNT(*) AS total_partidas
        FROM partida
        WHERE fk_usuario = ${idUsuario}
        GROUP BY jogo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Indicador 2: aproveitamento médio na memória = pares ÷ tentativas × 100
function aproveitamentoMemoria(idUsuario) {
    var instrucaoSql = `
        SELECT ROUND(AVG(pares_encontrados / tentativas * 100), 1) AS aproveitamento_medio,
               COUNT(*) AS total_partidas
        FROM partida
        WHERE fk_usuario = ${idUsuario} AND jogo = 'memoria' AND tentativas > 0;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Indicador 3: média de rodadas concluídas na Sequência
function mediaRodadas(idUsuario) {
    var instrucaoSql = `
        SELECT ROUND(AVG(rodadas_concluidas), 1) AS media_rodadas,
               COUNT(*) AS total_partidas
        FROM partida
        WHERE fk_usuario = ${idUsuario} AND jogo = 'sequencia';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Indicador 4: tempo médio por partida (em segundos), separado por jogo
function tempoMedio(idUsuario) {
    var instrucaoSql = `
        SELECT jogo, ROUND(AVG(duracao_segundos)) AS tempo_medio_segundos
        FROM partida
        WHERE fk_usuario = ${idUsuario}
        GROUP BY jogo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Álbum de cartas: as 7 mensagens e quantas vezes o usuário recebeu cada uma.
// LEFT JOIN: mantém as mensagens que o usuário ainda não recebeu (vezes = 0),
// que aparecem como cartas bloqueadas no painel.
function albumDoUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT m.id, m.episodio, m.temporada, m.numero_episodio, COUNT(p.id) AS vezes_recebida
        FROM mensagem m
        LEFT JOIN partida p ON p.fk_mensagem = m.id AND p.fk_usuario = ${idUsuario}
        GROUP BY m.id, m.episodio, m.temporada, m.numero_episodio
        ORDER BY m.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Partidas de um usuário (usa a ligação usuario 1:N partida)
function partidasDoUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT jogo, COUNT(*) AS total_partidas
        FROM partida
        WHERE fk_usuario = ${idUsuario}
        GROUP BY jogo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    contarPorJogo,
    aproveitamentoMemoria,
    mediaRodadas,
    tempoMedio,
    albumDoUsuario,
    partidasDoUsuario
};
