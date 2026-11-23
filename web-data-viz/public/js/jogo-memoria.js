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
let inicioDaPartida = 0;
let temporizadorCronometro = null;

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
            + ' <button type="button" class="botao-ver-carta" onclick="reabrirCartaEpisodio()">Ver carta</button>';
    }
}

function formatarTempo(totalSegundos) {
    let minutos = Math.floor(totalSegundos / 60);
    let segundos = totalSegundos % 60;

    if (segundos < 10) {
        return minutos + ':0' + segundos;
    }
    return minutos + ':' + segundos;
}

function atualizarCronometro() {
    let segundos = 0;

    if (inicioDaPartida != 0) {
        segundos = Math.floor((Date.now() - inicioDaPartida) / 1000);
    }
    document.getElementById('cronometro').innerHTML = 'Tempo: ' + formatarTempo(segundos);
}

function rodarCronometro() {
    atualizarCronometro();
    temporizadorCronometro = setTimeout(rodarCronometro, 1000);
}

function iniciarJogo() {
    clearTimeout(temporizador);
    clearTimeout(temporizadorCronometro);
    temporizador = null;
    primeiraCarta = -1;
    segundaCarta = -1;
    tentativas = 0;
    paresEncontrados = 0;
    inicioDaPartida = 0;
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

        let botao = document.createElement('button');
        botao.id = 'carta' + i;
        botao.className = 'card';
        botao.innerHTML = '<img class="card-back" src="assets/imgs/verso-ooo.svg" alt="">';
        botao.setAttribute('type', 'button');
        botao.setAttribute('aria-label', 'Virar carta ' + (i + 1));
        botao.setAttribute('onclick', 'virarCarta(' + i + ')');
        tabuleiro.appendChild(botao);
    }

    atualizarResultado();
    atualizarCronometro();
}

function esconderCarta(indice) {
    let botao = document.getElementById('carta' + indice);
    botao.innerHTML = '<img class="card-back" src="assets/imgs/verso-ooo.svg" alt="">';
    botao.className = 'card';
    botao.setAttribute('aria-label', 'Virar carta ' + (indice + 1));
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
    botao.setAttribute('disabled', '');
}

function virarCarta(indice) {
    if (temporizador != null || primeiraCarta == indice || cartasEncontradas[indice]) {
        return;
    }

    if (inicioDaPartida == 0) {
        inicioDaPartida = Date.now();
        rodarCronometro();
    }

    let botao = document.getElementById('carta' + indice);
    let personagemDaCarta = cartas[indice];
    botao.innerHTML = '<img class="card-face portrait-' + personagens[personagemDaCarta]
        + '" src="assets/imgs/' + fotos[personagemDaCarta] + '" alt="">';
    botao.className = 'card open';
    botao.setAttribute('aria-label', nomes[personagemDaCarta]);

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

function finalizarPartida() {
    clearTimeout(temporizadorCronometro);
    atualizarCronometro();

    let duracaoSegundos = Math.round((Date.now() - inicioDaPartida) / 1000);

    let carta = escolherCartaMemoria(tentativas);
    let mensagem = carta.mensagem;

    setTimeout(function () {
        mostrarCartaEpisodio({
            mensagem: mensagem,
            resumo: 'Jogo da memória concluído · 6 pares em ' + tentativas + ' tentativas',
            motivo: carta.motivo,
            jogo: 'memoria'
        });
    }, 700);

    registrarPartida({
        jogo: 'memoria',
        venceu: 1,
        tentativas: tentativas,
        paresEncontrados: paresEncontrados,
        rodadasConcluidas: '',
        erros: tentativas - paresEncontrados,
        duracaoSegundos: duracaoSegundos,
        idMensagem: mensagem.id
    });
}

document.getElementById('reset').setAttribute('onclick', 'iniciarJogo()');
iniciarJogo();
