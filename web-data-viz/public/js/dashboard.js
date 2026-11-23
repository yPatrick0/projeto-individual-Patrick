const codigosDosJogos = ["memoria", "sequencia"];
const nomesDosJogos = ["Jogo da memória", "Sequência"];
const coresDosJogos = ["#2a78c4", "#d96f1f"];

let graficoPartidas = null;
let graficoTempo = null;

function idDoUsuarioLogado() {
    return sessionStorage.ID_USUARIO;
}

function valorDoJogo(linhas, jogo, campo) {
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].jogo == jogo) {
            return Number(linhas[i][campo]);
        }
    }
    return 0;
}

function mostrarAviso(texto) {
    let aviso = document.getElementById("aviso-dados");
    aviso.innerHTML = texto;
    aviso.hidden = false;
}

function mostrarErro() {
    document.getElementById("kpi-total").innerHTML = "—";
    document.getElementById("kpi-tempo").innerHTML = "—";
    document.getElementById("kpi-aproveitamento").innerHTML = "—";
    document.getElementById("kpi-rodadas").innerHTML = "—";
    mostrarAviso("Não foi possível carregar os dados. Confira se o servidor (npm start) e o MySQL estão rodando e se a internet está ligada (o Chart.js vem da internet).");
}

function desenharGrafico(idDoCanvas, grafico, nomeDaSerie, valores) {
    if (grafico != null) {
        grafico.data.datasets[0].data = valores;
        grafico.update();
        return grafico;
    }

    let dados = {
        labels: nomesDosJogos,
        datasets: [{
            label: nomeDaSerie,
            data: valores,
            backgroundColor: coresDosJogos
        }]
    };

    const config = {
        type: "bar",
        data: dados,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    };

    return new Chart(document.getElementById(idDoCanvas), config);
}

function preencherTabela(partidas, tempos) {
    let linhasHtml = "";
    for (let i = 0; i < codigosDosJogos.length; i++) {
        linhasHtml += "<tr><td>" + nomesDosJogos[i] + "</td><td>" + partidas[i] + "</td><td>" + tempos[i] + "</td></tr>";
    }
    document.getElementById("tabela-corpo").innerHTML = linhasHtml;
}

function mostrarSuasPartidas(partidas) {
    let primeiroNome = sessionStorage.NOME_USUARIO.split(" ")[0];
    let total = partidas[0] + partidas[1];

    let texto = primeiroNome + ", você ainda não terminou nenhuma partida com login.";
    if (total > 0) {
        texto = primeiroNome + ", você jogou <strong>" + total + "</strong> partida(s): "
            + partidas[0] + " no jogo da memória e " + partidas[1] + " na Sequência.";
    }
    document.getElementById("suas-partidas").innerHTML = texto;
}

function mostrarPainelVazio() {
    document.getElementById("kpi-total").innerHTML = "0";
    document.getElementById("tabela-corpo").innerHTML = '<tr><td colspan="3">Você ainda não tem partidas.</td></tr>';
    mostrarAviso('Você ainda não tem partidas. Jogue o <a href="index.html#jogo">jogo da memória</a> ou a <a href="jogo-aventura.html">Sequência</a> com login e volte aqui para ver seus resultados.');
}

function carregarPainel() {
    fetch(enderecoApi("/partidas/por-jogo/" + idDoUsuarioLogado())).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (linhas) {
                let partidas = [0, 0];
                for (let i = 0; i < codigosDosJogos.length; i++) {
                    partidas[i] = valorDoJogo(linhas, codigosDosJogos[i], "total_partidas");
                }
                let total = partidas[0] + partidas[1];

                mostrarSuasPartidas(partidas);

                if (total == 0) {
                    mostrarPainelVazio();
                } else {
                    document.getElementById("kpi-total").innerHTML = total;
                    carregarTempos(partidas, total);
                    carregarAproveitamento();
                    carregarMediaRodadas();
                }
            });
        } else {
            mostrarErro();
        }
    }).catch(function (erro) {
        console.log("Erro ao carregar o painel: " + erro);
        mostrarErro();
    });
}

function carregarTempos(partidas, total) {
    fetch(enderecoApi("/partidas/tempo-medio/" + idDoUsuarioLogado())).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (linhas) {
                let tempos = [0, 0];
                let somaPonderada = 0;
                for (let i = 0; i < codigosDosJogos.length; i++) {
                    tempos[i] = valorDoJogo(linhas, codigosDosJogos[i], "tempo_medio_segundos");
                    somaPonderada += tempos[i] * partidas[i];
                }
                document.getElementById("kpi-tempo").innerHTML = Math.round(somaPonderada / total) + " s";

                preencherTabela(partidas, tempos);
                graficoPartidas = desenharGrafico("grafico-partidas", graficoPartidas, "Partidas", partidas);
                graficoTempo = desenharGrafico("grafico-tempo", graficoTempo, "Tempo médio (s)", tempos);
            });
        }
    });
}

function carregarAproveitamento() {
    fetch(enderecoApi("/partidas/aproveitamento-memoria/" + idDoUsuarioLogado())).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (dados) {
                if (dados.aproveitamento_medio == null) {
                    document.getElementById("kpi-aproveitamento").innerHTML = "sem partidas";
                } else {
                    document.getElementById("kpi-aproveitamento").innerHTML = dados.aproveitamento_medio + "%";
                }
            });
        }
    });
}

function carregarMediaRodadas() {
    fetch(enderecoApi("/partidas/media-rodadas/" + idDoUsuarioLogado())).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (dados) {
                if (dados.media_rodadas == null) {
                    document.getElementById("kpi-rodadas").innerHTML = "sem partidas";
                } else {
                    document.getElementById("kpi-rodadas").innerHTML = dados.media_rodadas + " de 6";
                }
            });
        }
    });
}

function carregarAlbum() {
    fetch(enderecoApi("/partidas/album/" + idDoUsuarioLogado())).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (linhas) {
                let html = "";
                let abertas = 0;

                for (let i = 0; i < linhas.length; i++) {
                    let vezes = Number(linhas[i].vezes_recebida);
                    let mensagem = buscarMensagem(linhas[i].id);

                    if (vezes > 0) {
                        abertas++;
                        html += '<li><button type="button" class="album-carta" onclick="abrirCartaDoAlbum(' + mensagem.id + ', ' + vezes + ')">'
                            + '<img src="assets/imgs/' + mensagem.fotos[0] + '" alt="">'
                            + '<strong>' + mensagem.episodio + '</strong>'
                            + '<span>T' + mensagem.temporada + ' E' + mensagem.numero + ' · ' + vezes + 'x</span>'
                            + '</button></li>';
                    } else {
                        html += '<li><div class="album-carta album-bloqueada" aria-label="Carta bloqueada">'
                            + '<span class="album-cadeado" aria-hidden="true">?</span>'
                            + '<span>Bloqueada</span>'
                            + '</div></li>';
                    }
                }

                document.getElementById("album-cartas").innerHTML = html;
                document.getElementById("album-contagem").innerHTML = abertas + " de " + linhas.length + " cartas";
                document.getElementById("album-barra").style.width = (abertas / linhas.length * 100) + "%";
            });
        } else {
            document.getElementById("album-cartas").innerHTML = '<li class="album-vazio">Não foi possível carregar o álbum.</li>';
        }
    }).catch(function (erro) {
        console.log("Erro ao carregar o álbum: " + erro);
        document.getElementById("album-cartas").innerHTML = '<li class="album-vazio">Não foi possível carregar o álbum.</li>';
    });
}

function abrirCartaDoAlbum(idMensagem, vezes) {
    let palavra = "vezes";
    if (vezes == 1) {
        palavra = "vez";
    }
    mostrarCartaEpisodio({
        mensagem: buscarMensagem(idMensagem),
        resumo: "Do seu álbum · recebida " + vezes + " " + palavra,
        motivo: "",
        jogo: ""
    });
}

mostrarUsuarioNoMenu("nav-usuario");
carregarPainel();
carregarAlbum();
