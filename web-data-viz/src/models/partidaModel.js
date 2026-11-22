var database = require("../database/config");

function registrar(jogo, venceu, tentativas, paresEncontrados, rodadasConcluidas, erros, duracaoSegundos, fkUsuario, fkMensagem) {
    var instrucaoSql = `
        INSERT INTO partida (jogo, venceu, tentativas, pares_encontrados, rodadas_concluidas, erros, duracao_segundos, fk_usuario, fk_mensagem)
        VALUES ('${jogo}', ${venceu}, ${tentativas}, ${paresEncontrados}, ${rodadasConcluidas}, ${erros}, ${duracaoSegundos}, ${fkUsuario}, ${fkMensagem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

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
