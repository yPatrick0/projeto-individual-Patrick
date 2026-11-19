# Minijogo Sequência de Ooo (versão 1)

## Arquivos
- `web-data-viz/public/jogo-aventura.html`
- `web-data-viz/public/css/jogo-aventura.css`
- `web-data-viz/public/js/jogo-aventura.js`
- Imagens usadas (já existentes no projeto): `assets/imgs/finn-rosto.webp`, `jake-rosto.webp`, `marceline-rosto.webp`, `bmo-rosto.webp`.

## Link na página inicial (`web-data-viz/public/index.html`)
Link já incluído ao lado do botão "Jogar memória":

```html
<a class="button" href="jogo-aventura.html">Jogar Sequência de Ooo</a>
```

O jogo volta para `index.html` pelo link "Voltar ao início".

## Como trocar as frases
Arquivo `web-data-viz/public/js/jogo-aventura.js`, vetor **`frasesDoJogo`** (no início do arquivo).
Cada frase é um objeto com `id` (único), `momento` ("durante" = após cada rodada; "final" = tela de resultado), `tema`, `texto`, `provisoria` e `fonte`.
Mantenha pelo menos 5 frases "durante" (há 5 pausas por partida) e 1 "final". Se for usar fala real do desenho, informe a origem em `fonte`.

Os textos entregues por Claude foram preservados e identificados como provisórios fornecidos por IA, pendentes de revisão pelo autor. Não são citações do desenho nem fontes científicas verificadas.

## Regras
6 rodadas; a sequência cresce um passo por rodada; 3 vidas; cada erro custa uma vida e repete a sequência. Vence quem conclui as 6 rodadas. Valores em constantes no topo do JS (`TOTAL_RODADAS`, `VIDAS_INICIAIS`, tempos).

## Objeto de resultado (gerado em `finalizarPartida`)
`jogo`, `dataHora`, `venceu`, `rodadasConcluidas`, `totalRodadas`, `erros`, `duracaoSegundos`, `fkUsuario` (null até existir login).
Fica em `ultimoResultado` e `historicoDePartidas` (memória; perdido ao recarregar a página).
A função `enviarResultadoParaApi(resultado)` já existe, apenas registra no console e tem o `fetch` comentado. **Não há persistência no banco.**

## Indicadores propostos (a confirmar)
1. **Rodadas concluídas por partida**: média de `rodadasConcluidas`.
2. **Erros por partida**: média de `erros`.
3. **Duração**: média de `duracaoSegundos` (idealmente só partidas com `venceu = 1`).
Sem registros, o dashboard deve mostrar "sem partidas ainda", sem inventar números.

## Sugestão de tabela MySQL (não executada)
```sql
CREATE TABLE partida (
    idPartida INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NULL,
    jogo VARCHAR(40) NOT NULL,
    dataHora DATETIME NOT NULL,
    venceu TINYINT NOT NULL,
    rodadasConcluidas INT NOT NULL,
    totalRodadas INT NOT NULL,
    erros INT NOT NULL,
    duracaoSegundos INT NOT NULL
);
-- Exemplos:
-- SELECT AVG(rodadasConcluidas) FROM partida WHERE jogo = 'sequencia-de-ooo';
-- SELECT AVG(erros) FROM partida WHERE jogo = 'sequencia-de-ooo';
-- SELECT AVG(duracaoSegundos) FROM partida WHERE jogo = 'sequencia-de-ooo' AND venceu = 1;
```
Observação: o `AGENTS.md` pede para não definir pontuação e indicadores sem decisão do autor. Aqui eles foram escolhidos por delegação explícita no pedido e continuam sujeitos à sua aprovação. Não há pontuação.
