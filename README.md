# Hora de Aventura e Neurociência

Nome provisório do Projeto Individual de **Patrick Scaglia Rodrigues**, desenvolvido no primeiro semestre de Análise e Desenvolvimento de Sistemas da **SPTech**, em 2026.2.

## Sobre o projeto

Hora de Aventura fez parte da minha infância e continua me proporcionando novas formas de enxergar situações, sentimentos e relacionamentos. Este projeto nasce desse vínculo pessoal com o desenho e da curiosidade por compreender aspectos da memória, da aprendizagem e do comportamento.

A proposta é desenvolver um site com personagens, episódios, frases e reflexões, aproximando situações da série de conceitos de autoconhecimento e neurociência. Quero que o visitante encontre algum aprendizado e perceba outras possibilidades de leitura por trás das aventuras.

O projeto não tem um nicho específico: sua motivação é pessoal, mas qualquer pessoa poderá explorar o conteúdo. Relatos pessoais detalhados não fazem parte do escopo inicial.

## Estado atual

Em fase inicial, com estrutura de pastas e parte da documentação preparadas, conforme o planejamento registrado em 17/11/2026. Páginas, integração, banco de dados e funcionalidades ainda precisam ser desenvolvidos. Não há versão funcional declarada.

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

## Organização planejada

Os caminhos devem ser conferidos no repositório antes de qualquer alteração; esta lista descreve a organização pretendida.

| Caminho | Finalidade |
| --- | --- |
| `banco-de-dados/` | Modelagem e scripts SQL |
| `prototipo/` | Protótipos das telas |
| `ti/` | Documentação acadêmica e requisitos |
| `docs/` | Planejamento e diário de prompts |
| `web-data-viz/public/` | Arquivos do frontend |
| `web-data-viz/src/` | Backend, seguindo o material da turma |
| `AGENTS.md` | Orientações para assistentes de programação |

## Requisitos acadêmicos

Aplicar variáveis, funções, operações matemáticas, condicionais, repetições e vetores; desenvolver modelo lógico e relacionamentos; demonstrar o fluxo entre frontend, API e banco; manter documentação, Trello e histórico no Git público. Preparar apresentação de dez minutos, incluindo motivação pessoal, valores, dificuldades e superação.

## Uso de IA e conteúdo

A IA será utilizada como apoio ao aprendizado. Os pedidos, assistentes utilizados, resultados aproveitados e alterações devem ser registrados em `docs/diario-de-prompts.md`. O autor precisa compreender e explicar o código entregue.

Frases do desenho devem ter sua origem identificada. Reflexões autorais e interpretações das cenas devem ser diferenciadas de afirmações científicas, que precisam de fontes verificadas.

## Execução

As instruções de instalação e execução serão acrescentadas após conferir e configurar a base fornecida pela turma. Ainda não há comandos, portas ou credenciais de execução confirmados neste README.
