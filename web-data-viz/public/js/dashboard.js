// ============================================================
// DASHBOARD - Memórias de Aventura
// Busca os indicadores na API (rotas /partidas/...) e desenha
// os números (KPIs) e os gráficos com Chart.js.
// ============================================================

// Vetores com os dois jogos, na mesma ordem em todo o painel
const codigosDosJogos = ["memoria", "sequencia"];
const nomesDosJogos = ["Jogo da memória", "Sequência"];
const coresDosJogos = ["#2a78c4", "#d96f1f"];   // azul = memória, laranja = sequência

// Guardam os gráficos para poder apagá-los antes de desenhar de novo
let graficoPartidas = null;
let graficoTempo = null;

// Procura, nas linhas que vieram do banco, o valor de um campo para um jogo.
// Se o jogo ainda não tiver partidas, devolve 0.
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

function esconderAviso() {
    document.getElementById("aviso-dados").hidden = true;
}

function limparKpis() {
    document.getElementById("kpi-total").innerHTML = "—";
    document.getElementById("kpi-aproveitamento").innerHTML = "—";
    document.getElementById("kpi-rodadas").innerHTML = "—";
    document.getElementById("kpi-tempo").innerHTML = "—";
}

// Desenha um gráfico de barras simples (uma barra por jogo)
function desenharGrafico(idDoCanvas, graficoAntigo, valores, unidade) {
    if (graficoAntigo != null) {
        graficoAntigo.destroy();
    }

    let contexto = document.getElementById(idDoCanvas);
    return new Chart(contexto, {
        type: "bar",
        data: {
            labels: nomesDosJogos,
            datasets: [{
                data: valores,
                backgroundColor: coresDosJogos,
                borderRadius: 4,
                maxBarThickness: 72
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },   // uma série só: o título já explica
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            return item.raw + " " + unidade;
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#e6e1d3" } }
            }
        }
    });
}

function preencherTabela(partidas, tempos) {
    let linhasHtml = "";
    for (let i = 0; i < codigosDosJogos.length; i++) {
        linhasHtml = linhasHtml + "<tr><td>" + nomesDosJogos[i] + "</td><td>" + partidas[i] + "</td><td>" + tempos[i] + "</td></tr>";
    }
    document.getElementById("tabela-corpo").innerHTML = linhasHtml;
}

// Função principal: chamada ao abrir a página e no botão "Atualizar dados"
function carregarPainel() {
    esconderAviso();

    if (typeof Chart == "undefined") {
        mostrarAviso("A biblioteca de gráficos (Chart.js) não carregou. Confira a conexão com a internet.");
    }

    let partidas = [0, 0];
    let tempos = [0, 0];
    let totalDePartidas = 0;

    fetch(enderecoApi("/partidas/por-jogo"))
        .then(function (resposta) {
            if (!resposta.ok) {
                throw "Erro " + resposta.status;
            }
            return resposta.json();
        })
        .then(function (linhas) {
            for (let i = 0; i < codigosDosJogos.length; i++) {
                partidas[i] = valorDoJogo(linhas, codigosDosJogos[i], "total_partidas");
                totalDePartidas = totalDePartidas + partidas[i];
            }

            if (totalDePartidas == 0) {
                limparKpis();
                document.getElementById("kpi-total").innerHTML = "0";
                mostrarAviso("Ainda não há partidas registradas. Jogue o jogo da memória ou a Sequência e volte aqui.");
                return;
            }

            document.getElementById("kpi-total").innerHTML = totalDePartidas;
            return carregarTempos(partidas, tempos, totalDePartidas);
        })
        .catch(function (erro) {
            console.log("Erro ao carregar o painel: " + erro);
            limparKpis();
            mostrarAviso("Não foi possível carregar os dados. Confira se o servidor (npm start) e o MySQL estão rodando.");
        });
}

// Tempo médio por jogo + tempo médio geral (média ponderada pelo número de partidas)
function carregarTempos(partidas, tempos, totalDePartidas) {
    return fetch(enderecoApi("/partidas/tempo-medio"))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (linhas) {
            let somaPonderada = 0;
            for (let i = 0; i < codigosDosJogos.length; i++) {
                tempos[i] = valorDoJogo(linhas, codigosDosJogos[i], "tempo_medio_segundos");
                somaPonderada = somaPonderada + tempos[i] * partidas[i];
            }
            let tempoGeral = Math.round(somaPonderada / totalDePartidas);
            document.getElementById("kpi-tempo").innerHTML = tempoGeral + " s";

            preencherTabela(partidas, tempos);
            if (typeof Chart != "undefined") {
                graficoPartidas = desenharGrafico("grafico-partidas", graficoPartidas, partidas, "partidas");
                graficoTempo = desenharGrafico("grafico-tempo", graficoTempo, tempos, "segundos");
            }
            return carregarAproveitamento();
        });
}

function carregarAproveitamento() {
    return fetch(enderecoApi("/partidas/aproveitamento-memoria"))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            // Sem partidas da memória, o banco devolve null na média
            if (dados.aproveitamento_medio == null) {
                document.getElementById("kpi-aproveitamento").innerHTML = "sem partidas";
            } else {
                document.getElementById("kpi-aproveitamento").innerHTML = Number(dados.aproveitamento_medio).toFixed(1) + "%";
            }
            return carregarMediaRodadas();
        });
}

function carregarMediaRodadas() {
    return fetch(enderecoApi("/partidas/media-rodadas"))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            if (dados.media_rodadas == null) {
                document.getElementById("kpi-rodadas").innerHTML = "sem partidas";
            } else {
                document.getElementById("kpi-rodadas").innerHTML = Number(dados.media_rodadas).toFixed(1) + " de 6";
            }
            return carregarEpisodios();
        });
}

// Ranking dos episódios: dados da tabela mensagem ligados à tabela partida (JOIN)
function carregarEpisodios() {
    return fetch(enderecoApi("/partidas/episodios-mais-indicados"))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (linhas) {
            let html = "";
            for (let i = 0; i < linhas.length; i++) {
                let vezes = Number(linhas[i].vezes_indicado);
                let palavra = "vezes";
                if (vezes == 1) {
                    palavra = "vez";
                }
                html = html + "<li><strong>" + linhas[i].episodio + "</strong>"
                    + " <span>T" + linhas[i].temporada + " · ep. " + linhas[i].numero_episodio + "</span>"
                    + " <em>" + vezes + " " + palavra + "</em></li>";
            }
            if (linhas.length == 0) {
                html = '<li class="ranking-vazio">Nenhuma mensagem registrada ainda.</li>';
            }
            document.getElementById("ranking-episodios").innerHTML = html;
        });
}

// Quantas partidas a pessoa logada jogou (rota /partidas/usuario/:id)
function carregarPartidasDoUsuario() {
    let idUsuario = sessionStorage.ID_USUARIO;
    let primeiroNome = sessionStorage.NOME_USUARIO.split(" ")[0];

    fetch(enderecoApi("/partidas/usuario/" + idUsuario))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (linhas) {
            let memoria = valorDoJogo(linhas, "memoria", "total_partidas");
            let sequencia = valorDoJogo(linhas, "sequencia", "total_partidas");
            let total = memoria + sequencia;

            let texto = primeiroNome + ", você ainda não terminou nenhuma partida com login.";
            if (total > 0) {
                texto = primeiroNome + ", você jogou <strong>" + total + "</strong> partida(s): "
                    + memoria + " no jogo da memória e " + sequencia + " na Sequência.";
            }
            document.getElementById("suas-partidas").innerHTML = texto;
        })
        .catch(function (erro) {
            console.log("Erro ao buscar as partidas do usuário: " + erro);
        });
}

mostrarUsuarioNoMenu("nav-usuario");   // função de js/sessao.js
carregarPainel();
carregarPartidasDoUsuario();
