var partidaModel = require("../models/partidaModel");

function somenteDigitos(texto) {
    var algarismos = "0123456789";

    if (texto.length == 0) {
        return false;
    }
    for (var i = 0; i < texto.length; i++) {
        if (!algarismos.includes(texto[i])) {
            return false;
        }
    }
    return true;
}

function paraNumeroOuNulo(valor) {
    if (valor == undefined) {
        return "NULL";
    }
    var texto = "" + valor;
    if (texto == "") {
        return "NULL";
    }
    if (!somenteDigitos(texto)) {
        return undefined;
    }
    return Number(texto);
}

function registrar(req, res) {
    var jogo = req.body.jogoServer;
    var venceu = req.body.venceuServer;
    var tentativas = paraNumeroOuNulo(req.body.tentativasServer);
    var paresEncontrados = paraNumeroOuNulo(req.body.paresServer);
    var rodadasConcluidas = paraNumeroOuNulo(req.body.rodadasServer);
    var erros = paraNumeroOuNulo(req.body.errosServer);
    var duracaoSegundos = paraNumeroOuNulo(req.body.duracaoServer);
    var fkUsuario = paraNumeroOuNulo(req.body.idUsuarioServer);
    var fkMensagem = paraNumeroOuNulo(req.body.idMensagemServer);

    if (jogo != "memoria" && jogo != "sequencia") {
        res.status(400).send("O jogo precisa ser 'memoria' ou 'sequencia'.");
    } else if (venceu != 0 && venceu != 1) {
        res.status(400).send("O campo venceu precisa ser 0 ou 1.");
    } else if (duracaoSegundos == undefined || duracaoSegundos == "NULL") {
        res.status(400).send("A duração da partida está inválida.");
    } else if (erros == undefined || erros == "NULL") {
        res.status(400).send("A quantidade de erros está inválida.");
    } else if (tentativas == undefined || paresEncontrados == undefined || rodadasConcluidas == undefined || fkUsuario == undefined || fkMensagem == undefined) {
        res.status(400).send("Algum valor numérico da partida está inválido.");
    } else if (jogo == "memoria" && (tentativas == "NULL" || paresEncontrados == "NULL")) {
        res.status(400).send("No jogo da memória, tentativas e pares são obrigatórios.");
    } else if (jogo == "sequencia" && rodadasConcluidas == "NULL") {
        res.status(400).send("Na Sequência, as rodadas concluídas são obrigatórias.");
    } else {
        partidaModel.registrar(jogo, venceu, tentativas, paresEncontrados, rodadasConcluidas, erros, duracaoSegundos, fkUsuario, fkMensagem)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log("\nHouve um erro ao registrar a partida! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function lerIdUsuario(req) {
    var texto = req.params.idUsuario;
    if (!somenteDigitos(texto) || Number(texto) == 0) {
        return undefined;
    }
    return Number(texto);
}

function contarPorJogo(req, res) {
    var idUsuario = lerIdUsuario(req);

    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
    } else {
        partidaModel.contarPorJogo(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("\nErro ao contar partidas por jogo: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function aproveitamentoMemoria(req, res) {
    var idUsuario = lerIdUsuario(req);

    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
    } else {
        partidaModel.aproveitamentoMemoria(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado[0]);
            })
            .catch(function (erro) {
                console.log("\nErro ao calcular o aproveitamento: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function mediaRodadas(req, res) {
    var idUsuario = lerIdUsuario(req);

    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
    } else {
        partidaModel.mediaRodadas(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado[0]);
            })
            .catch(function (erro) {
                console.log("\nErro ao calcular a média de rodadas: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function tempoMedio(req, res) {
    var idUsuario = lerIdUsuario(req);

    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
    } else {
        partidaModel.tempoMedio(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("\nErro ao calcular o tempo médio: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function albumDoUsuario(req, res) {
    var idUsuario = lerIdUsuario(req);

    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
    } else {
        partidaModel.albumDoUsuario(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("\nErro ao buscar o álbum do usuário: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    registrar,
    contarPorJogo,
    aproveitamentoMemoria,
    mediaRodadas,
    tempoMedio,
    albumDoUsuario
};
