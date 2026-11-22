var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

// Recebe o resultado de uma partida (jogo da memória ou Sequência) e grava no banco
router.post("/registrar", function (req, res) {
    partidaController.registrar(req, res);
});

// Indicadores do dashboard: uma rota para cada consulta.
// O :idUsuario é o id de quem está logado, então cada pessoa vê só as próprias partidas.
router.get("/por-jogo/:idUsuario", function (req, res) {
    partidaController.contarPorJogo(req, res);
});

router.get("/aproveitamento-memoria/:idUsuario", function (req, res) {
    partidaController.aproveitamentoMemoria(req, res);
});

router.get("/media-rodadas/:idUsuario", function (req, res) {
    partidaController.mediaRodadas(req, res);
});

router.get("/tempo-medio/:idUsuario", function (req, res) {
    partidaController.tempoMedio(req, res);
});

// Álbum de cartas do usuário (LEFT JOIN entre mensagem e partida)
router.get("/album/:idUsuario", function (req, res) {
    partidaController.albumDoUsuario(req, res);
});

// Partidas de um usuário logado (usado no dashboard)
router.get("/usuario/:idUsuario", function (req, res) {
    partidaController.partidasDoUsuario(req, res);
});

module.exports = router;
