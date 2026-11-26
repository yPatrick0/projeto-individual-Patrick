let idDaCarta = 0;
let motivoDaCarta = "";
let ultimaCarta = null;

function proximaCarta() {
    if (sessionStorage.PROXIMA_CARTA == undefined) {
        sessionStorage.PROXIMA_CARTA = 1;
    }

    idDaCarta = Number(sessionStorage.PROXIMA_CARTA);

    if (idDaCarta < 7) {
        sessionStorage.PROXIMA_CARTA = idDaCarta + 1;
    } else {
        sessionStorage.PROXIMA_CARTA = 1;
    }
}

function escolherCartaMemoria(tentativas) {
    proximaCarta();
    let erros = tentativas - 6;

    if (tentativas <= 10) {
        motivoDaCarta = "Sua memória estava afiada: só " + tentativas + " tentativas.";
    } else if (erros >= 8) {
        motivoDaCarta = "Você errou " + erros + " vezes e não desistiu até achar todos os pares.";
    } else {
        motivoDaCarta = "Partida equilibrada: esta é a próxima carta do seu álbum.";
    }
}

function escolherCartaSequencia(venceu, rodadasConcluidas, erros) {
    proximaCarta();

    if (venceu && erros == 0) {
        motivoDaCarta = "Você venceu sem errar nenhuma vez.";
    } else if (venceu && erros == 2) {
        motivoDaCarta = "Você venceu com uma vida só. Deu certo, mesmo parecendo que não ia.";
    } else if (venceu) {
        motivoDaCarta = "Você venceu as 6 rodadas: esta é a próxima carta do seu álbum.";
    } else if (rodadasConcluidas <= 2) {
        motivoDaCarta = "As vidas acabaram cedo, e tudo bem: cada partida é um treino.";
    } else {
        motivoDaCarta = "Você chegou à rodada " + (rodadasConcluidas + 1) + ". Que tal tentar outro jeito de memorizar?";
    }
}

function mostrarCartaEpisodio(idMensagem, resumo, motivo, jogo) {
    ultimaCarta = { id: idMensagem, resumo: resumo, motivo: motivo, jogo: jogo };
    let mensagem = mensagensDosEpisodios[idMensagem - 1];

    let fotos = "";
    for (let i = 0; i < mensagem.fotos.length; i++) {
        fotos += '<img src="assets/imgs/' + mensagem.fotos[i] + '" alt="">';
    }

    let destaque = '<p class="carta-licao-rotulo">Lição</p><blockquote class="carta-frase">' + mensagem.licao + '</blockquote>';
    if (mensagem.frase != "") {
        destaque = '<blockquote class="carta-frase">“' + mensagem.frase + '”</blockquote>'
            + '<p class="carta-origem">' + mensagem.origemFrase + '</p>'
            + '<div class="carta-licao"><p class="carta-licao-rotulo">Lição</p><p>' + mensagem.licao + '</p></div>';
    }

    let botoes = "";
    if (jogo != "" && sessionStorage.ID_USUARIO != undefined) {
        botoes = '<button type="button" class="carta-botao carta-botao-principal" onclick="jogarDeNovoPelaCarta()">Jogar de novo</button>'
            + '<a class="carta-botao" href="dashboard.html#album">Ver meu álbum</a>';
    } else if (jogo != "") {
        botoes = '<button type="button" class="carta-botao carta-botao-principal" onclick="jogarDeNovoPelaCarta()">Jogar de novo</button>'
            + '<a class="carta-botao" href="login.html">Entrar para guardar no álbum</a>';
    }

    if (motivo != "") {
        motivo = '<p class="carta-motivo">' + motivo + '</p>';
    }

    let fundo = document.getElementById("carta-fundo");
    fundo.innerHTML = '<div class="carta" role="dialog" aria-modal="true" aria-labelledby="carta-personagem">'
        + '<div class="carta-topo">'
        + '<span>' + resumo + '</span>'
        + '<button type="button" class="carta-fechar" onclick="fecharCartaEpisodio()" aria-label="Fechar carta">×</button>'
        + '</div>'
        + '<div class="carta-corpo">'
        + motivo
        + '<div class="carta-quem">'
        + '<div class="carta-fotos">' + fotos + '</div>'
        + '<div>'
        + '<p class="carta-personagem" id="carta-personagem">' + mensagem.personagem + '</p>'
        + '<p class="carta-episodio">' + mensagem.episodio + ' · T' + mensagem.temporada + ' E' + mensagem.numero + '</p>'
        + '</div>'
        + '</div>'
        + destaque
        + '<p class="carta-onde"><strong>Onde assistir:</strong> ' + ONDE_ASSISTIR + '</p>'
        + '<p class="carta-aviso">A lição é uma interpretação do autor do site.</p>'
        + '<div class="carta-acoes">' + botoes + '</div>'
        + '</div>'
        + '</div>';
    fundo.hidden = false;
}

function jogarDeNovoPelaCarta() {
    fecharCartaEpisodio();

    if (ultimaCarta.jogo == "memoria") {
        iniciarJogo();
    } else if (ultimaCarta.jogo == "sequencia") {
        iniciarPartida();
    }
}

function fecharCartaEpisodio() {
    document.getElementById("carta-fundo").hidden = true;
}

function reabrirCartaEpisodio() {
    if (ultimaCarta != null) {
        mostrarCartaEpisodio(ultimaCarta.id, ultimaCarta.resumo, ultimaCarta.motivo, ultimaCarta.jogo);
    }
}
