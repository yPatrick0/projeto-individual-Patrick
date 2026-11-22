// Jogo da memória: ao encontrar os seis pares, mostra a mensagem de um episódio
// e envia o resultado para a API (ver js/registrar-partida.js).
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
let inicioDaPartida = 0;   // Date.now() do primeiro clique; 0 = partida ainda não começou

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
    inicioDaPartida = 0;
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
    document.getElementById('mensagem-episodio').hidden = true;

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

    // O tempo da partida começa no primeiro clique, não quando a página abre.
    if (inicioDaPartida == 0) {
        inicioDaPartida = Date.now();
    }

    let botao = document.getElementById('carta' + indice);
    let personagemDaCarta = cartas[indice];
    // O caminho depende do personagem, não da posição: os dois retratos são iguais.
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
            // Mantém o intervalo de 750 ms usado no protótipo.
            temporizador = setTimeout(esconderCartas, 750);
        }

        atualizarResultado();
    }
}

// Chamada quando os seis pares são encontrados.
function finalizarPartida() {
    let duracaoSegundos = Math.round((Date.now() - inicioDaPartida) / 1000);

    // Sorteia e mostra a mensagem de um episódio (funções em js/mensagens-episodios.js).
    // O id da mensagem vai para o banco, na coluna fk_mensagem da tabela partida.
    let mensagem = sortearMensagem();
    mostrarMensagemEpisodio('mensagem-episodio', mensagem);

    // Envia o resultado para o banco (função em js/registrar-partida.js)
    // Erros = tentativas que não formaram par.
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
