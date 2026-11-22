function escolherCartaMemoria(tentativas) {
    let erros = tentativas - 6;

    if (tentativas <= 10) {
        return {
            mensagem: buscarMensagem(5),
            motivo: "Sua memória estava afiada: só " + tentativas + " tentativas."
        };
    } else if (erros >= 8) {
        return {
            mensagem: buscarMensagem(2),
            motivo: "Você errou " + erros + " vezes e não desistiu até achar todos os pares."
        };
    } else {
        return {
            mensagem: sortearMensagem([1, 3, 4, 6, 7]),
            motivo: "Partida equilibrada: esta carta foi sorteada para você."
        };
    }
}

function escolherCartaSequencia(venceu, rodadasConcluidas, erros) {
    if (venceu && erros == 0) {
        return {
            mensagem: buscarMensagem(5),
            motivo: "Você venceu sem errar nenhuma vez."
        };
    } else if (venceu && erros == 2) {
        return {
            mensagem: buscarMensagem(1),
            motivo: "Você venceu com uma vida só. Deu certo, mesmo parecendo que não ia."
        };
    } else if (venceu) {
        return {
            mensagem: sortearMensagem([3, 4, 6]),
            motivo: "Você venceu as 6 rodadas: esta carta foi sorteada para você."
        };
    } else if (rodadasConcluidas <= 2) {
        return {
            mensagem: buscarMensagem(2),
            motivo: "As vidas acabaram cedo, e tudo bem: cada partida é um treino."
        };
    } else {
        return {
            mensagem: buscarMensagem(7),
            motivo: "Você chegou à rodada " + (rodadasConcluidas + 1) + ". Que tal tentar outro jeito de memorizar?"
        };
    }
}

let ultimaCartaMostrada = null;

function textoTemporadaEpisodio(mensagem) {
    return "T" + mensagem.temporada + " E" + mensagem.numero;
}

function montarFotos(mensagem) {
    let html = '<div class="carta-fotos">';
    for (let i = 0; i < mensagem.fotos.length; i++) {
        html = html + '<img src="assets/imgs/' + mensagem.fotos[i] + '" alt="">';
    }
    return html + '</div>';
}

function mostrarCartaEpisodio(dados) {
    ultimaCartaMostrada = dados;
    let mensagem = dados.mensagem;

    let destaque = "";
    if (mensagem.frase != "") {
        destaque = '<blockquote class="carta-frase">“' + mensagem.frase + '”</blockquote>'
            + '<p class="carta-origem">' + mensagem.origemFrase + '</p>'
            + '<div class="carta-licao"><p class="carta-licao-rotulo">Lição</p><p>' + mensagem.licao + '</p></div>';
    } else {
        destaque = '<p class="carta-licao-rotulo">Lição</p>'
            + '<blockquote class="carta-frase">' + mensagem.licao + '</blockquote>';
    }

    let botoes = "";
    if (dados.jogo != "") {
        botoes = '<button type="button" class="carta-botao carta-botao-principal" onclick="jogarDeNovoPelaCarta()">Jogar de novo</button>';

        if (sessionStorage.ID_USUARIO != undefined) {
            botoes = botoes + '<a class="carta-botao" href="dashboard.html#album">Ver meu álbum</a>';
        } else {
            botoes = botoes + '<a class="carta-botao" href="login.html">Entrar para guardar no álbum</a>';
        }
    }

    let motivo = "";
    if (dados.motivo != "") {
        motivo = '<p class="carta-motivo">' + dados.motivo + '</p>';
    }

    let html = ''
        + '<div class="carta" role="dialog" aria-modal="true" aria-labelledby="carta-personagem">'
        + '  <div class="carta-topo">'
        + '    <span>' + dados.resumo + '</span>'
        + '    <button type="button" class="carta-fechar" onclick="fecharCartaEpisodio()" aria-label="Fechar carta">×</button>'
        + '  </div>'
        + '  <div class="carta-corpo">'
        +      motivo
        + '    <div class="carta-quem">'
        +        montarFotos(mensagem)
        + '      <div>'
        + '        <p class="carta-personagem" id="carta-personagem">' + mensagem.personagem + '</p>'
        + '        <p class="carta-episodio">' + mensagem.episodio + ' · ' + textoTemporadaEpisodio(mensagem) + '</p>'
        + '      </div>'
        + '    </div>'
        +      destaque
        + '    <p class="carta-onde">' + ONDE_ASSISTIR + ' A lição é uma interpretação do autor do site.</p>'
        + '    <div class="carta-acoes">' + botoes + '</div>'
        + '  </div>'
        + '</div>';

    let fundo = document.getElementById("carta-fundo");
    fundo.innerHTML = html;
    fundo.hidden = false;
}

function jogarDeNovoPelaCarta() {
    fecharCartaEpisodio();

    if (ultimaCartaMostrada.jogo == "memoria") {
        iniciarJogo();
    } else if (ultimaCartaMostrada.jogo == "sequencia") {
        iniciarPartida();
    }
}

function fecharCartaEpisodio() {
    document.getElementById("carta-fundo").hidden = true;
}

function reabrirCartaEpisodio() {
    if (ultimaCartaMostrada != null) {
        mostrarCartaEpisodio(ultimaCartaMostrada);
    }
}
