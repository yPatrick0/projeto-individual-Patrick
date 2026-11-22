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
//   fotos:      rosto(s) do personagem na carta (arquivos em assets/imgs)
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
        licao: "Nem todo silêncio quer dizer que algo deu errado. Antes de sofrer por um problema, vale conferir se ele existe mesmo.",
        fotos: ["jake-rosto.webp"]
    },
    {
        id: 2,
        personagem: "Jake",
        episodio: "His Hero",
        temporada: 1,
        numero: 25,
        frase: "Ser ruim em alguma coisa é o primeiro passo para ficar meio bom nela.",
        origemFrase: "tradução livre",
        licao: "Errar faz parte de aprender. Cada tentativa deixa você um pouco melhor.",
        fotos: ["jake-rosto.webp"]
    },
    {
        id: 3,
        personagem: "Finn, Jake, Marceline e Princesa Jujuba",
        episodio: "What Was Missing",
        temporada: 3,
        numero: 10,
        frase: "",
        origemFrase: "",
        licao: "Dizer o que sentimos aproxima as pessoas, mesmo quando dá medo.",
        fotos: ["finn-rosto.webp", "jake-rosto.webp", "marceline-rosto.webp", "princesa-jujuba-rosto.webp"]
    },
    {
        id: 4,
        personagem: "Finn e Jake",
        episodio: "Incendium",
        temporada: 3,
        numero: 26,
        frase: "",
        origemFrase: "",
        licao: "Guardar a tristeza não faz ela sumir. Aceitar ajuda também é coragem.",
        fotos: ["finn-rosto.webp", "jake-rosto.webp"]
    },
    {
        id: 5,
        personagem: "Marceline e Rei Gelado",
        episodio: "I Remember You",
        temporada: 4,
        numero: 25,
        frase: "",
        origemFrase: "",
        licao: "Algumas lembranças ficam com a gente porque vieram junto com uma emoção forte.",
        fotos: ["marceline-rosto.webp", "rei-gelado-rosto.webp"]
    },
    {
        id: 6,
        personagem: "Finn",
        episodio: "Breezy",
        temporada: 6,
        numero: 6,
        frase: "",
        origemFrase: "",
        licao: "Depois de um término, cada pessoa tem o seu tempo para seguir em frente.",
        fotos: ["finn-rosto.webp"]
    },
    {
        id: 7,
        personagem: "Finn",
        episodio: "The Hall of Egress",
        temporada: 7,
        numero: 24,
        frase: "",
        origemFrase: "",
        licao: "Persistir também pode significar mudar de estratégia.",
        fotos: ["finn-rosto.webp"]
    }
];

const ONDE_ASSISTIR = "Hora de Aventura está na HBO Max e na Netflix (o catálogo pode mudar).";

// Procura a mensagem pelo id (o mesmo id da tabela mensagem do banco)
function buscarMensagem(id) {
    for (let i = 0; i < mensagensDosEpisodios.length; i++) {
        if (mensagensDosEpisodios[i].id == id) {
            return mensagensDosEpisodios[i];
        }
    }
    return mensagensDosEpisodios[0];
}

// Sorteia uma mensagem entre os ids da lista, ex.: sortearMensagem([1, 3, 4])
function sortearMensagem(listaDeIds) {
    let posicao = Math.floor(Math.random() * listaDeIds.length);
    return buscarMensagem(listaDeIds[posicao]);
}
