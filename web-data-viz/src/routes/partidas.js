var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

// Recebe o resultado de uma partida (jogo da memória ou Sequência) e grava no banco
router.post("/registrar", function (req, res) {
    partidaController.registrar(req, res);
});

// Indicadores do dashboard: uma rota para cada consulta
router.get("/por-jogo", function (req, res) {
    partidaController.contarPorJogo(req, res);
});

router.get("/aproveitamento-memoria", function (req, res) {
    partidaController.aproveitamentoMemoria(req, res);
});

router.get("/media-rodadas", function (req, res) {
    partidaController.mediaRodadas(req, res);
});

router.get("/tempo-medio", function (req, res) {
    partidaController.tempoMedio(req, res);
});

// Usa o JOIN entre partida e mensagem
router.get("/episodios-mais-indicados", function (req, res) {
    partidaController.episodiosMaisIndicados(req, res);
});

// Partidas de um usuário logado (usado no dashboard)
router.get("/usuario/:idUsuario", function (req, res) {
    partidaController.partidasDoUsuario(req, res);
});

module.exports = router;
