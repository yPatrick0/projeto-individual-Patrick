# Hora de Aventura e Neurociência

Nome provisório do Projeto Individual de **Patrick Scaglia Rodrigues**, desenvolvido no primeiro semestre de Análise e Desenvolvimento de Sistemas da **SPTech**, em 2026.2.

## Sobre o projeto

Hora de Aventura fez parte da minha infância e continua me proporcionando novas formas de enxergar situações, sentimentos e relacionamentos. Este projeto nasce desse vínculo pessoal com o desenho e da curiosidade por compreender aspectos da memória, da aprendizagem e do comportamento.

A proposta é desenvolver um site com personagens, episódios, frases e reflexões, aproximando situações da série de conceitos de autoconhecimento e neurociência. Quero que o visitante encontre algum aprendizado e perceba outras possibilidades de leitura por trás das aventuras.

O projeto não tem um nicho específico: sua motivação é pessoal, mas qualquer pessoa poderá explorar o conteúdo. Relatos pessoais detalhados não fazem parte do escopo inicial.

## Estado atual

Base Web Data Viz/AquaTech incorporada em 17/11/2026. Em 18/11/2026, a página inicial recebeu o visual, conteúdo e imagens locais do protótipo editável, com links para as páginas existentes de cadastro e login. Essas duas telas continuam sendo somente preparação: não enviam dados nem autenticam usuários. Integração, adaptação do banco e demais funcionalidades continuam pendentes.

Cadastro e login agora compartilham a identidade visual da inicial: paleta, fontes, botões, imagem local e formulário responsivo. Os avisos de integração pendente e os botões de envio desabilitados foram mantidos.

O jogo da memória está disponível como demonstração local com seis pares de personagens (12 cartas), verso comum e contador de tentativas. Não salva resultados, não usa o banco e não é um teste científico. As regras de comparação, conclusão e reinício foram preservadas. O título e as seções foram ajustados para computador e celular; os cartões e o jogo usam retratos individuais.

Em 19/11/2026 foi integrado o minijogo **Sequência de Ooo**, entregue pelo Claude, com botão na inicial: repita a sequência de Finn, Jake, Marceline e BMO, em 6 rodadas e com 3 vidas. Os quatro retratos locais foram reaproveitados. As frases fornecidas por IA continuam provisórias, pendentes de revisão pelo autor, e não são citações da série. Resultados e histórico ficam apenas em memória e são perdidos ao recarregar, sem API ou banco. Não é um teste científico. Regras e detalhes em [`docs/jogo-sequencia-de-ooo.md`](docs/jogo-sequencia-de-ooo.md); indicadores ali sugeridos não foram implementados nem aprovados nesta integração.

As fontes e os recortes estão em [`public/assets/imgs/fontes.md`](web-data-viz/public/assets/imgs/fontes.md). Conteúdo pessoal e permissões de uso das imagens precisam de revisão pelo autor antes de publicação.

A página principal é `web-data-viz/public/index.html`. O código foi reorganizado com CSS separado para início e autenticação e o jogo em JavaScript com funções nomeadas em português. A cópia `Prototipo_Hora_de_Aventura.html` da raiz foi preservada como referência histórica, sem substituir a página principal.

## Escopo e decisões

| Item | Situação |
| --- | --- |
| Conteúdo sobre personagens, episódios, frases e reflexões | Apresentação de personagens incorporada; demais conteúdos planejados |
| Cadastro com validações e login | Previsto nas entregas acadêmicas |
| Integração da API com MySQL | Obrigatória |
| Dashboard com indicadores de dados do sistema | Obrigatório; indicadores a definir |
| Jogo da memória com personagens | Demonstração local disponível: seis pares, 12 cartas, tentativas e reinício |
| Minijogo Sequência de Ooo | Integrado à inicial; 6 rodadas, 3 vidas e resultados somente em memória |
| Quiz de afinidade com personagens | Proposta anterior, sem confirmação |
| Nome definitivo e seleção final de conteúdos | A definir |

O jogo embaralha 12 cartas com retratos de Finn, Jake, Marceline, BMO, Rei Gelado e Princesa Jujuba. Uma tentativa corresponde à escolha de duas cartas diferentes; os pares corretos permanecem revelados e os incorretos fecham após 750 ms. O reinício embaralha e zera a partida, inclusive qualquer comparação pendente. Frases ou reflexões por par e dados registrados permanecem em avaliação, sem implementação.

Tempo de partida, tentativas e partidas concluídas são possibilidades para o dashboard, não requisitos aprovados. Os resultados descreverão a atividade no site, sem representar uma avaliação científica da memória do visitante.

## Tecnologias

- HTML e CSS para estrutura e apresentação.
- JavaScript para interação, validações e lógica.
- Node.js para a API.
- MySQL para persistência de dados.
- Web Data Viz/AquaTech da faculdade como base de arquitetura.
- VM Linux dedicada ao banco, conforme a exigência acadêmica.

## Organização atual

A aplicação está na pasta já reservada `web-data-viz/`, sem outra aplicação aninhada.

| Caminho | Finalidade |
| --- | --- |
| `banco-de-dados/` | Modelagem e scripts SQL |
| `ti/` | Documentação acadêmica e requisitos |
| `docs/` | Planejamento e diário de prompts |
| `web-data-viz/public/` | Páginas `index.html`, `cadastro.html` e `login.html` |
| `web-data-viz/public/css/estilo.css` | Estilos da página inicial |
| `web-data-viz/public/css/cadastro-login.css` | Estilos compartilhados por cadastro e login |
| `web-data-viz/public/js/jogo-memoria.js` | Lógica local do jogo; `js/script.js` original preservado, sem uso nas páginas |
| `web-data-viz/public/jogo-aventura.html`, `public/css/jogo-aventura.css` e `public/js/jogo-aventura.js` | Página, estilos exclusivos e lógica do minijogo Sequência de Ooo |
| `Prototipo_Hora_de_Aventura.html` e `web-data-viz/public/css/prototipo.css` | Referência histórica preservada; não são a página principal nem o CSS ativo dela |
| `web-data-viz/public/assets/img/` | Pasta reservada para imagens, atualmente apenas com `.gitkeep` |
| `web-data-viz/public/assets/imgs/` | Oito WebP originais preservados, seis retratos `*-rosto.webp`, verso `verso-ooo.svg` e registro de fontes em `fontes.md` |
| `web-data-viz/src/` | Backend, seguindo o material da turma |
| `web-data-viz/src/database/` | Configuração MySQL e SQL original AquaTech, ainda não adaptado nem executado |
| `web-data-viz/app.js` | Inicialização do servidor |
| `AGENTS.md` | Orientações para assistentes de programação para todo o projeto |
| `README.md` | Apresentação, organização e execução do projeto |

## Requisitos acadêmicos

Aplicar variáveis, funções, operações matemáticas, condicionais, repetições e vetores; desenvolver modelo lógico e relacionamentos; demonstrar o fluxo entre frontend, API e banco; manter documentação, Trello e histórico no Git público. Preparar apresentação de dez minutos, incluindo motivação pessoal, valores, dificuldades e superação.

## Uso de IA e conteúdo

A IA será utilizada como apoio ao aprendizado. Os pedidos, assistentes utilizados, resultados aproveitados e alterações devem ser registrados em `docs/diario-de-prompts.md`. O autor precisa compreender e explicar o código entregue.

Frases do desenho devem ter sua origem identificada. Reflexões autorais e interpretações das cenas devem ser diferenciadas de afirmações científicas, que precisam de fontes verificadas.

## Execução

No terminal, a partir da raiz do projeto:

```bash
cd web-data-viz
npm install
```

Na primeira configuração, copie `.env.example` para `.env.dev` nessa mesma pasta. No PowerShell, use `Copy-Item .env.example .env.dev`; no Git Bash, `cp .env.example .env.dev`. Não substitua uma configuração local que já tenha preenchido. Nesta preparação, `.env.dev` já foi criado sem credenciais.

Depois, dentro de `web-data-viz/`:

```bash
npm start
```

Abra <http://localhost:3333/>. As outras páginas são `/cadastro.html` e `/login.html`. Para encerrar, pressione `Ctrl+C` no terminal.

Para o novo minijogo, abra <http://localhost:3333/jogo-aventura.html> ou use **Jogar Sequência de Ooo** no destaque inicial ou na seção de jogos (`#jogo`). A inicial é <http://localhost:3333/> (também acessível por `/index.html`); **Voltar ao início** retorna a `/index.html`. Se o PowerShell bloquear `npm.ps1`, use `npm.cmd start` dentro de `web-data-viz/`, sem alterar a política de scripts.

O `app.js` original carrega `.env.dev` no modo desenvolvimento. O `.env.example` contém a porta 3333 e campos de banco sem usuário ou senha. Não é necessário conectar ao MySQL para acessar as páginas. Não versione `.env`, `.env.dev` nem `node_modules/`; o `.gitignore` existente já os protege e permite `.env.example`.

O fluxo da base foi preservado: **rotas → controllers → models → database**. Os arquivos do servidor, dependências e SQL da turma foram mantidos; as telas AquaTech de dashboard e simulador não foram importadas. O backend ainda é o exemplo AquaTech, não uma API adaptada ou pronta para publicação.

### Verificações desta etapa

- Na revisão da navegação (19/11/2026), aplicação iniciada com `npm.cmd start`; Chrome automatizado aprovou inicial → botão na seção de jogos → jogo → começar partida → voltar à inicial em 320, 390 e 1280px. Botão visível com o estilo existente, sem transbordamento horizontal. Páginas, CSS, JavaScript e quatro retratos responderam HTTP 200; nenhuma exceção JavaScript. Permanece somente o 404 preexistente de `/favicon.ico`. Protótipo histórico preservado.

- Na integração de Sequência de Ooo (19/11/2026), página, CSS, JavaScript e quatro retratos responderam HTTP 200 com conteúdo igual ao disco. Chrome real aprovou navegação pela inicial e retorno, início, bloqueios de cliques, perda das três vidas/derrota, repetição após erro, seis rodadas/vitória, frases e reinício durante pausa/exibição. Resultados reais ficaram em memória e foram zerados ao recarregar. Layout conferido em 320, 390 e 1280px, sem transbordamento; capturas de celular e computador inspecionadas. Sem exceções JavaScript; permanece apenas o 404 preexistente de `/favicon.ico`. Sintaxe JavaScript aprovada. Sem mudanças em dependências, configurações, backend ou banco.

- No ajuste visual e temático (18/11/2026), o Chrome confirmou ausência de transbordamento e sobreposição do título em oito larguras de 320 a 1440px. Inspecionados os seis personagens em capturas de computador e celular; jogo com imagens, pares idênticos, bloqueios, conclusão e reinício aprovados. Páginas, CSS, JavaScript e imagens responderam HTTP 200, sem exceções JavaScript. O transbordamento registrado na etapa anterior foi corrigido.
- Na reorganização (18/11/2026), as três páginas, os dois CSS ativos, o JavaScript e as oito imagens responderam HTTP 200. Testes automatizados no Chrome real aprovaram o jogo completo, estilos, imagens e o bloqueio dos formulários, sem exceções JavaScript. Capturas em 1280px e 390px foram inspecionadas; há transbordamento horizontal preexistente em 390px, também confirmado no protótipo da raiz, mantido para preservar o visual nesta etapa.
- Na incorporação do protótipo (18/11/2026), `npm start` entregou início, cadastro, login, ambos os CSS, JavaScript do jogo e as oito imagens com HTTP 200 e conteúdo igual aos arquivos locais. Links e fragmentos internos conferidos; sintaxe JavaScript e lógica do jogo verificadas em DOM simulado. Aparência e interação em navegador continuam pendentes.
- Dependências instaladas e `npm start` executado; início, cadastro, login e CSS responderam HTTP 200.
- Na revisão da organização, `npm start` e `npm run dev` foram verificados novamente: ambos entregaram as três páginas e o CSS com HTTP 200.
- Links, título e bloqueio de envio dos formulários conferidos no HTML; aparência e interação em navegador não foram testadas manualmente.
- MySQL, cadastro e autenticação não foram testados. Nenhum SQL foi executado.
- `npm audit` apontou 7 vulnerabilidades de severidade alta na cadeia do `nodemon`. Nenhuma correção automática foi aplicada para não alterar a base sem revisão.
