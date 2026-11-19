# Diário de Prompts

## Organização inicial do repositório

### Assistente utilizado
ChatGPT.

### O que pedi
Ajuda para organizar a estrutura inicial do meu projeto sobre
Hora de Aventura e neurociência, usando conceitos aprendidos em aula
como referência e considerando as orientações da disciplina.

### O que utilizei
Orientações para criar uma página HTML básica, um CSS inicial,
um arquivo JavaScript e pastas para imagens e para o futuro backend.

### Como apliquei
Criei os arquivos no meu computador seguindo as explicações
passo a passo.

### O que ainda falta
Conferir a estrutura com a versão do Web Data Viz/AquaTech
fornecida pela minha turma antes de implementar o backend.

## Reorganização das pastas do projeto

- **Assistente utilizado:** ChatGPT.
- **O que pedi:** preparar a estrutura para o projeto sobre Hora de Aventura, autoconhecimento e neurociência, preservando os arquivos existentes e sem implementar funcionalidades.
- **Como apliquei:** movi `public/` para `web-data-viz/public/` e a pasta existente `scr/` para `web-data-viz/src/`; preparei `banco-de-dados/`, `prototipo/` e `ti/`, com um comentário em `script.sql` e `.gitkeep` nas pastas vazias. Atualizei o README e conferi as regras do `.gitignore`.

## Preparação da aplicação com a base Web Data Viz/AquaTech

- **Data:** 17/11/2026.
- **Assistente utilizado:** OpenCode, modelo GPT-6.1 Sol (OpenAI).
- **O que pedi (resumo):** incorporar o material de `C:\Users\patri\Downloads\web-data-viz` à pasta já reservada da aplicação, preservando documentação e arquitetura da turma; preparar início, cadastro e login simples com integração explicitamente pendente; proteger credenciais, instalar dependências e testar o servidor. Não implementar jogo, dashboard ou adaptação do banco, nem fazer commit ou envio ao GitHub.
- **O que foi realizado:** leitura das orientações, README, diário e arquivos próprios existentes; conferência das duas estruturas e das alterações locais no Git. A cópia aninhada do material não foi importada. Incorporados sem mudanças `web-data-viz/app.js`, `package.json`, `LICENSE` e os arquivos de `src/routes/`, `src/controllers/`, `src/models/` e `src/database/`, incluindo o SQL AquaTech. As páginas AquaTech de dashboard e simulador não foram importadas.
- **Arquivos preparados ou alterados:** atualização de `web-data-viz/public/index.html` e `public/css/style.css`; criação de `public/cadastro.html` e `public/login.html`, com campos, avisos, botões desabilitados e envio bloqueado. Criado `web-data-viz/.env.example`, sem credenciais, e cópia local `.env.dev`, ignorada pelo Git. Gerado `package-lock.json` pela instalação. Atualizados `docs/README.md` e este diário; preservados o AGENTS, o README anterior, os registros anteriores e os demais documentos.
- **Verificações efetuadas:** `npm install` concluído; `npm start` iniciou o servidor na porta 3333. Requisições a `/`, `/index.html`, `/cadastro.html`, `/login.html` e `/css/style.css` retornaram HTTP 200. Conferidos título, links e bloqueio de envio no HTML. Confirmado que as regras existentes do `.gitignore` ignoram `node_modules`, `.env` e `.env.dev`; não foi necessário alterá-las. O servidor de teste foi encerrado.
- **Limitações e pendências:** não houve teste visual/manual em navegador, conexão com MySQL ou execução do SQL. Cadastro e login não foram integrados nem simulados; o backend permanece como exemplo da turma, sujeito à adaptação e revisão antes de uso real. A instalação e o `npm audit` apontaram 7 vulnerabilidades altas na cadeia do `nodemon`; não foi aplicado `npm audit fix` nem adicionada tecnologia. Jogo, dashboard e adaptação do banco ficaram para próximas etapas. Nenhum commit ou push foi realizado.
- **O que utilizei / como apliquei:** alterações realizadas pelo assistente no repositório local; aproveitamento e modificações pelo estudante pendentes de revisão pelo autor.

## Revisão da organização e documentos na raiz

- **Data:** 17/11/2026.
- **Assistente utilizado:** OpenCode, modelo GPT-6.1 Sol (OpenAI).
- **O que pedi (resumo):** revisar a organização, mover AGENTS e README de `docs/` para a raiz sem perder conteúdo, conferir referências, proteção de credenciais e dependências, verificar as pastas e os comandos de execução, preservar páginas e `.gitkeep`, sem alterar o banco, fazer commit ou enviar ao GitHub.
- **O que foi realizado:** lidos os documentos de orientação e apresentação existentes, incluindo `anterior-README.md`. Como não havia AGENTS ou README na raiz do diretório de trabalho, `docs/AGENTS.md` foi movido para `AGENTS.md` sem alteração de conteúdo e `docs/README.md` para `README.md`. No README, corrigida a referência ao AGENTS, incluído o próprio README na tabela e esclarecida a finalidade de `prototipo/`. Caminhos relativos conferidos. A referência ao caminho antigo no registro anterior deste diário foi preservada como histórico.
- **Arquivos afetados:** movidos `AGENTS.md` e `README.md`; atualizados a tabela de organização do README e este `docs/diario-de-prompts.md`. Conteúdo das páginas, backend, SQL, configurações, demais documentos, pastas vazias e arquivos `.gitkeep` preservados.
- **Verificações efetuadas:** confirmado frontend em `web-data-viz/public/`, backend em `web-data-viz/src/` e subpastas de protótipos com `.gitkeep`. O `.gitignore` existente já protege `node_modules/`, `.env` e `.env.dev` e permite `.env.example`, que segue sem credenciais reais; não foi necessário alterá-lo. `git ls-files` não encontrou arquivos `.env` ou dependências rastreados, e o índice não foi alterado. Dependências já disponíveis, sem nova instalação. Testados os dois comandos do `package.json`: `npm start` e `npm run dev`. Em ambos, `/`, `/index.html`, `/cadastro.html`, `/login.html` e `/css/style.css` responderam HTTP 200; título conferido nas páginas. Os processos de teste foram encerrados.
- **Limitações e pendências:** não houve teste visual/manual no navegador, autenticação, cadastro ou conexão com MySQL. Nenhum SQL foi executado nem o banco alterado. Não houve nova auditoria de dependências nesta tarefa; permanece o alerta registrado na etapa anterior. Nenhum commit ou push realizado.
- **O que utilizei / como apliquei:** alterações feitas pelo assistente localmente; aproveitamento e modificações pelo estudante pendentes de revisão pelo autor.

## Revisão das pastas de protótipos e caminhos do frontend

- **Data:** 17/11/2026.
- **Assistente utilizado:** OpenCode, modelo GPT-6.1 Sol (OpenAI).
- **O que pedi (resumo):** ler AGENTS e README da raiz, revisar `prototipo/` e removê-la somente se vazia ou contendo apenas `.gitkeep`; conferir a localização das três páginas e os caminhos dos recursos e links; atualizar a estrutura no README e registrar a tarefa, preservando documentação, banco e Web Data Viz, sem commit ou envio ao GitHub.
- **O que foi realizado:** examinados o estado inicial do Git, as orientações, a estrutura real, as páginas, o CSS e o JavaScript. `prototipo/` continha somente quatro arquivos `.gitkeep`, nas subpastas `cadastro/`, `dashboard/`, `landing-page/` e `login/`; a pasta inteira foi removida, sem perda de imagens, desenhos ou outros conteúdos. As três páginas já estavam em `web-data-viz/public/` e não precisaram de alterações.
- **Arquivos afetados:** removidos os quatro `.gitkeep` de `prototipo/`; atualizada somente a tabela de organização do `README.md`, retirando a pasta removida e detalhando páginas, CSS, JavaScript e imagens; acrescentado este registro em `docs/diario-de-prompts.md`. Preservadas as alterações locais anteriores, os demais documentos, os arquivos de banco e a estrutura Web Data Viz.
- **Verificações efetuadas:** inspeção recursiva de `prototipo/`, incluindo arquivos ocultos; checagem automatizada dos 15 caminhos locais de `href` e `src` das três páginas, todos existentes. CSS sem referências a recursos externos e JavaScript contendo apenas comentário. A pasta `public/assets/img/` contém somente `.gitkeep` e não há imagens referenciadas nas páginas. Conferência final das alterações e da remoção da pasta.
- **Limitações e pendências:** nesta tarefa, a conferência dos caminhos foi estática, sem iniciar o servidor nem testar visualmente no navegador. Não foram executados SQL, testes de cadastro, autenticação ou MySQL. Nenhum caminho quebrado encontrado. Nenhum commit ou push realizado.
- **O que utilizei / como apliquei:** alterações feitas pelo assistente localmente; aproveitamento e modificações pelo estudante pendentes de revisão pelo autor.

## Incorporação do protótipo editável à página inicial

- **Data:** 18/11/2026.
- **Assistente utilizado:** OpenCode, modelo GPT-6.1 Sol (OpenAI).
- **O que pedi (resumo):** extrair `C:\Users\patri\Downloads\Prototipo_Hora_de_Aventura_Editavel.zip` em pasta temporária, comparar e incorporar sua pasta `public` à aplicação existente; separar HTML, CSS, JavaScript e imagens locais; corrigir caminhos; preservar cadastro, login, servidor, dependências, backend, banco e configurações; substituir janelas provisórias por links às páginas existentes; manter o jogo como demonstração local, iniciar pelo comando do `package.json`, testar a entrega e registrar a tarefa, sem commit ou envio ao GitHub.
- **O que foi realizado:** leitura do AGENTS e README da raiz, diário e arquivos relacionados; inspeção da estrutura e do Git. ZIP extraído em `C:\Users\patri\AppData\Local\Temp\opencode\prototipo-aventura-51ytp2iz`. Comparados os caminhos: somente `public/index.html` colidia com um arquivo existente, que era a apresentação simples com links de cadastro e login. Incorporada a apresentação do protótipo, mantendo esses destinos. Removidos os dois diálogos de autenticação e o JavaScript e CSS exclusivos deles. Mantidos os seis pares de símbolos, contador de tentativas e regras do protótipo; acrescentado aviso de demonstração local sem gravação nem avaliação científica. JavaScript recebeu comentários e pequena melhoria de legibilidade, sem mudar as regras.
- **Arquivos afetados:** alterado `web-data-viz/public/index.html`; adicionados `web-data-viz/public/css/prototipo.css`, `web-data-viz/public/js/prototipo.js` e oito imagens em `web-data-viz/public/assets/imgs/` (`bmo.webp`, `destaque.webp`, `finn.webp`, `jake.webp`, `marceline-rei-gelado.webp`, `marceline.webp`, `princesa-jujuba.webp`, `rei-gelado.webp`). Atualizados `README.md` e este diário. Preservados cadastro e login, `css/style.css`, `js/script.js`, `.gitkeep`, `app.js`, pacotes, backend, banco e configurações. O arquivo não rastreado `Prototipo_Hora_de_Aventura.html` da raiz não foi alterado.
- **Verificações efetuadas:** `npm start` executado em `web-data-viz/`; `/`, `/index.html`, `/cadastro.html`, `/login.html`, `/css/style.css`, `/css/prototipo.css`, `/js/prototipo.js` e as oito imagens responderam HTTP 200, com os tipos esperados e conteúdo idêntico aos arquivos locais. Todos os caminhos e fragmentos locais das três páginas foram conferidos. Confirmada a ausência de diálogos e de `data-open` na página inicial. `node --check` aprovou a sintaxe; teste em DOM simulado aprovou 12 cartas, seis pares, clique repetido, bloqueio durante espera, erro, acerto, conclusão e reinício com cancelamento de temporizador. Uma primeira versão do teste teve uma asserção incorreta por estado do próprio teste; o teste foi corrigido e passou sem precisar alterar a lógica do jogo. Conferido com Git que os arquivos protegidos e as páginas de autenticação não têm diferenças; `git diff --check` sem erros de espaços.
- **Limitações e pendências:** sem ferramenta de navegador disponível e sem Playwright/Puppeteer instalados, não houve inspeção visual ou interação em navegador real; nenhuma dependência foi adicionada. Conteúdo pessoal e atribuição das imagens foram trazidos do protótipo fornecido, sem verificação independente; revisão pelo autor pendente. Não houve integração com API, autenticação, cadastro, MySQL ou execução de SQL. Nenhuma nova auditoria de dependências; permanece o alerta registrado anteriormente. Servidor de desenvolvimento mantido em execução em `http://localhost:3333/` ao concluir. Nenhum commit ou push realizado.
- **O que utilizei / como apliquei:** alterações realizadas pelo assistente no repositório local; aproveitamento e modificações pelo estudante pendentes de revisão pelo autor.

## Substituição das imagens Base64 do protótipo por arquivos locais

- **Data:** 18/11/2026.
- **Assistente utilizado:** OpenCode, modelo GPT-6.1 Sol (OpenAI).
- **O que pedi (resumo):** ler AGENTS, localizar `Prototipo_Hora_de_Aventura.html` e procurar imagens `src="data:image/..."` nos HTML; decodificar, preservar formatos, usar nomes descritivos, reaproveitar imagens iguais em `web-data-viz/public/assets/imgs/`, substituir por caminhos relativos, indentar o HTML e conferir caminhos e ausência de Base64. Registrar no diário, sem commit ou envio ao GitHub, e indicar qual HTML abrir.
- **O que foi realizado:** lidos AGENTS, README e diário; conferidos estrutura e estado do Git. Encontradas oito imagens WebP embutidas somente no protótipo da raiz. Todas foram decodificadas e comparadas byte a byte com os arquivos existentes; reutilizados `destaque.webp`, `marceline-rei-gelado.webp`, `finn.webp`, `jake.webp`, `marceline.webp`, `bmo.webp`, `rei-gelado.webp` e `princesa-jujuba.webp`, sem criar duplicatas nem modificar imagens. Os oito `src` passaram a usar `web-data-viz/public/assets/imgs/...`, relativo à raiz. Formatada a marcação HTML com indentação e explicitados `head` e `body`; preservados textos, atributos restantes, CSS e JavaScript originais.
- **Arquivos afetados:** `Prototipo_Hora_de_Aventura.html` e este `docs/diario-de-prompts.md`. Nenhum dos três HTML da aplicação precisou de edição. Alterações anteriores, backend, banco e configurações preservados. Script de conversão e cópia anterior para comparação ficaram apenas na pasta temporária do OpenCode, fora do repositório.
- **Verificações efetuadas:** quatro HTML próprios examinados, excluindo dependências e metadados do Git; nenhuma ocorrência restante de `data:image/`. Conferidas 44 referências locais de `src` e `href`, incluindo destinos de fragmentos; todos os arquivos existem. As oito imagens referenciadas são idênticas aos dados Base64 originais. Comparação por parser confirmou preservação dos elementos anteriores, atributos fora dos `src` convertidos, textos e blocos CSS/JavaScript. O protótipo passou de 360.702 para 15.651 bytes.
- **Limitações e pendências:** checagem estática, sem navegador real; aparência e interação visual continuam pendentes. O protótipo da raiz conserva seu comportamento original de demonstração, inclusive as janelas provisórias; a página integrada em `web-data-viz/public/index.html` não foi alterada nesta tarefa. Para visualizar esta correção, abrir diretamente `Prototipo_Hora_de_Aventura.html` na raiz, mantendo a estrutura de pastas. Nenhum commit ou push realizado.
- **O que utilizei / como apliquei:** alterações realizadas pelo assistente localmente; aproveitamento e modificações pelo estudante pendentes de revisão pelo autor.

## Extração e organização do CSS do protótipo da raiz

- **Data:** 18/11/2026.
- **Assistente utilizado:** OpenCode, modelo GPT-6.1 Sol (OpenAI).
- **O que pedi (resumo):** ler AGENTS, extrair todo o `style` de `Prototipo_Hora_de_Aventura.html` para `web-data-viz/public/css/prototipo.css`, comparar e consolidar o CSS existente, formatar com indentação e uma propriedade por linha, adicionar o link relativo no `head`, preservar regras e responsividade, conferir o caminho e registrar no diário. Sem commit ou envio ao GitHub.
- **O que foi realizado:** lidos AGENTS, README e arquivos relacionados; conferidos Git e estrutura atual. A comparação mostrou que todas as regras do CSS externo já estavam no inline; somente sete regras dos diálogos (`dialog`, `dialog::backdrop`, `dialog h2`, `dialog label`, `dialog input`, `dialog p` e `.close`) faltavam no externo. Incorporadas essas regras na mesma posição relativa do original, sem duplicar as compartilhadas. Formatado o CSS com indentação, uma propriedade por linha e linhas em branco entre regras. Removido o `style` e inserido no `head` o link `web-data-viz/public/css/prototipo.css`.
- **Arquivos afetados:** `Prototipo_Hora_de_Aventura.html`, `web-data-viz/public/css/prototipo.css`, este diário e a descrição do CSS compartilhado no `README.md`. Conteúdo, JavaScript, imagens, páginas da aplicação, backend, banco e configurações preservados, assim como as alterações anteriores.
- **Verificações efetuadas:** comparação automatizada confirmou equivalência de todo o CSS inline anterior com o externo consolidado, desconsiderando apenas espaços de formatação e ponto e vírgula final opcional; seletores, valores, ordem e media queries de 780px e 420px preservados. Conferido que o HTML mudou somente na substituição de `style` pelo `link`, sem tag `style` restante. O caminho relativo resolve para o arquivo existente a partir do HTML da raiz; o caminho `css/prototipo.css` da página integrada continua resolvendo para o mesmo arquivo. Conferida uma propriedade por linha.
- **Limitações e pendências:** verificação estática, sem inspeção visual em navegador real. As regras dos diálogos mantêm o protótipo da raiz e não têm elementos correspondentes na página inicial integrada. Nenhuma dependência adicionada; nenhum commit ou push realizado.
- **O que utilizei / como apliquei:** alterações realizadas pelo assistente localmente; aproveitamento e modificações pelo estudante pendentes de revisão pelo autor.
