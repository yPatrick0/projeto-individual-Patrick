// Demonstração local: nenhum resultado é salvo ou enviado ao servidor.
let personagens = ['finn', 'jake', 'marceline', 'bmo', 'rei-gelado', 'princesa-jujuba'];
let nomes = ['Finn', 'Jake', 'Marceline', 'BMO', 'Rei Gelado', 'Princesa Jujuba'];
let cartas = [];
let cartasEncontradas = [];
let primeiraCarta = -1;
let segundaCarta = -1;
let tentativas = 0;
let paresEncontrados = 0;
let temporizador = null;

let tabuleiro = document.getElementById('board');
let resultado = document.getElementById('stats');

function atualizarResultado() {
    let mensagem = '';

    if (paresEncontrados == personagens.length) {
        mensagem = 'Você encontrou todos os pares! ';
    }

    resultado.innerHTML = mensagem + paresEncontrados + ' de ' + personagens.length
        + ' pares · ' + tentativas + ' tentativas';
}

function iniciarJogo() {
    // Evita que uma espera da partida anterior esconda cartas da nova partida.
    clearTimeout(temporizador);
    temporizador = null;
    primeiraCarta = -1;
    segundaCarta = -1;
    tentativas = 0;
    paresEncontrados = 0;
    cartas = [];
    cartasEncontradas = [];

    // Cada número indica um personagem. As duas cópias usam o mesmo retrato.
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
    // Não conta clique repetido, carta resolvida ou clique durante a espera.
    if (temporizador != null || primeiraCarta == indice || cartasEncontradas[indice]) {
        return;
    }

    let botao = document.getElementById('carta' + indice);
    let personagemDaCarta = cartas[indice];
    // O caminho depende do personagem, não da posição: os dois retratos são iguais.
    botao.innerHTML = '<img class="card-face" src="assets/imgs/'
        + personagens[personagemDaCarta] + '-rosto.webp" alt="">';
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
        } else {
            // Mantém o intervalo de 750 ms usado no protótipo.
            temporizador = setTimeout(esconderCartas, 750);
        }

        atualizarResultado();
    }
}

document.getElementById('reset').setAttribute('onclick', 'iniciarJogo()');
iniciarJogo();
