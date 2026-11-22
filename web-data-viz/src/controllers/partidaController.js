var partidaModel = require("../models/partidaModel");

// Confere se o texto tem só algarismos de 0 a 9 (ex.: "42" sim; "4a", "-1" e "" não)
function somenteDigitos(texto) {
    if (texto.length == 0) {
        return false;
    }
    for (var i = 0; i < texto.length; i++) {
        if (texto[i] < "0" || texto[i] > "9") {
            return false;
        }
    }
    return true;
}

// Prepara o valor recebido para o SQL.
// - vazio/ausente      -> "NULL" (o campo não se aplica a este jogo)
// - número inteiro     -> o próprio número
// - qualquer outra coisa (texto, negativo, decimal) -> undefined (dado inválido)
function paraNumeroOuNulo(valor) {
    if (valor == undefined) {
        return "NULL";
    }
    var texto = "" + valor;   // junta com um texto vazio para virar texto
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

    // Validações: só aceita os dois jogos do site e números válidos
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

// Lê o id do usuário que veio na rota (ex.: /partidas/por-jogo/3).
// Devolve o número, ou undefined se o id for inválido.
function lerIdUsuario(req) {
    var texto = req.params.idUsuario;
    if (!somenteDigitos(texto) || Number(texto) == 0) {
        return undefined;
    }
    return Number(texto);
}

// As funções abaixo seguem o mesmo padrão: conferem o id do usuário,
// chamam o model e devolvem as linhas da consulta em JSON.
function contarPorJogo(req, res) {
    var idUsuario = lerIdUsuario(req);
    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
        return;
    }
    partidaModel.contarPorJogo(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nErro ao contar partidas por jogo: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function aproveitamentoMemoria(req, res) {
    var idUsuario = lerIdUsuario(req);
    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
        return;
    }
    partidaModel.aproveitamentoMemoria(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("\nErro ao calcular o aproveitamento: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function mediaRodadas(req, res) {
    var idUsuario = lerIdUsuario(req);
    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
        return;
    }
    partidaModel.mediaRodadas(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("\nErro ao calcular a média de rodadas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function tempoMedio(req, res) {
    var idUsuario = lerIdUsuario(req);
    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
        return;
    }
    partidaModel.tempoMedio(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nErro ao calcular o tempo médio: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function albumDoUsuario(req, res) {
    var idUsuario = lerIdUsuario(req);
    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
        return;
    }
    partidaModel.albumDoUsuario(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nErro ao buscar o álbum do usuário: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function partidasDoUsuario(req, res) {
    var idUsuario = lerIdUsuario(req);

    if (idUsuario == undefined) {
        res.status(400).send("Id de usuário inválido.");
    } else {
        partidaModel.partidasDoUsuario(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("\nErro ao buscar as partidas do usuário: ", erro.sqlMessage);
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
    albumDoUsuario,
    partidasDoUsuario
};
