// ============================================================
// DASHBOARD - Memórias de Aventura
// Busca os indicadores na API (rotas /partidas/.../idUsuario) e desenha
// os números (KPIs) e os gráficos com Chart.js.
// Cada pessoa vê só as partidas que jogou com login.
// ============================================================

// Vetores com os dois jogos, na mesma ordem em todo o painel
const codigosDosJogos = ["memoria", "sequencia"];
const nomesDosJogos = ["Jogo da memória", "Sequência"];
const coresDosJogos = ["#2a78c4", "#d96f1f"];   // azul = memória, laranja = sequência

// Guardam os gráficos para atualizar depois com update()
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

// Id de quem está logado (guardado no login, em js/login.js)
function idDoUsuarioLogado() {
    return sessionStorage.ID_USUARIO;
}

// Deixa o painel vazio (conta nova, sem partidas)
function limparGraficosETabela() {
    if (graficoPartidas != null) {
        graficoPartidas = desenharGrafico("grafico-partidas", graficoPartidas, "Partidas", [0, 0]);
    }
    if (graficoTempo != null) {
        graficoTempo = desenharGrafico("grafico-tempo", graficoTempo, "Tempo médio (s)", [0, 0]);
    }
    document.getElementById("tabela-corpo").innerHTML = '<tr><td colspan="3">Você ainda não tem partidas.</td></tr>';
}

function limparKpis() {
    document.getElementById("kpi-total").innerHTML = "—";
    document.getElementById("kpi-aproveitamento").innerHTML = "—";
    document.getElementById("kpi-rodadas").innerHTML = "—";
    document.getElementById("kpi-tempo").innerHTML = "—";
}

// Desenha um gráfico de barras (uma barra por jogo), no mesmo jeito do
// dashboard do Web Data Viz: monta "dados" e "config" e cria com new Chart(...).
// Se o gráfico já existe (botão "Atualizar dados"), só troca os valores e chama update().
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
            maintainAspectRatio: false,          // usa a altura da caixa do gráfico
            plugins: {
                legend: { display: false }       // uma série só: o título já explica
            },
            scales: {
                y: { beginAtZero: true }         // eixo começa no zero
            }
        }
    };

    return new Chart(document.getElementById(idDoCanvas), config);
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
    carregarAlbum();

    let partidas = [0, 0];
    let tempos = [0, 0];
    let totalDePartidas = 0;

    fetch(enderecoApi("/partidas/por-jogo/" + idDoUsuarioLogado()))
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
                limparGraficosETabela();
                document.getElementById("kpi-total").innerHTML = "0";
                mostrarAviso('Você ainda não tem partidas. Jogue o <a href="index.html#jogo">jogo da memória</a> ou a <a href="jogo-aventura.html">Sequência</a> com login e volte aqui para ver seus resultados.');
                return;
            }

            document.getElementById("kpi-total").innerHTML = totalDePartidas;
            return carregarTempos(partidas, tempos, totalDePartidas);
        })
        .catch(function (erro) {
            console.log("Erro ao carregar o painel: " + erro);
            limparKpis();
            mostrarAviso("Não foi possível carregar os dados. Confira se o servidor (npm start) e o MySQL estão rodando e se a internet está ligada (o Chart.js vem da internet).");
        });
}

// Tempo médio por jogo + tempo médio geral (média ponderada pelo número de partidas)
function carregarTempos(partidas, tempos, totalDePartidas) {
    return fetch(enderecoApi("/partidas/tempo-medio/" + idDoUsuarioLogado()))
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
            graficoPartidas = desenharGrafico("grafico-partidas", graficoPartidas, "Partidas", partidas);
            graficoTempo = desenharGrafico("grafico-tempo", graficoTempo, "Tempo médio (s)", tempos);
            return carregarAproveitamento();
        });
}

function carregarAproveitamento() {
    return fetch(enderecoApi("/partidas/aproveitamento-memoria/" + idDoUsuarioLogado()))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            // Sem partidas da memória, o banco devolve null na média
            if (dados.aproveitamento_medio == null) {
                document.getElementById("kpi-aproveitamento").innerHTML = "sem partidas";
            } else {
                document.getElementById("kpi-aproveitamento").innerHTML = dados.aproveitamento_medio + "%";
            }
            return carregarMediaRodadas();
        });
}

function carregarMediaRodadas() {
    return fetch(enderecoApi("/partidas/media-rodadas/" + idDoUsuarioLogado()))
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            if (dados.media_rodadas == null) {
                document.getElementById("kpi-rodadas").innerHTML = "sem partidas";
            } else {
                document.getElementById("kpi-rodadas").innerHTML = dados.media_rodadas + " de 6";
            }
        });
}

// ÁLBUM DE CARTAS: as 7 mensagens; as que a pessoa já recebeu ficam abertas.
// Dados: rota /partidas/album/:idUsuario (LEFT JOIN entre mensagem e partida).
// Fotos, frases e lições vêm de js/mensagens-episodios.js (mesmos ids do banco).
function carregarAlbum() {
    fetch(enderecoApi("/partidas/album/" + idDoUsuarioLogado()))
        .then(function (resposta) {
            if (!resposta.ok) {
                throw "Erro " + resposta.status;
            }
            return resposta.json();
        })
        .then(function (linhas) {
            let html = "";
            let abertas = 0;

            for (let i = 0; i < linhas.length; i++) {
                let vezes = Number(linhas[i].vezes_recebida);
                let mensagem = buscarMensagem(linhas[i].id);

                if (vezes > 0) {
                    abertas++;
                    html = html + '<li><button type="button" class="album-carta" onclick="abrirCartaDoAlbum(' + mensagem.id + ', ' + vezes + ')">'
                        + '<img src="assets/imgs/' + mensagem.fotos[0] + '" alt="">'
                        + '<strong>' + mensagem.episodio + '</strong>'
                        + '<span>T' + mensagem.temporada + ' E' + mensagem.numero + ' · ' + vezes + 'x</span>'
                        + '</button></li>';
                } else {
                    html = html + '<li><div class="album-carta album-bloqueada" aria-label="Carta bloqueada">'
                        + '<span class="album-cadeado" aria-hidden="true">?</span>'
                        + '<span>Bloqueada</span>'
                        + '</div></li>';
                }
            }

            document.getElementById("album-cartas").innerHTML = html;
            document.getElementById("album-contagem").innerHTML = abertas + " de " + linhas.length + " cartas";
            document.getElementById("album-barra").style.width = (abertas / linhas.length * 100) + "%";
        })
        .catch(function (erro) {
            console.log("Erro ao carregar o álbum: " + erro);
            document.getElementById("album-cartas").innerHTML = '<li class="album-vazio">Não foi possível carregar o álbum.</li>';
        });
}

// Abre a carta completa ao clicar no álbum (função de js/carta-episodio.js)
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

// Quantas partidas a pessoa logada jogou (rota /partidas/usuario/:id)
function carregarPartidasDoUsuario() {
    let idUsuario = idDoUsuarioLogado();
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
