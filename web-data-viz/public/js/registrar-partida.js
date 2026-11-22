// ============================================================
// ENVIO DO RESULTADO DA PARTIDA PARA A API
// Fluxo: jogo (navegador) -> fetch -> rota /partidas/registrar
//        -> partidaController -> partidaModel -> MySQL
// Usado pelo jogo da memória e pela Sequência de Hora de Aventura.
// ============================================================
function registrarPartida(partida) {
    // Se a pessoa estiver logada (login do Web Data Viz), envia o id dela.
    // Sem login, a partida é salva como anônima (fk_usuario = NULL).
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(enderecoApi("/partidas/registrar"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jogoServer: partida.jogo,
            venceuServer: partida.venceu,
            tentativasServer: partida.tentativas,
            paresServer: partida.paresEncontrados,
            rodadasServer: partida.rodadasConcluidas,
            errosServer: partida.erros,
            duracaoServer: partida.duracaoSegundos,
            idUsuarioServer: idUsuario,
            idMensagemServer: partida.idMensagem
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Partida salva no banco!");
        } else {
            console.log("A API recusou a partida. Status: " + resposta.status);
        }
    }).catch(function (erro) {
        // Acontece quando o site é aberto sem o servidor Node (ex.: abrindo o HTML direto)
        console.log("Não foi possível falar com o servidor: " + erro);
    });
}
