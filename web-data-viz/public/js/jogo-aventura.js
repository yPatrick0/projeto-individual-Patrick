const TOTAL_RODADAS = 6;
const VIDAS_INICIAIS = 3;
const nomesDosPersonagens = ["Finn", "Jake", "Marceline", "BMO"];

let sequencia = [];
let posicaoDoJogador = 0;
let rodadaAtual = 0;
let rodadasConcluidas = 0;
let erros = 0;
let vidas = VIDAS_INICIAIS;
let segundosDaPartida = 0;
let partidaAtiva = false;
let bloqueado = true;
let temporizador = null;
let temporizadorCronometro = null;
let partidasNestaVisita = 0;

function mostrarTela(idDaTela) {
    document.getElementById("tela-instrucoes").hidden = true;
    document.getElementById("tela-jogo").hidden = true;
    document.getElementById("tela-resultado").hidden = true;
    document.getElementById(idDaTela).hidden = false;
}

function atualizarPlacar() {
    document.getElementById("placar-rodada").innerHTML = "Rodada " + rodadaAtual + " de " + TOTAL_RODADAS;
    document.getElementById("placar-vidas").innerHTML = "Vidas: " + vidas;
}

function atualizarCronometro() {
    let minutos = Math.floor(segundosDaPartida / 60);
    let segundos = segundosDaPartida % 60;
    let zero = "";

    if (segundos < 10) {
        zero = "0";
    }
    document.getElementById("placar-tempo").innerHTML = "Tempo: " + minutos + ":" + zero + segundos;
}

function contarSegundo() {
    segundosDaPartida++;
    atualizarCronometro();
    temporizadorCronometro = setTimeout(contarSegundo, 1000);
}

function escreverMensagem(texto) {
    document.getElementById("mensagem-jogo").innerHTML = texto;
}

function acender(indice) {
    document.getElementById("botao-" + indice).className = "av-personagem av-" + nomesDosPersonagens[indice].toLowerCase() + " av-aceso";
}

function apagar(indice) {
    document.getElementById("botao-" + indice).className = "av-personagem av-" + nomesDosPersonagens[indice].toLowerCase();
}

function apagarTodos() {
    for (let i = 0; i < nomesDosPersonagens.length; i++) {
        apagar(i);
    }
}

function iniciarPartida() {
    clearTimeout(temporizador);
    clearTimeout(temporizadorCronometro);
    apagarTodos();

    sequencia = [];
    rodadaAtual = 0;
    rodadasConcluidas = 0;
    erros = 0;
    vidas = VIDAS_INICIAIS;
    segundosDaPartida = 0;
    partidaAtiva = true;
    bloqueado = true;

    fecharCartaEpisodio();
    mostrarTela("tela-jogo");
    atualizarCronometro();
    temporizadorCronometro = setTimeout(contarSegundo, 1000);
    iniciarRodada();
}

function iniciarRodada() {
    rodadaAtual++;
    sequencia.push(Math.floor(Math.random() * nomesDosPersonagens.length));
    atualizarPlacar();
    mostrarSequencia();
}

function mostrarSequencia() {
    bloqueado = true;
    posicaoDoJogador = 0;
    escreverMensagem("Observe a sequência...");
    temporizador = setTimeout(function () {
        mostrarPasso(0);
    }, 800);
}

function mostrarPasso(i) {
    if (i >= sequencia.length) {
        bloqueado = false;
        escreverMensagem("Sua vez! Repita a sequência.");
    } else {
        acender(sequencia[i]);
        temporizador = setTimeout(function () {
            apagar(sequencia[i]);
            temporizador = setTimeout(function () {
                mostrarPasso(i + 1);
            }, 250);
        }, 600);
    }
}

function clicarPersonagem(indice) {
    if (partidaAtiva && !bloqueado) {
        acender(indice);
        setTimeout(function () {
            apagar(indice);
        }, 250);

        if (indice == sequencia[posicaoDoJogador]) {
            posicaoDoJogador++;
            if (posicaoDoJogador == sequencia.length) {
                concluirRodada();
            }
        } else {
            errar();
        }
    }
}

function concluirRodada() {
    bloqueado = true;
    rodadasConcluidas++;

    if (rodadasConcluidas == TOTAL_RODADAS) {
        escreverMensagem("Você completou todas as rodadas!");
        temporizador = setTimeout(function () {
            finalizarPartida(true);
        }, 900);
    } else {
        escreverMensagem("Rodada concluída!");
        temporizador = setTimeout(iniciarRodada, 1200);
    }
}

function errar() {
    bloqueado = true;
    erros++;
    vidas--;
    atualizarPlacar();

    if (vidas == 0) {
        escreverMensagem("Acabaram as vidas.");
        temporizador = setTimeout(function () {
            finalizarPartida(false);
        }, 900);
    } else {
        escreverMensagem("Ops, errou! Vamos rever a sequência.");
        temporizador = setTimeout(mostrarSequencia, 1300);
    }
}

function finalizarPartida(venceu) {
    if (partidaAtiva) {
        partidaAtiva = false;
        bloqueado = true;
        clearTimeout(temporizadorCronometro);
        partidasNestaVisita++;
        escolherCartaSequencia(venceu, rodadasConcluidas, erros);

        let aproveitamento = rodadasConcluidas / TOTAL_RODADAS * 100;
        let resumo = "Fim de jogo · " + rodadasConcluidas + " de " + TOTAL_RODADAS + " rodadas";
        let venceuNumero = 0;
        document.getElementById("titulo-resultado").innerHTML = "Boa tentativa!";

        if (venceu) {
            resumo = "Você venceu! · " + erros + " erro(s)";
            venceuNumero = 1;
            document.getElementById("titulo-resultado").innerHTML = "Você venceu!";
        }

        document.getElementById("res-rodadas").innerHTML = rodadasConcluidas + " de " + TOTAL_RODADAS;
        document.getElementById("res-aproveitamento").innerHTML = aproveitamento.toFixed(0) + "%";
        document.getElementById("res-erros").innerHTML = erros;
        document.getElementById("res-duracao").innerHTML = segundosDaPartida + " s";
        document.getElementById("res-partidas").innerHTML = "Partidas concluídas nesta visita: " + partidasNestaVisita;

        mostrarTela("tela-resultado");
        mostrarCartaEpisodio(idDaCarta, resumo, motivoDaCarta, "sequencia");

        registrarPartida({
            jogo: "sequencia",
            venceu: venceuNumero,
            tentativas: "",
            paresEncontrados: "",
            rodadasConcluidas: rodadasConcluidas,
            erros: erros,
            duracaoSegundos: segundosDaPartida,
            idMensagem: idDaCarta
        });
    }
}
