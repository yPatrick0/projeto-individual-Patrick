var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

router.post("/registrar", function (req, res) {
    partidaController.registrar(req, res);
});

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

router.get("/album/:idUsuario", function (req, res) {
    partidaController.albumDoUsuario(req, res);
});

router.get("/usuario/:idUsuario", function (req, res) {
    partidaController.partidasDoUsuario(req, res);
});

module.exports = router;
