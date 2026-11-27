let classes = ["av-finn", "av-jake", "av-marceline", "av-bmo"];
let sequencia = [];
let posicao = 0;
let passo = 0;
let rodada = 0;
let erros = 0;
let vidas = 3;
let segundos = 0;
let bloqueado = true;
let espera = null;
let cronometro = null;
let partidasNestaVisita = 0;

function mostrarTela(idDaTela) {
    document.getElementById("tela-instrucoes").hidden = true;
    document.getElementById("tela-jogo").hidden = true;
    document.getElementById("tela-resultado").hidden = true;
    document.getElementById(idDaTela).hidden = false;
}

function mostrarPlacar() {
    document.getElementById("placar-rodada").innerHTML = "Rodada " + rodada + " de 6";
    document.getElementById("placar-vidas").innerHTML = "Vidas: " + vidas;
}

function mostrarTempo() {
    let minutos = Math.floor(segundos / 60);
    let resto = segundos % 60;

    if (resto < 10) {
        resto = "0" + resto;
    }

    document.getElementById("placar-tempo").innerHTML = "Tempo: " + minutos + ":" + resto;
}

function contarSegundo() {
    segundos++;
    mostrarTempo();

    if (segundos < 90) {
        cronometro = setTimeout(contarSegundo, 1000);
    } else {
        document.getElementById("placar-tempo").innerHTML += " (limite)";
    }
}

function escreverMensagem(texto) {
    document.getElementById("mensagem-jogo").innerHTML = texto;
}

function acender(indice) {
    document.getElementById("botao-" + indice).className = "av-personagem " + classes[indice] + " av-aceso";
}

function apagar(indice) {
    document.getElementById("botao-" + indice).className = "av-personagem " + classes[indice];
}

function iniciarPartida() {
    clearTimeout(espera);
    clearTimeout(cronometro);

    for (let i = 0; i < 4; i++) {
        apagar(i);
    }

    sequencia = [];
    rodada = 0;
    erros = 0;
    vidas = 3;
    segundos = 0;

    fecharCartaEpisodio();
    mostrarTela("tela-jogo");
    mostrarTempo();
    cronometro = setTimeout(contarSegundo, 1000);
    novaRodada();
}

function novaRodada() {
    rodada++;
    sequencia.push(Math.floor(Math.random() * 4));
    mostrarPlacar();
    mostrarSequencia();
}

function mostrarSequencia() {
    bloqueado = true;
    posicao = 0;
    passo = 0;
    escreverMensagem("Observe a sequência...");
    espera = setTimeout(acenderPasso, 800);
}

function acenderPasso() {
    if (passo < sequencia.length) {
        acender(sequencia[passo]);
        espera = setTimeout(apagarPasso, 600);
    } else {
        bloqueado = false;
        escreverMensagem("Sua vez! Repita a sequência.");
    }
}

function apagarPasso() {
    apagar(sequencia[passo]);
    passo++;
    espera = setTimeout(acenderPasso, 250);
}

function clicarPersonagem(indice) {
    if (!bloqueado) {
        acender(indice);
        setTimeout(function () {
            apagar(indice);
        }, 250);

        if (indice == sequencia[posicao]) {
            posicao++;

            if (posicao == sequencia.length) {
                acertarRodada();
            }
        } else {
            errar();
        }
    }
}

function acertarRodada() {
    bloqueado = true;

    if (rodada == 6) {
        escreverMensagem("Você completou todas as rodadas!");
        espera = setTimeout(finalizarPartida, 900);
    } else {
        escreverMensagem("Rodada concluída!");
        espera = setTimeout(novaRodada, 1200);
    }
}

function errar() {
    bloqueado = true;
    erros++;
    vidas--;
    mostrarPlacar();

    if (vidas == 0) {
        escreverMensagem("Acabaram as vidas.");
        espera = setTimeout(finalizarPartida, 900);
    } else {
        escreverMensagem("Ops, errou! Vamos rever a sequência.");
        espera = setTimeout(mostrarSequencia, 1300);
    }
}

function finalizarPartida() {
    clearTimeout(cronometro);
    partidasNestaVisita++;

    let venceu = vidas > 0;
    let concluidas = rodada - 1;
    let titulo = "Boa tentativa!";
    let resumo = "Fim de jogo · " + concluidas + " de 6 rodadas";

    if (venceu) {
        concluidas = 6;
        titulo = "Você venceu!";
        resumo = "Você venceu! · " + erros + " erro(s)";
    }

    escolherCartaSequencia(venceu, concluidas, erros);

    document.getElementById("titulo-resultado").innerHTML = titulo;
    document.getElementById("res-rodadas").innerHTML = concluidas + " de 6";
    document.getElementById("res-aproveitamento").innerHTML = (concluidas / 6 * 100).toFixed(0) + "%";
    document.getElementById("res-erros").innerHTML = erros;
    document.getElementById("res-duracao").innerHTML = segundos + " s";
    document.getElementById("res-partidas").innerHTML = "Partidas concluídas nesta visita: " + partidasNestaVisita;

    mostrarTela("tela-resultado");
    mostrarCartaEpisodio(idDaCarta, resumo, motivoDaCarta, "sequencia");

    let venceuNumero = 0;
    if (venceu) {
        venceuNumero = 1;
    }

    registrarPartida({
        jogo: "sequencia",
        venceu: venceuNumero,
        tentativas: "",
        paresEncontrados: "",
        rodadasConcluidas: concluidas,
        erros: erros,
        duracaoSegundos: segundos,
        idMensagem: idDaCarta
    });
}
