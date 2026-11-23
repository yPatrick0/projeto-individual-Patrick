const TOTAL_RODADAS = 6;
const VIDAS_INICIAIS = 3;
const TEMPO_ACESO = 600;
const TEMPO_ENTRE = 250;
const TEMPO_ENTRE_RODADAS = 1200;
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

function formatarTempo(totalSegundos) {
    let minutos = Math.floor(totalSegundos / 60);
    let segundos = totalSegundos % 60;

    if (segundos < 10) {
        return minutos + ":0" + segundos;
    }
    return minutos + ":" + segundos;
}

function atualizarCronometro() {
    document.getElementById("placar-tempo").innerHTML = "Tempo: " + formatarTempo(segundosDaPartida);
}

function contarSegundo() {
    segundosDaPartida++;
    atualizarCronometro();
    temporizadorCronometro = setTimeout(contarSegundo, 1000);
}

function escreverMensagem(texto) {
    document.getElementById("mensagem-jogo").innerHTML = texto;
}

function classeDoBotao(indice) {
    return "av-personagem av-" + nomesDosPersonagens[indice].toLowerCase();
}

function acender(indice) {
    document.getElementById("botao-" + indice).className = classeDoBotao(indice) + " av-aceso";
}

function apagar(indice) {
    document.getElementById("botao-" + indice).className = classeDoBotao(indice);
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
        return;
    }
    acender(sequencia[i]);
    temporizador = setTimeout(function () {
        apagar(sequencia[i]);
        temporizador = setTimeout(function () {
            mostrarPasso(i + 1);
        }, TEMPO_ENTRE);
    }, TEMPO_ACESO);
}

function clicarPersonagem(indice) {
    if (!partidaAtiva || bloqueado) {
        return;
    }

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
        temporizador = setTimeout(iniciarRodada, TEMPO_ENTRE_RODADAS);
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
    if (!partidaAtiva) {
        return;
    }
    partidaAtiva = false;
    bloqueado = true;
    clearTimeout(temporizadorCronometro);

    let duracaoSegundos = segundosDaPartida;

    let carta = escolherCartaSequencia(venceu, rodadasConcluidas, erros);
    let mensagem = carta.mensagem;

    let resultado = {
        venceu: venceu,
        rodadasConcluidas: rodadasConcluidas,
        totalRodadas: TOTAL_RODADAS,
        erros: erros,
        duracaoSegundos: duracaoSegundos,
        mensagem: mensagem,
        motivo: carta.motivo
    };

    partidasNestaVisita++;

    mostrarResultado(resultado);
    enviarResultadoParaApi(resultado);
}

function mostrarResultado(resultado) {
    let resumo = "";
    if (resultado.venceu) {
        document.getElementById("titulo-resultado").innerHTML = "Você venceu!";
        resumo = "Você venceu! · " + resultado.erros + " erro(s)";
    } else {
        document.getElementById("titulo-resultado").innerHTML = "Boa tentativa!";
        resumo = "Fim de jogo · " + resultado.rodadasConcluidas + " de " + resultado.totalRodadas + " rodadas";
    }

    document.getElementById("res-rodadas").innerHTML = resultado.rodadasConcluidas + " de " + resultado.totalRodadas;
    let aproveitamento = resultado.rodadasConcluidas / resultado.totalRodadas * 100;
    document.getElementById("res-aproveitamento").innerHTML = aproveitamento.toFixed(0) + "%";
    document.getElementById("res-erros").innerHTML = resultado.erros;
    document.getElementById("res-duracao").innerHTML = resultado.duracaoSegundos + " s";
    document.getElementById("res-partidas").innerHTML = "Partidas concluídas nesta visita: " + partidasNestaVisita;

    mostrarTela("tela-resultado");

    mostrarCartaEpisodio({
        mensagem: resultado.mensagem,
        resumo: resumo,
        motivo: resultado.motivo,
        jogo: "sequencia"
    });
}

function enviarResultadoParaApi(resultado) {
    let venceu = 0;
    if (resultado.venceu) {
        venceu = 1;
    }

    registrarPartida({
        jogo: "sequencia",
        venceu: venceu,
        tentativas: "",
        paresEncontrados: "",
        rodadasConcluidas: resultado.rodadasConcluidas,
        erros: resultado.erros,
        duracaoSegundos: resultado.duracaoSegundos,
        idMensagem: resultado.mensagem.id
    });
}
