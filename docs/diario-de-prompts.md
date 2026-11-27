# Diário de Prompts

Registro do uso de Inteligência Artificial no projeto **Memórias de Aventura**.

Usei assistentes de IA, como ChatGPT e OpenCode, como mentores: eu pedia para a IA me explicar como fazer cada parte e, em várias delas, ela também mostrou ou escreveu o código. Testei tudo no meu computador, pedi ajustes, fiz os commits e revisei o código para conseguir explicá-lo.

## Minhas regras ao usar IA

1. **Só conceitos da aula:** sempre pedi que o código usasse apenas o que vimos em aula e no Web Data Viz (`let`, `if/else`, `for`, vetores, `innerHTML`, `fetch`...).
2. **Eu faço os commits:** a IA não fez commit nem push; eu fiz todos pelo terminal
3. **Sem inventar falas:** nenhuma frase ou episódio de Hora de Aventura foi inventado. Quando a lição é uma interpretação minha, o site avisa.

## Como cada registro está organizado

- **Prompt (o que pedi):** o pedido que fiz para a IA.
- **Resposta da IA (o que ela fez):** como a IA respondeu e o que ela fez ou explicou.
- **O que aprendi:** o que ficou para mim depois daquele pedido.

## Resumo

| Etapa        | Registros                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Planejamento | 1. Estrutura do projeto                                                                         |
| Site         | 2. HTML e CSS · 3. Visual do site · 4. Ajustes de CSS                                           |
| Jogos        | 5. Jogo da memória · 6. Sequência                                                               |
| API          | 7. Conexão com a API                                                                            |
| Usuário      | 8. Cadastro e login                                                                             |
| Dashboard    | 9. Dashboard completo · 10. Gráficos e indicadores · 11. KPI da Sequência · 12. Limite de tempo |
| Git          | 13. Git                                                                                         |

---

## Etapa: Planejamento

### 1. Estrutura do projeto

**Prompt (o que pedi):** "Como organizo o meu projeto em cima do Web Data Viz da turma?"

**Resposta da IA (o que ela fez):** explicou para que serve cada pasta do Web Data Viz e montou a estrutura do projeto: o site em `public/`, a API em `src/` e o banco em `banco-de-dados/`.

**O que aprendi:** `public/` é o que aparece no navegador, `src/` é a API que conversa com o banco, e o `npm start` sobe o servidor na porta 3333.

---

## Etapa: Site

### 2. HTML e CSS

**Prompt (o que pedi):** "Como deixo o site com cara de Hora de Aventura e funcionando no celular?"

**Resposta da IA (o que ela fez):** sugeriu cores e layout e escreveu o CSS a partir do meu protótipo; eu pedi os ajustes até ficar do meu jeito.

**O que aprendi:** variáveis no CSS, `flex`, `grid` e `@media` para telas pequenas.

### 3. Visual do site

**Prompt (o que pedi):** "Consegue fazer uma logo com um cérebro e uma espada enfiada nele para eu usar do lado do nome do site? E deixa cada carta de episódio com uma foto diferente."

**Resposta da IA (o que ela fez):** desenhou a logo em SVG (um cérebro atravessado por uma espada, sem copiar a espada original do Finn), colocou a logo no menu e como ícone da aba (favicon) e trocou as fotos das cartas para cada episódio ter uma imagem diferente.

**O que aprendi:** um arquivo `.svg` é uma imagem feita de código, o favicon é colocado com `<link rel="icon">` e as fotos de cada carta ficam no vetor de objetos `mensagensDosEpisodios`.

### 4. Ajustes de CSS

**Prompt (o que pedi):** "A parte dos personagens está muito grande na vertical. E a logo que coloquei do lado do nome ficou gigante, por quê?"

**Resposta da IA (o que ela fez):** mudou a proporção das fotos dos personagens de quadrada para retangular e explicou que a logo ficou enorme porque uma regra do CSS valia para todas as imagens do site; corrigiu deixando a logo com largura e altura fixas.

**O que aprendi:** `aspect-ratio: 3 / 2` controla a proporção da imagem, e uma regra geral como `img { width: 100% }` afeta todas as imagens, então às vezes é preciso dar um tamanho só para aquela.

---

## Etapa: Jogos

### 5. Jogo da memória

**Prompt (o que pedi):** "Como faço um jogo da memória baseado no projeto que te enviei e com os conceitos que aprendi em aula?" (o projeto de referência foi o Memory Game de Thiago de Paula Souza, citado no README)

**Resposta da IA (o que ela fez):** me deu ideias e explicou como eu poderia fazer; eu testei e pedi alguns ajustes.

**O que aprendi:** vetor de cartas, `Math.random()` para embaralhar, `for` para criar as cartas e `if` para comparar o par.

### 6. Sequência

**Prompt (o que pedi):** "Como faço os personagens acenderem numa sequência que cresce a cada rodada?"

**Resposta da IA (o que ela fez):** mostrou o código com `setTimeout` e explicou a lógica das rodadas, das vidas e de como comparar o clique do jogador com a sequência.

**O que aprendi:** `setTimeout` para criar pausas, `push` para aumentar a sequência, comparar posição por posição no vetor e contar erros.

---

## Etapa: API

### 7. Conexão com a API

**Prompt (o que pedi):** "Como o meu site manda os dados para o banco pela API?"

**Resposta da IA (o que ela fez):** explicou o caminho do `fetch` até o MySQL e criou as rotas de usuário e de partida.

**O que aprendi:** `fetch` com `POST`, `JSON.stringify` e o caminho rota → controller → model → banco.

---

## Etapa: Usuário

### 8. Cadastro e login

**Prompt (o que pedi):** "Como valido a senha no cadastro e guardo quem está logado?, baseado em alguns exercicios da aula"

**Resposta da IA (o que ela fez):** mostrou a validação da senha e o login e explicou cada regra (tamanho, maiúscula, minúscula, número e caractere especial).

**O que aprendi:** percorrer a senha com `senha[i]`, usar `.includes()` e guardar o usuário no `sessionStorage`.

---

## Etapa: Dashboard

### 9. Dashboard completo

**Prompt (o que pedi):** "Me ajuda a dashboard do meu projeto? Quero mostrar os resultados dos dois jogos de quem está logado, com KPIs, gráficos e o álbum de cartas, usando o que vimos em aula, porém quero te acompanhar passo a passo para aprender."

**Resposta da IA (o que ela fez):** me ajudou a escolher os indicadores, montou a página do dashboard (HTML, CSS e JavaScript), criou as consultas no `partidaModel`, as funções no controller e as rotas de cada indicador, e explicou como cada parte se liga.

**O que aprendi:** cada indicador do dashboard tem o seu caminho completo: o `fetch` chama uma rota, a rota chama o controller, o controller chama o model e o `SELECT` devolve os dados para a tela. Também aprendi a montar os cards de KPI e a usar o álbum para mostrar as cartas que a pessoa já recebeu.

### 10. Gráficos e indicadores

**Prompt (o que pedi):** "Como mostro só os dados de quem está logado com Chart.js?"

**Resposta da IA (o que ela fez):** escreveu as consultas e os gráficos e explicou o filtro por usuário.

**O que aprendi:** `WHERE fk_usuario`, `COUNT`, `AVG` e `LEFT JOIN`.

### 11. KPI da Sequência

**Prompt (o que pedi):** "Verifica se a KPI 'aproveitamento na memória' faz sentido. Já a 'média de rodadas na Sequência' não faz sentido pra mim, porque dá sempre 6 de 6."

**Resposta da IA (o que ela fez):** conferiu as contas no meu banco e explicou que o aproveitamento estava certo, mas que a média de rodadas sempre dá 6 quando a pessoa vence. Eu escolhi trocar pela **média de erros**, e ela mudou o SQL, o controller, a rota, o dashboard e o README.

**O que aprendi:** um indicador precisa mudar conforme a pessoa joga melhor ou pior; `AVG(erros)` mostra a precisão mesmo quando a pessoa vence. Também aprendi que, quando muda algo no `src`, é preciso reiniciar o `npm start`.

### 12. Limite de tempo

**Prompt (o que pedi):** "Adiciona uma validação para, quando qualquer um dos jogos passar de 1 minuto e 30 segundos, travar o tempo, para ninguém deixar aberto e afetar o dashboard."

**Resposta da IA (o que ela fez):** mudou a função `contarSegundo()` dos dois jogos para o cronômetro parar em 1:30 e mostrar "(limite)", e me passou o `UPDATE` para corrigir as partidas antigas no banco.

**O que aprendi:** o cronômetro só agenda o próximo segundo com `if (segundos < 90)`. Também aprendi que o MySQL Workbench bloqueia `UPDATE` sem chave no `WHERE` (safe update) e que dá para liberar com `SET SQL_SAFE_UPDATES = 0`.

---

## Etapa: Git

### 13. Git

**Prompt (o que pedi):** "Por que o meu push foi recusado?"

**Resposta da IA (o que ela fez):** explicou que o repositório no GitHub tinha mudanças que eu não tinha no computador e me passou os comandos para resolver.

**O que aprendi:** `git pull --rebase` antes do `git push`.
