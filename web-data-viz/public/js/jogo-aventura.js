// ============================================================
// SEQUÊNCIA DE OOO - minijogo de memória (versão 1)
// ============================================================

// ------------------------------------------------------------
// MENSAGENS DOS EPISÓDIOS
// As frases e lições ficam em js/mensagens-episodios.js (vetor
// mensagensDosEpisodios), compartilhado com o jogo da memória.
// Durante a partida aparece só a lição; no fim, a mensagem completa.
// ------------------------------------------------------------

// ------------------------------------------------------------
// REGRAS (valores fáceis de mudar)
// ------------------------------------------------------------
const TOTAL_RODADAS = 6;
const VIDAS_INICIAIS = 3;
const TEMPO_ACESO = 600;      // quanto tempo cada personagem fica aceso (ms)
const TEMPO_ENTRE = 250;      // pausa entre um personagem e o próximo (ms)
const TEMPO_FRASE = 3500;     // quanto tempo a frase fica na tela entre rodadas (ms)
const nomesDosPersonagens = ["Finn", "Jake", "Marceline", "BMO"];

// ------------------------------------------------------------
// ESTADO DA PARTIDA
// ------------------------------------------------------------
let sequencia = [];            // índices (0 a 3) dos personagens sorteados
let posicaoDoJogador = 0;      // em qual passo da sequência o jogador está
let rodadaAtual = 0;
let rodadasConcluidas = 0;
let erros = 0;
let vidas = VIDAS_INICIAIS;
let inicioDaPartida = 0;       // Date.now() de quando começou
let partidaAtiva = false;
let bloqueado = true;          // true = cliques ignorados (sequência sendo mostrada)
let temporizador = null;       // guarda o setTimeout atual para poder cancelar

// Resultados (apenas em memória nesta versão; sem banco de dados)
let ultimoResultado = null;
let historicoDePartidas = [];

// ------------------------------------------------------------
// FUNÇÕES DE TELA
// ------------------------------------------------------------
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

function escreverMensagem(texto) {
    document.getElementById("mensagem-jogo").innerHTML = texto;
}

function acender(indice) {
    document.getElementById("botao-" + indice).classList.add("av-aceso");
}

function apagar(indice) {
    document.getElementById("botao-" + indice).classList.remove("av-aceso");
}

function apagarTodos() {
    for (let i = 0; i < nomesDosPersonagens.length; i++) {
        apagar(i);
    }
}

// ------------------------------------------------------------
// LIÇÃO ENTRE AS RODADAS
// ------------------------------------------------------------
function mostrarFraseDurante() {
    let mensagem = sortearMensagem();   // função de js/mensagens-episodios.js
    document.getElementById("texto-frase-jogo").innerHTML = mensagem.licao + " <em>(" + mensagem.episodio + ")</em>";
    document.getElementById("caixa-frase").hidden = false;
}

// ------------------------------------------------------------
// FLUXO DA PARTIDA
// ------------------------------------------------------------
function iniciarPartida() {
    clearTimeout(temporizador);   // cancela qualquer sequência em andamento (cliques repetidos)
    apagarTodos();

    sequencia = [];
    rodadaAtual = 0;
    rodadasConcluidas = 0;
    erros = 0;
    vidas = VIDAS_INICIAIS;
    inicioDaPartida = Date.now();
    partidaAtiva = true;
    bloqueado = true;

    document.getElementById("caixa-frase").hidden = true;
    mostrarTela("tela-jogo");
    iniciarRodada();
}

function iniciarRodada() {
    document.getElementById("caixa-frase").hidden = true;
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

// Acende o personagem do passo "i", apaga e chama o próximo
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
    // Ignora cliques fora de hora (sequência sendo mostrada ou partida encerrada)
    if (!partidaAtiva || bloqueado) {
        return;
    }

    // Brilho rápido para dar retorno ao clique
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
        mostrarFraseDurante();
        temporizador = setTimeout(iniciarRodada, TEMPO_FRASE);
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

// ------------------------------------------------------------
// RESULTADO
// ------------------------------------------------------------
function finalizarPartida(venceu) {
    if (!partidaAtiva) {
        return;   // evita finalizar duas vezes
    }
    partidaAtiva = false;
    bloqueado = true;

    let duracaoSegundos = Math.round((Date.now() - inicioDaPartida) / 1000);

    // Sorteia a mensagem do episódio (função de js/mensagens-episodios.js).
    // O id dela vai para o banco, na coluna fk_mensagem da tabela partida.
    let mensagem = sortearMensagem();

    // Objeto de resultado: é este objeto que vai para a API / MySQL
    let resultado = {
        jogo: "sequencia",
        dataHora: new Date().toISOString(),
        venceu: venceu,
        rodadasConcluidas: rodadasConcluidas,
        totalRodadas: TOTAL_RODADAS,
        erros: erros,
        duracaoSegundos: duracaoSegundos,
        mensagem: mensagem,
        fkUsuario: null   // o id do usuário logado é lido em js/registrar-partida.js
    };

    ultimoResultado = resultado;
    historicoDePartidas.push(resultado);

    mostrarResultado(resultado);
    enviarResultadoParaApi(resultado);
}

function mostrarResultado(resultado) {
    if (resultado.venceu) {
        document.getElementById("titulo-resultado").innerHTML = "Você venceu!";
    } else {
        document.getElementById("titulo-resultado").innerHTML = "Boa tentativa!";
    }

    document.getElementById("res-rodadas").innerHTML = resultado.rodadasConcluidas + " de " + resultado.totalRodadas;
    document.getElementById("res-erros").innerHTML = resultado.erros;
    document.getElementById("res-duracao").innerHTML = resultado.duracaoSegundos + " s";
    document.getElementById("res-partidas").innerHTML = "Partidas concluídas nesta visita: " + historicoDePartidas.length;

    // Mensagem completa do episódio (função de js/mensagens-episodios.js)
    mostrarMensagemEpisodio("mensagem-episodio", resultado.mensagem);

    mostrarTela("tela-resultado");
}

// ------------------------------------------------------------
// ENVIO PARA A API
// Usa registrarPartida() de js/registrar-partida.js:
// fetch -> /partidas/registrar -> partidaController -> partidaModel -> MySQL
// ------------------------------------------------------------
function enviarResultadoParaApi(resultado) {
    registrarPartida({
        jogo: "sequencia",
        venceu: resultado.venceu ? 1 : 0,
        tentativas: "",
        paresEncontrados: "",
        rodadasConcluidas: resultado.rodadasConcluidas,
        erros: resultado.erros,
        duracaoSegundos: resultado.duracaoSegundos,
        idMensagem: resultado.mensagem.id
    });
}
