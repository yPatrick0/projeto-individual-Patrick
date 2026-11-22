function registrarPartida(partida) {
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
        console.log("Não foi possível falar com o servidor: " + erro);
    });
}
