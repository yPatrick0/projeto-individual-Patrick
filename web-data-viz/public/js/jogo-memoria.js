let personagens = ['finn', 'jake', 'marceline', 'bmo', 'rei-gelado', 'princesa-jujuba'];
let nomes = ['Finn', 'Jake', 'Marceline', 'BMO', 'Rei Gelado', 'Princesa Jujuba'];
let fotos = ['finn.jpeg', 'jake.jpeg', 'marceline.jpeg', 'bmo.jpeg', 'rei-gelado.jpeg', 'princesa-jujuba.jpeg'];
let cartas = [];
let cartasEncontradas = [];
let primeiraCarta = -1;
let segundaCarta = -1;
let tentativas = 0;
let paresEncontrados = 0;
let temporizador = null;
let segundosDaPartida = 0;
let temporizadorCronometro = null;
let aproveitamento = 0;

let tabuleiro = document.getElementById('board');
let resultado = document.getElementById('stats');

function atualizarResultado() {
    let mensagem = '';

    if (paresEncontrados == personagens.length) {
        mensagem = 'Você encontrou todos os pares! ';
    }

    resultado.innerHTML = mensagem + paresEncontrados + ' de ' + personagens.length
        + ' pares · ' + tentativas + ' tentativas';

    if (paresEncontrados == personagens.length) {
        resultado.innerHTML = resultado.innerHTML
            + ' · ' + aproveitamento + '% de acerto'
            + ' <button type="button" class="botao-ver-carta" onclick="reabrirCartaEpisodio()">Ver carta</button>';
    }
}

function atualizarCronometro() {
    let minutos = Math.floor(segundosDaPartida / 60);
    let segundos = segundosDaPartida % 60;
    let zero = '';

    if (segundos < 10) {
        zero = '0';
    }
    document.getElementById('cronometro').innerHTML = 'Tempo: ' + minutos + ':' + zero + segundos;
}

function contarSegundo() {
    segundosDaPartida++;
    atualizarCronometro();
    temporizadorCronometro = setTimeout(contarSegundo, 1000);
}

function iniciarJogo() {
    clearTimeout(temporizador);
    clearTimeout(temporizadorCronometro);
    temporizador = null;
    temporizadorCronometro = null;
    primeiraCarta = -1;
    segundaCarta = -1;
    tentativas = 0;
    paresEncontrados = 0;
    segundosDaPartida = 0;
    cartas = [];
    cartasEncontradas = [];

    for (let i = 0; i < personagens.length; i++) {
        cartas.push(i);
        cartas.push(i);
    }

    for (let i = cartas.length - 1; i > 0; i--) {
        let posicaoSorteada = Math.floor(Math.random() * (i + 1));
        let cartaTemporaria = cartas[i];
        cartas[i] = cartas[posicaoSorteada];
        cartas[posicaoSorteada] = cartaTemporaria;
    }

    tabuleiro.innerHTML = '';

    for (let i = 0; i < cartas.length; i++) {
        cartasEncontradas.push(false);
        tabuleiro.innerHTML += '<button type="button" class="card" id="carta' + i + '" onclick="virarCarta(' + i + ')">'
            + '<img class="card-back" src="assets/imgs/verso-ooo.svg" alt="Carta ' + (i + 1) + '">'
            + '</button>';
    }

    atualizarResultado();
    atualizarCronometro();
}

function esconderCarta(indice) {
    let botao = document.getElementById('carta' + indice);
    botao.innerHTML = '<img class="card-back" src="assets/imgs/verso-ooo.svg" alt="Carta ' + (indice + 1) + '">';
    botao.className = 'card';
}

function esconderCartas() {
    esconderCarta(primeiraCarta);
    esconderCarta(segundaCarta);
    primeiraCarta = -1;
    segundaCarta = -1;
    temporizador = null;
}

function marcarPar(indice) {
    let botao = document.getElementById('carta' + indice);
    cartasEncontradas[indice] = true;
    botao.className = 'card open done';
    botao.disabled = true;
}

function virarCarta(indice) {
    if (temporizador == null && primeiraCarta != indice && !cartasEncontradas[indice]) {
        if (temporizadorCronometro == null) {
            temporizadorCronometro = setTimeout(contarSegundo, 1000);
        }

        let botao = document.getElementById('carta' + indice);
        let personagemDaCarta = cartas[indice];
        botao.innerHTML = '<img class="card-face portrait-' + personagens[personagemDaCarta]
            + '" src="assets/imgs/' + fotos[personagemDaCarta] + '" alt="' + nomes[personagemDaCarta] + '">';
        botao.className = 'card open';

        if (primeiraCarta == -1) {
            primeiraCarta = indice;
        } else {
            segundaCarta = indice;
            tentativas++;

            if (cartas[primeiraCarta] == cartas[segundaCarta]) {
                paresEncontrados++;
                marcarPar(primeiraCarta);
                marcarPar(segundaCarta);
                primeiraCarta = -1;
                segundaCarta = -1;

                if (paresEncontrados == personagens.length) {
                    finalizarPartida();
                }
            } else {
                temporizador = setTimeout(esconderCartas, 750);
            }

            atualizarResultado();
        }
    }
}

function finalizarPartida() {
    clearTimeout(temporizadorCronometro);
    aproveitamento = (paresEncontrados / tentativas * 100).toFixed(0);
    escolherCartaMemoria(tentativas);

    let idCarta = idDaCarta;
    let resumo = 'Jogo da memória concluído · ' + aproveitamento + '% de acerto em ' + tentativas + ' tentativas';
    let motivo = motivoDaCarta;

    setTimeout(function () {
        mostrarCartaEpisodio(idCarta, resumo, motivo, 'memoria');
    }, 700);

    registrarPartida({
        jogo: 'memoria',
        venceu: 1,
        tentativas: tentativas,
        paresEncontrados: paresEncontrados,
        rodadasConcluidas: '',
        erros: tentativas - paresEncontrados,
        duracaoSegundos: segundosDaPartida,
        idMensagem: idCarta
    });
}

iniciarJogo();
