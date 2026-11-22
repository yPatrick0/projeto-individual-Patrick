// ============================================================
// MENSAGENS DOS EPISÓDIOS - usadas pelos dois jogos
// Ao terminar uma partida, o jogador recebe uma destas mensagens.
//
// <<< EDITE AQUI PARA INCLUIR OU TROCAR MENSAGENS >>>
// Cada objeto do vetor tem:
//   personagem: quem diz a frase ou protagoniza a cena
//   episodio:   título original do episódio (para procurar no streaming)
//   temporada e numero: temporada e número do episódio
//   frase:      fala da série. Deixe "" quando ainda não tiver a fala conferida.
//   origemFrase: de onde veio a frase (ex.: "tradução livre", "dublagem")
//   licao:      a lição em uma frase. É a MINHA interpretação do episódio.
// Regra do projeto: não inventar falas. Só preencha "frase" com algo conferido.
// IMPORTANTE: os ids são os mesmos da tabela mensagem do banco
// (banco-de-dados/script.sql). Se incluir ou mudar uma mensagem aqui,
// faça o mesmo INSERT/UPDATE na tabela mensagem.
// ============================================================
const mensagensDosEpisodios = [
    {
        id: 1,
        personagem: "Jake",
        episodio: "Puhoy",
        temporada: 5,
        numero: 16,
        frase: "Você tá se enrolando nos seus problemas imaginários.",
        origemFrase: "fala informada pelo autor (dublagem brasileira)",
        licao: "Nem todo silêncio quer dizer que algo deu errado. Antes de sofrer por um problema, vale conferir se ele existe mesmo."
    },
    {
        id: 2,
        personagem: "Jake",
        episodio: "His Hero",
        temporada: 1,
        numero: 25,
        frase: "Ser ruim em alguma coisa é o primeiro passo para ficar meio bom nela.",
        origemFrase: "tradução livre",
        licao: "Errar faz parte de aprender. Cada tentativa deixa você um pouco melhor."
    },
    {
        id: 3,
        personagem: "Finn, Jake, Marceline e Princesa Jujuba",
        episodio: "What Was Missing",
        temporada: 3,
        numero: 10,
        frase: "",
        origemFrase: "",
        licao: "Dizer o que sentimos aproxima as pessoas, mesmo quando dá medo."
    },
    {
        id: 4,
        personagem: "Finn e Jake",
        episodio: "Incendium",
        temporada: 3,
        numero: 26,
        frase: "",
        origemFrase: "",
        licao: "Guardar a tristeza não faz ela sumir. Aceitar ajuda também é coragem."
    },
    {
        id: 5,
        personagem: "Marceline e Rei Gelado",
        episodio: "I Remember You",
        temporada: 4,
        numero: 25,
        frase: "",
        origemFrase: "",
        licao: "Algumas lembranças ficam com a gente porque vieram junto com uma emoção forte."
    },
    {
        id: 6,
        personagem: "Finn",
        episodio: "Breezy",
        temporada: 6,
        numero: 6,
        frase: "",
        origemFrase: "",
        licao: "Depois de um término, cada pessoa tem o seu tempo para seguir em frente."
    },
    {
        id: 7,
        personagem: "Finn",
        episodio: "The Hall of Egress",
        temporada: 7,
        numero: 24,
        frase: "",
        origemFrase: "",
        licao: "Persistir também pode significar mudar de estratégia."
    }
];

const ONDE_ASSISTIR = "Hora de Aventura está na HBO Max e na Netflix (o catálogo pode mudar).";

// Guarda a última mensagem sorteada para não repetir duas vezes seguidas
let ultimaMensagemSorteada = -1;

// Sorteia uma mensagem do vetor, diferente da anterior
function sortearMensagem() {
    let indice = Math.floor(Math.random() * mensagensDosEpisodios.length);
    if (mensagensDosEpisodios.length > 1 && indice == ultimaMensagemSorteada) {
        indice = (indice + 1) % mensagensDosEpisodios.length;
    }
    ultimaMensagemSorteada = indice;
    return mensagensDosEpisodios[indice];
}

// Monta o texto "Temporada 5 · Episódio 16"
function descreverEpisodio(mensagem) {
    let texto = "Temporada " + mensagem.temporada;
    if (mensagem.numero > 0) {
        texto = texto + " · Episódio " + mensagem.numero;
    }
    return texto;
}

// Escreve a mensagem dentro do elemento com o id informado e mostra o elemento
function mostrarMensagemEpisodio(idDoElemento, mensagem) {
    let html = '<p class="mensagem-rotulo">Mensagem de Hora de Aventura</p>';

    if (mensagem.frase != "") {
        html = html + '<blockquote class="mensagem-frase">“' + mensagem.frase + '”</blockquote>';
        html = html + '<p class="mensagem-autor">— ' + mensagem.personagem + ' (' + mensagem.origemFrase + ')</p>';
    } else {
        html = html + '<p class="mensagem-autor">' + mensagem.personagem + '</p>';
    }

    html = html + '<p class="mensagem-licao"><strong>Lição:</strong> ' + mensagem.licao + '</p>';
    html = html + '<p class="mensagem-episodio-info">Episódio: <strong>' + mensagem.episodio + '</strong> · '
        + descreverEpisodio(mensagem) + '</p>';
    html = html + '<p class="mensagem-onde">' + ONDE_ASSISTIR + ' A lição é uma interpretação do autor do site.</p>';

    let elemento = document.getElementById(idDoElemento);
    elemento.innerHTML = html;
    elemento.hidden = false;
}
