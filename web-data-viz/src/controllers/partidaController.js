var partidaModel = require("../models/partidaModel");

// Converte o valor recebido em um número inteiro para o SQL.
// - vazio/ausente  -> "NULL" (o campo não se aplica a este jogo)
// - número válido  -> o número arredondado
// - qualquer outra coisa (texto, negativo) -> undefined (dado inválido)
function paraNumeroOuNulo(valor) {
    if (valor == undefined || valor === "") {
        return "NULL";
    }
    var numero = Number(valor);
    if (isNaN(numero) || numero < 0) {
        return undefined;
    }
    return Math.round(numero);
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

// As quatro funções abaixo seguem o mesmo padrão:
// chamam o model e devolvem as linhas da consulta em JSON.
function contarPorJogo(req, res) {
    partidaModel.contarPorJogo()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nErro ao contar partidas por jogo: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function aproveitamentoMemoria(req, res) {
    partidaModel.aproveitamentoMemoria()
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("\nErro ao calcular o aproveitamento: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function mediaRodadas(req, res) {
    partidaModel.mediaRodadas()
        .then(function (resultado) {
            res.status(200).json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("\nErro ao calcular a média de rodadas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function tempoMedio(req, res) {
    partidaModel.tempoMedio()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nErro ao calcular o tempo médio: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function episodiosMaisIndicados(req, res) {
    partidaModel.episodiosMaisIndicados()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("\nErro ao buscar os episódios mais indicados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function partidasDoUsuario(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario) || idUsuario <= 0) {
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
    episodiosMaisIndicados,
    partidasDoUsuario
};
