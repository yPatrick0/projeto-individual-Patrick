// ============================================================
// SEQUÊNCIA DE OOO - minijogo de memória (versão 1)
// ============================================================

// ------------------------------------------------------------
// FRASES DO JOGO  <<< EDITE AQUI PARA TROCAR OS TEXTOS >>>
// Todas as frases ficam neste único vetor (variável frasesDoJogo).
//   momento: "durante" = aparece após cada rodada concluída
//            "final"   = aparece na tela de resultado
//   tema:    assunto da frase (aprendizagem, persistência, mudanças, amizade...)
//   texto:   a frase que o jogador lê
//   provisoria: true enquanto for texto provisório; troque para false depois
//   fonte:   origem do texto (revise antes de atribuir autoria ou citar um episódio)
// Para adicionar ou remover frases, basta incluir ou apagar um objeto.
// ------------------------------------------------------------
const frasesDoJogo = [
    { id: 1, momento: "durante", tema: "aprendizagem", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Errar faz parte de aprender: cada tentativa deixa uma pista para a próxima." },
    { id: 2, momento: "durante", tema: "persistência", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Repetir não é voltar ao começo. É construir um caminho que fica mais fácil a cada passo." },
    { id: 3, momento: "durante", tema: "mudanças", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Mudar de estratégia também é uma forma de avançar." },
    { id: 4, momento: "durante", tema: "amizade", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Ter alguém por perto deixa o caminho mais leve, mesmo quando ele continua difícil." },
    { id: 5, momento: "durante", tema: "memória", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Prestar atenção ajuda a lembrar, e lembrar ajuda a seguir em frente." },
    { id: 6, momento: "durante", tema: "aprendizagem", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Ninguém aprende tudo de uma vez. Um passo de cada vez já é progresso." },
    { id: 7, momento: "final", tema: "persistência", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Terminar uma partida é bom, mas o que fica é a vontade de tentar de novo." },
    { id: 8, momento: "final", tema: "amadurecimento", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Crescer é perceber que o que antes parecia difícil hoje já cabe na memória." },
    { id: 9, momento: "final", tema: "amizade", provisoria: true, fonte: "Texto provisório fornecido por Claude; revisão do autor pendente",
      texto: "Boas companhias ajudam a gente a voltar e tentar mais uma vez." }
];

// ------------------------------------------------------------
// REGRAS (valores fáceis de mudar)
// ------------------------------------------------------------
const TOTAL_RODADAS = 6;
const VIDAS_INICIAIS = 3;
const TEMPO_ACESO = 600;      // quanto tempo cada personagem fica aceso (ms)
const TEMPO_ENTRE = 250;      // pausa entre um personagem e o próximo (ms)
const TEMPO_FRASE = 2800;     // quanto tempo a frase fica na tela entre rodadas (ms)
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
let frasesJaMostradas = [];    // ids das frases já usadas (evita repetir)

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
// FRASES
// ------------------------------------------------------------
// Sorteia uma frase do momento pedido, sem repetir até acabarem as opções
function sortearFrase(momento) {
    let disponiveis = [];
    for (let i = 0; i < frasesDoJogo.length; i++) {
        let frase = frasesDoJogo[i];
        if (frase.momento == momento && !frasesJaMostradas.includes(frase.id)) {
            disponiveis.push(frase);
        }
    }

    // Se todas já foram usadas, libera as desse momento de novo
    if (disponiveis.length == 0) {
        for (let i = 0; i < frasesDoJogo.length; i++) {
            if (frasesDoJogo[i].momento == momento) {
                disponiveis.push(frasesDoJogo[i]);
                // Reconstrói o vetor sem esse id usando índices e push.
                let frasesMantidas = [];
                for (let j = 0; j < frasesJaMostradas.length; j++) {
                    if (frasesJaMostradas[j] != frasesDoJogo[i].id) {
                        frasesMantidas.push(frasesJaMostradas[j]);
                    }
                }
                frasesJaMostradas = frasesMantidas;
            }
        }
    }

    // Se nem existe frase para o momento (vetor editado), não mostra nada
    if (disponiveis.length == 0) {
        return null;
    }

    let sorteada = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    frasesJaMostradas.push(sorteada.id);
    return sorteada;
}

function mostrarFraseDurante() {
    let frase = sortearFrase("durante");
    if (frase != null) {
        document.getElementById("texto-frase-jogo").innerHTML = frase.texto;
        document.getElementById("caixa-frase").hidden = false;
    }
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
    frasesJaMostradas = [];
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

    // Objeto de resultado: é este objeto que futuramente irá para a API / MySQL
    let resultado = {
        jogo: "sequencia-de-ooo",
        dataHora: new Date().toISOString(),
        venceu: venceu,
        rodadasConcluidas: rodadasConcluidas,
        totalRodadas: TOTAL_RODADAS,
        erros: erros,
        duracaoSegundos: duracaoSegundos,
        fkUsuario: null   // será preenchido quando existir login
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

    let frase = sortearFrase("final");
    if (frase != null) {
        document.getElementById("texto-frase-final").innerHTML = frase.texto;
    } else {
        document.getElementById("texto-frase-final").innerHTML = "";
    }

    mostrarTela("tela-resultado");
}

// ------------------------------------------------------------
// ENVIO PARA A API (ainda não implementado)
// Quando a API existir, descomente o fetch e crie a rota correspondente
// (rotas -> controller -> model -> MySQL, como no AquaTech).
// A rota "/jogos/resultados" é apenas uma sugestão de nome.
// ------------------------------------------------------------
function enviarResultadoParaApi(resultado) {
    console.log("Resultado em memória (não salvo no banco):", resultado);

    /*
    fetch("/jogos/resultados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultado)
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Resultado salvo!");
        } else {
            console.log("A API recusou o resultado.");
        }
    }).catch(function (erro) {
        console.log("Erro ao enviar resultado: " + erro);
    });
    */

    return false;   // false = nada foi enviado nesta versão
}
