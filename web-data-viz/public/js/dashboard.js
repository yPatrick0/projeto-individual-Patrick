const nomesDosJogos = ["Jogo da memória", "Sequência"];
const coresDosJogos = ["#2a78c4", "#d96f1f"];

let idUsuario = sessionStorage.ID_USUARIO;
let partidas = [0, 0];
let tempos = [0, 0];
let graficoPartidas = null;
let graficoTempo = null;

function mostrarAviso(texto) {
    let aviso = document.getElementById("aviso-dados");
    aviso.innerHTML = texto;
    aviso.hidden = false;
}

function mostrarErro() {
    let kpis = ["kpi-total", "kpi-tempo", "kpi-aproveitamento", "kpi-rodadas"];
    for (let i = 0; i < kpis.length; i++) {
        document.getElementById(kpis[i]).innerHTML = "—";
    }
    mostrarAviso("Não foi possível carregar os dados. Confira se o servidor (npm start) e o MySQL estão rodando e se a internet está ligada (o Chart.js vem da internet).");
}

function desenharGraficos() {
    if (graficoPartidas == null) {
        graficoPartidas = new Chart(document.getElementById("grafico-partidas"), {
            type: "bar",
            data: {
                labels: nomesDosJogos,
                datasets: [{ label: "Partidas", data: partidas, backgroundColor: coresDosJogos }]
            },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });

        graficoTempo = new Chart(document.getElementById("grafico-tempo"), {
            type: "bar",
            data: {
                labels: nomesDosJogos,
                datasets: [{ label: "Tempo médio (s)", data: tempos, backgroundColor: coresDosJogos }]
            },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });
    } else {
        graficoPartidas.data.datasets[0].data = partidas;
        graficoPartidas.update();
        graficoTempo.data.datasets[0].data = tempos;
        graficoTempo.update();
    }
}

function carregarPainel() {
    document.getElementById("aviso-dados").hidden = true;
    carregarAlbum();

    fetch("/partidas/por-jogo/" + idUsuario).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (linhas) {
                partidas = [0, 0];
                for (let i = 0; i < linhas.length; i++) {
                    if (linhas[i].jogo == "memoria") {
                        partidas[0] = Number(linhas[i].total_partidas);
                    } else {
                        partidas[1] = Number(linhas[i].total_partidas);
                    }
                }
                let total = partidas[0] + partidas[1];

                pegarPrimeiroNome();
                if (total == 0) {
                    document.getElementById("suas-partidas").innerHTML = primeiroNome + ", você ainda não terminou nenhuma partida com login.";
                    document.getElementById("kpi-total").innerHTML = "0";
                    document.getElementById("tabela-corpo").innerHTML = '<tr><td colspan="3">Você ainda não tem partidas.</td></tr>';
                    mostrarAviso('Você ainda não tem partidas. Jogue o <a href="index.html#jogo">jogo da memória</a> ou a <a href="jogo-aventura.html">Sequência</a> com login e volte aqui para ver seus resultados.');
                } else {
                    document.getElementById("suas-partidas").innerHTML = primeiroNome + ", você jogou <strong>" + total + "</strong> partida(s): "
                        + partidas[0] + " no jogo da memória e " + partidas[1] + " na Sequência.";
                    document.getElementById("kpi-total").innerHTML = total;
                    carregarTempos(total);
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

function carregarTempos(total) {
    fetch("/partidas/tempo-medio/" + idUsuario).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (linhas) {
                tempos = [0, 0];
                for (let i = 0; i < linhas.length; i++) {
                    if (linhas[i].jogo == "memoria") {
                        tempos[0] = Number(linhas[i].tempo_medio_segundos);
                    } else {
                        tempos[1] = Number(linhas[i].tempo_medio_segundos);
                    }
                }

                let somaDosTempos = tempos[0] * partidas[0] + tempos[1] * partidas[1];
                document.getElementById("kpi-tempo").innerHTML = Math.round(somaDosTempos / total) + " s";

                let tabela = "";
                for (let i = 0; i < nomesDosJogos.length; i++) {
                    tabela += "<tr><td>" + nomesDosJogos[i] + "</td><td>" + partidas[i] + "</td><td>" + tempos[i] + "</td></tr>";
                }
                document.getElementById("tabela-corpo").innerHTML = tabela;

                desenharGraficos();
            });
        }
    });
}

function carregarAproveitamento() {
    fetch("/partidas/aproveitamento-memoria/" + idUsuario).then(function (resposta) {
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
    fetch("/partidas/media-rodadas/" + idUsuario).then(function (resposta) {
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
    fetch("/partidas/album/" + idUsuario).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (linhas) {
                let html = "";
                let abertas = 0;

                for (let i = 0; i < linhas.length; i++) {
                    let vezes = Number(linhas[i].vezes_recebida);
                    let mensagem = mensagensDosEpisodios[linhas[i].id - 1];

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
    mostrarCartaEpisodio(idMensagem, "Do seu álbum · recebida " + vezes + "x", "", "");
}

mostrarUsuarioNoMenu("nav-usuario");
carregarPainel();
