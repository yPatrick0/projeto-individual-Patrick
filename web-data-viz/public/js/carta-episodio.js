// ============================================================
// CARTA DO EPISÓDIO - aparece no fim das partidas e no álbum do painel
// Usada por: index.html (jogo da memória), jogo-aventura.html (Sequência)
//            e dashboard.html (álbum).
// Precisa de js/mensagens-episodios.js carregado antes.
//
// 1) ESCOLHA: a carta depende de como foi a partida (não é só sorteio).
// 2) EXIBIÇÃO: uma janela centralizada por cima da página, com a foto
//    do personagem, a frase, a lição e o episódio. Cada página tem a
//    <div id="carta-fundo" class="carta-fundo" hidden></div> onde a carta aparece.
// ============================================================

// ------------------------------------------------------------
// 1) ESCOLHA DA CARTA PELO DESEMPENHO
// Cada função devolve um objeto { mensagem, motivo }.
// "motivo" é a frase que explica por que a pessoa recebeu essa carta.
// ------------------------------------------------------------

// Jogo da memória (6 pares). Quanto menos tentativas, melhor.
function escolherCartaMemoria(tentativas) {
    let erros = tentativas - 6;

    if (tentativas <= 10) {
        // Memória afiada: I Remember You (lembranças que ficam)
        return {
            mensagem: buscarMensagem(5),
            motivo: "Sua memória estava afiada: só " + tentativas + " tentativas."
        };
    } else if (erros >= 8) {
        // Errou bastante e terminou mesmo assim: His Hero
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

// Sequência (6 rodadas, 3 vidas).
function escolherCartaSequencia(venceu, rodadasConcluidas, erros) {
    if (venceu && erros == 0) {
        return {
            mensagem: buscarMensagem(5),
            motivo: "Você venceu sem errar nenhuma vez."
        };
    } else if (venceu && erros == 2) {
        // Venceu com uma vida só: Puhoy (o problema não era tão grande)
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
        // Perdeu cedo: His Hero (errar faz parte de aprender)
        return {
            mensagem: buscarMensagem(2),
            motivo: "As vidas acabaram cedo, e tudo bem: cada partida é um treino."
        };
    } else {
        // Chegou longe e perdeu: The Hall of Egress (mudar de estratégia)
        return {
            mensagem: buscarMensagem(7),
            motivo: "Você chegou à rodada " + (rodadasConcluidas + 1) + ". Que tal tentar outro jeito de memorizar?"
        };
    }
}

// ------------------------------------------------------------
// 2) EXIBIÇÃO DA CARTA
// ------------------------------------------------------------
let ultimaCartaMostrada = null;   // guarda a última carta para reabrir

// "T1 E25"
function textoTemporadaEpisodio(mensagem) {
    return "T" + mensagem.temporada + " E" + mensagem.numero;
}

// Fotos redondas do(s) personagem(ns). Com mais de um, elas ficam sobrepostas.
function montarFotos(mensagem) {
    let html = '<div class="carta-fotos">';
    for (let i = 0; i < mensagem.fotos.length; i++) {
        html = html + '<img src="assets/imgs/' + mensagem.fotos[i] + '" alt="">';
    }
    return html + '</div>';
}

// Mostra a carta.
// dados = { mensagem, resumo, motivo, jogo }
//   resumo: texto do topo (ex.: "Jogo da memória concluído · 6 pares em 14 tentativas")
//   motivo: por que esta carta (pode ser "")
//   jogo:   "memoria", "sequencia" ou "" (carta aberta pelo álbum do painel)
function mostrarCartaEpisodio(dados) {
    ultimaCartaMostrada = dados;
    let mensagem = dados.mensagem;

    // Destaque: a frase da série, ou a lição quando ainda não há frase conferida
    let destaque = "";
    if (mensagem.frase != "") {
        destaque = '<blockquote class="carta-frase">“' + mensagem.frase + '”</blockquote>'
            + '<p class="carta-origem">' + mensagem.origemFrase + '</p>'
            + '<div class="carta-licao"><p class="carta-licao-rotulo">Lição</p><p>' + mensagem.licao + '</p></div>';
    } else {
        destaque = '<p class="carta-licao-rotulo">Lição</p>'
            + '<blockquote class="carta-frase">' + mensagem.licao + '</blockquote>';
    }

    // Botões do rodapé: no fim de um jogo, "Jogar de novo" e o álbum;
    // no próprio álbum (jogo vazio), só o × para fechar.
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

    // A janela é a <div id="carta-fundo"> que já está no HTML de cada página
    let fundo = document.getElementById("carta-fundo");
    fundo.innerHTML = html;
    fundo.hidden = false;
}

// Botão "Jogar de novo": fecha a carta e recomeça o jogo da página
function jogarDeNovoPelaCarta() {
    fecharCartaEpisodio();

    if (ultimaCartaMostrada.jogo == "memoria") {
        iniciarJogo();          // função de js/jogo-memoria.js
    } else if (ultimaCartaMostrada.jogo == "sequencia") {
        iniciarPartida();       // função de js/jogo-aventura.js
    }
}

function fecharCartaEpisodio() {
    document.getElementById("carta-fundo").hidden = true;
}

// Botão "Ver carta do episódio" depois de fechar a janela
function reabrirCartaEpisodio() {
    if (ultimaCartaMostrada != null) {
        mostrarCartaEpisodio(ultimaCartaMostrada);
    }
}
