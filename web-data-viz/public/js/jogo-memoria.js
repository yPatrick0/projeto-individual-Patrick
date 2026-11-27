let personagens = ['finn', 'jake', 'marceline', 'bmo', 'rei-gelado', 'princesa-jujuba'];
let nomes = ['Finn', 'Jake', 'Marceline', 'BMO', 'Rei Gelado', 'Princesa Jujuba'];
let cartas = [];
let encontradas = [];
let primeiraCarta = -1;
let segundaCarta = -1;
let tentativas = 0;
let pares = 0;
let segundos = 0;
let esperando = null;
let cronometro = null;
let aproveitamento = 0;

function mostrarPlacar() {
    let texto = pares + ' de 6 pares · ' + tentativas + ' tentativas';

    if (pares == 6) {
        texto = 'Você encontrou todos os pares! ' + texto + ' · ' + aproveitamento + '% de acerto'
            + ' <button type="button" class="botao-ver-carta" onclick="reabrirCartaEpisodio()">Ver carta</button>';
    }

    document.getElementById('stats').innerHTML = texto;
}

function mostrarTempo() {
    let minutos = Math.floor(segundos / 60);
    let resto = segundos % 60;

    if (resto < 10) {
        resto = '0' + resto;
    }

    document.getElementById('cronometro').innerHTML = 'Tempo: ' + minutos + ':' + resto;
}

function contarSegundo() {
    segundos++;
    mostrarTempo();

    if (segundos < 90) {
        cronometro = setTimeout(contarSegundo, 1000);
    } else {
        document.getElementById('cronometro').innerHTML += ' (limite)';
    }
}

function mostrarVerso(indice) {
    let botao = document.getElementById('carta' + indice);
    botao.innerHTML = '<img class="card-back" src="assets/imgs/verso-ooo.svg" alt="Carta ' + (indice + 1) + '">';
    botao.className = 'card';
}

function iniciarJogo() {
    clearTimeout(esperando);
    clearTimeout(cronometro);
    esperando = null;
    cronometro = null;
    primeiraCarta = -1;
    segundaCarta = -1;
    tentativas = 0;
    pares = 0;
    segundos = 0;
    cartas = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    encontradas = [];

    for (let i = 0; i < cartas.length; i++) {
        let sorteada = Math.floor(Math.random() * cartas.length);
        let guardada = cartas[i];
        cartas[i] = cartas[sorteada];
        cartas[sorteada] = guardada;
    }

    let tabuleiro = document.getElementById('board');
    tabuleiro.innerHTML = '';

    for (let i = 0; i < cartas.length; i++) {
        encontradas.push(false);
        tabuleiro.innerHTML += '<button type="button" class="card" id="carta' + i + '" onclick="virarCarta(' + i + ')"></button>';
        mostrarVerso(i);
    }

    mostrarPlacar();
    mostrarTempo();
}

function virarCarta(indice) {
    if (esperando == null && primeiraCarta != indice && !encontradas[indice]) {
        if (cronometro == null) {
            cronometro = setTimeout(contarSegundo, 1000);
        }

        let personagem = cartas[indice];
        let botao = document.getElementById('carta' + indice);
        botao.innerHTML = '<img class="card-face portrait-' + personagens[personagem] + '" src="assets/imgs/' + personagens[personagem] + '.jpeg" alt="' + nomes[personagem] + '">';
        botao.className = 'card open';

        if (primeiraCarta == -1) {
            primeiraCarta = indice;
        } else {
            segundaCarta = indice;
            tentativas++;

            if (cartas[primeiraCarta] == cartas[segundaCarta]) {
                guardarPar();
            } else {
                esperando = setTimeout(desvirarCartas, 750);
            }

            mostrarPlacar();
        }
    }
}

function guardarPar() {
    pares++;
    encontradas[primeiraCarta] = true;
    encontradas[segundaCarta] = true;
    document.getElementById('carta' + primeiraCarta).className = 'card open done';
    document.getElementById('carta' + segundaCarta).className = 'card open done';
    document.getElementById('carta' + primeiraCarta).disabled = true;
    document.getElementById('carta' + segundaCarta).disabled = true;
    primeiraCarta = -1;
    segundaCarta = -1;

    if (pares == 6) {
        finalizarPartida();
    }
}

function desvirarCartas() {
    mostrarVerso(primeiraCarta);
    mostrarVerso(segundaCarta);
    primeiraCarta = -1;
    segundaCarta = -1;
    esperando = null;
}

function finalizarPartida() {
    clearTimeout(cronometro);
    aproveitamento = (pares / tentativas * 100).toFixed(0);
    escolherCartaMemoria(tentativas);

    let resumo = 'Jogo da memória concluído · ' + aproveitamento + '% de acerto em ' + tentativas + ' tentativas';
    setTimeout(function () {
        mostrarCartaEpisodio(idDaCarta, resumo, motivoDaCarta, 'memoria');
    }, 700);

    registrarPartida({
        jogo: 'memoria',
        venceu: 1,
        tentativas: tentativas,
        paresEncontrados: pares,
        rodadasConcluidas: '',
        erros: tentativas - pares,
        duracaoSegundos: segundos,
        idMensagem: idDaCarta
    });
}

iniciarJogo();
