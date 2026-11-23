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
        fotos: ["jake.jpeg"]
    },
    {
        id: 2,
        personagem: "Jake",
        episodio: "O Herói Dele",
        temporada: 1,
        numero: 25,
        frase: "Ser ruim em alguma coisa é o primeiro passo para ficar meio bom nela.",
        origemFrase: "tradução livre",
        licao: "Errar faz parte de aprender. Cada tentativa deixa você um pouco melhor.",
        fotos: ["jake.jpeg"]
    },
    {
        id: 3,
        personagem: "Finn, Jake, Marceline e Princesa Jujuba",
        episodio: "O Que Faltava",
        temporada: 3,
        numero: 10,
        frase: "",
        origemFrase: "",
        licao: "Dizer o que sentimos aproxima as pessoas, mesmo quando dá medo.",
        fotos: ["finn.jpeg", "jake.jpeg", "marceline.jpeg", "princesa-jujuba.jpeg"]
    },
    {
        id: 4,
        personagem: "Finn e Jake",
        episodio: "Incêndio",
        temporada: 3,
        numero: 26,
        frase: "",
        origemFrase: "",
        licao: "Guardar a tristeza não faz ela sumir. Aceitar ajuda também é coragem.",
        fotos: ["finn.jpeg", "jake.jpeg"]
    },
    {
        id: 5,
        personagem: "Marceline e Rei Gelado",
        episodio: "Me Lembro de Você",
        temporada: 4,
        numero: 25,
        frase: "",
        origemFrase: "",
        licao: "Algumas lembranças ficam com a gente porque vieram junto com uma emoção forte.",
        fotos: ["marceline.jpeg", "rei-gelado.jpeg"]
    },
    {
        id: 6,
        personagem: "Finn",
        episodio: "Breezinha",
        temporada: 6,
        numero: 6,
        frase: "",
        origemFrase: "",
        licao: "Depois de um término, cada pessoa tem o seu tempo para seguir em frente.",
        fotos: ["finn.jpeg"]
    },
    {
        id: 7,
        personagem: "Finn",
        episodio: "O Salão de Saída",
        temporada: 7,
        numero: 24,
        frase: "",
        origemFrase: "",
        licao: "Persistir também pode significar mudar de estratégia.",
        fotos: ["finn.jpeg"]
    }
];

const ONDE_ASSISTIR = "HBO Max e YouTube";

function buscarMensagem(id) {
    for (let i = 0; i < mensagensDosEpisodios.length; i++) {
        if (mensagensDosEpisodios[i].id == id) {
            return mensagensDosEpisodios[i];
        }
    }
    return mensagensDosEpisodios[0];
}

function sortearMensagem(listaDeIds) {
    let posicao = Math.floor(Math.random() * listaDeIds.length);
    return buscarMensagem(listaDeIds[posicao]);
}
