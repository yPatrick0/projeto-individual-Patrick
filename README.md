# Hora de Aventura e Neurociência

Nome provisório do Projeto Individual de **Patrick Scaglia Rodrigues**, desenvolvido no primeiro semestre de Análise e Desenvolvimento de Sistemas da **SPTech**, em 2026.2.

## Sobre o projeto

Hora de Aventura fez parte da minha infância e continua me proporcionando novas formas de enxergar situações, sentimentos e relacionamentos. Este projeto nasce desse vínculo pessoal com o desenho e da curiosidade por compreender aspectos da memória, da aprendizagem e do comportamento.

A proposta é desenvolver um site com personagens, episódios, frases e reflexões, aproximando situações da série de conceitos de autoconhecimento e neurociência. Quero que o visitante encontre algum aprendizado e perceba outras possibilidades de leitura por trás das aventuras.

O projeto não tem um nicho específico: sua motivação é pessoal, mas qualquer pessoa poderá explorar o conteúdo. Relatos pessoais detalhados não fazem parte do escopo inicial.

## Estado atual

Base Web Data Viz/AquaTech incorporada em 17/11/2026. O servidor entrega páginas simples de início, cadastro e login, com links entre elas. Cadastro e login são somente telas de preparação: não enviam dados nem autenticam usuários. Integração, adaptação do banco e demais funcionalidades continuam pendentes.

## Escopo e decisões

| Item | Situação |
| --- | --- |
| Conteúdo sobre personagens, episódios, frases e reflexões | Planejado |
| Cadastro com validações e login | Previsto nas entregas acadêmicas |
| Integração da API com MySQL | Obrigatória |
| Dashboard com indicadores de dados do sistema | Obrigatório; indicadores a definir |
| Jogo da memória com personagens | Proposta em avaliação |
| Quiz de afinidade com personagens | Proposta anterior, sem confirmação |
| Nome definitivo e seleção final de conteúdos | A definir |

A ideia do jogo da memória é embaralhar cartas com imagens dos personagens. Ao encontrar um par, o visitante poderá ler uma frase ou reflexão relacionada àquele personagem. Quantidade de cartas, regras, formato das mensagens e dados registrados ainda serão definidos.

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
| `web-data-viz/public/css/` e `web-data-viz/public/js/` | Estilos e JavaScript do frontend |
| `web-data-viz/public/assets/img/` | Pasta reservada para imagens, atualmente apenas com `.gitkeep` |
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

O `app.js` original carrega `.env.dev` no modo desenvolvimento. O `.env.example` contém a porta 3333 e campos de banco sem usuário ou senha. Não é necessário conectar ao MySQL para acessar as páginas. Não versione `.env`, `.env.dev` nem `node_modules/`; o `.gitignore` existente já os protege e permite `.env.example`.

O fluxo da base foi preservado: **rotas → controllers → models → database**. Os arquivos do servidor, dependências e SQL da turma foram mantidos; as telas AquaTech de dashboard e simulador não foram importadas. O backend ainda é o exemplo AquaTech, não uma API adaptada ou pronta para publicação.

### Verificações desta etapa

- Dependências instaladas e `npm start` executado; início, cadastro, login e CSS responderam HTTP 200.
- Na revisão da organização, `npm start` e `npm run dev` foram verificados novamente: ambos entregaram as três páginas e o CSS com HTTP 200.
- Links, título e bloqueio de envio dos formulários conferidos no HTML; aparência e interação em navegador não foram testadas manualmente.
- MySQL, cadastro e autenticação não foram testados. Nenhum SQL foi executado.
- `npm audit` apontou 7 vulnerabilidades de severidade alta na cadeia do `nodemon`. Nenhuma correção automática foi aplicada para não alterar a base sem revisão.
