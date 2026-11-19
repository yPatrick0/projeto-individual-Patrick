# Orientações para assistentes de programação

## Contexto

Este é o Projeto Individual de Patrick Scaglia Rodrigues, estudante do primeiro semestre de ADS da SPTech. Leia o `README.md` antes de começar e examine os arquivos relacionados à tarefa. Consulte o planejamento e a documentação quando forem relevantes.

O tema reúne Hora de Aventura, autoconhecimento e neurociência. O nome é provisório. O projeto está no início e deve ser desenvolvido em etapas que o estudante consiga compreender, revisar e explicar.

## Tecnologias e arquitetura

- Utilize HTML, CSS, JavaScript, Node.js, MySQL e a arquitetura Web Data Viz/AquaTech fornecida pela faculdade.
- Preserve a organização do legado e o fluxo entre rotas, controladores, modelos e banco conforme o material realmente existente.
- Não acrescente frameworks, bibliotecas, serviços externos ou dependências por iniciativa própria. Tecnologias fora do material exigem justificativa e aprovação prévia do professor.
- Priorize código simples, nomes claros e conceitos do primeiro semestre. Mantenha o padrão dos arquivos existentes e evite abstrações desnecessárias.
- Use variáveis, funções, cálculos, condicionais, repetições e vetores quando a tarefa exigir. Não introduza recursos apenas para aparentar complexidade.

### Organização do frontend

- Mantenha `index.html`, `cadastro.html` e `login.html` em `web-data-viz/public/`; `index.html` é a página principal.
- Use `public/css/estilo.css` para a página inicial e `public/css/cadastro-login.css` como folha compartilhada de cadastro e login. Carregue-os com `<link rel="stylesheet">` no `head`, por caminhos relativos ao HTML.
- Use o projeto da Jolyne como referência somente para a divisão dos arquivos, sem copiar aparência, textos, imagens ou regras de negócio.
- Mantenha o JavaScript próprio em `public/js/` e as imagens em arquivos locais em `public/assets/`, sem imagens Base64 no HTML. Separe estilos fixos e blocos `style` do HTML; formate CSS com uma propriedade por linha. O CSS pode utilizar técnicas além das presentes no AquaTech.
- Antes de alterar ou mover um CSS, confira todas as páginas que dependem dele e corrija os caminhos afetados. Preserve a cópia `Prototipo_Hora_de_Aventura.html` da raiz como referência histórica; seu `css/prototipo.css` foi mantido para não quebrá-la.

### Referências autorizadas para JavaScript

- São autorizados comandos, métodos e estruturas presentes em pelo menos uma destas referências: exercícios do estudante, apostilas da turma ou Web Data Viz/AquaTech. Consulte os materiais disponíveis antes de escolher recursos; se algum estiver inacessível, informe a limitação e avance com os padrões explicitamente confirmados pelo usuário.
- Prefira nomes claros em português, funções nomeadas, `if/else`, vetores, `push`, acesso por índice e laços `for` ou `while` quando fizer sentido. `onclick`, `Math.random()` e `document.getElementById()` estão autorizados; este último também aparece em `public/js/sessao.js` do AquaTech.
- Verifique o respaldo de `forEach`, desestruturação e encadeamento opcional antes de mantê-los ou introduzi-los. Mesmo quando houver respaldo, prefira uma solução simples com os recursos estudados. Se um recurso fora das referências for indispensável, explique sua finalidade e consulte o usuário sobre ele; continue os ajustes independentes.
- Ao reorganizar, preserve as regras atuais do jogo, campos, validações e funcionamento de cadastro/login. Não transforme telas demonstrativas em integração. Onde já existir integração, preserve o fluxo página → rota → controlador → modelo → banco do AquaTech.

## Como executar as tarefas

1. Examine a estrutura real e o estado do Git antes de editar. A estrutura descrita no README é planejada e não comprova que uma pasta exista.
2. Faça a etapa solicitada. Não interprete a lista de funcionalidades do README como autorização para desenvolver todo o projeto.
3. Preserve o trabalho existente e alterações locais. Não sobrescreva arquivos completos quando uma edição pontual for suficiente.
4. Resolva escolhas pequenas usando os padrões do projeto. Pergunte quando faltar uma decisão que altere funcionalidades, regras do jogo, dados armazenados ou arquitetura.
5. Verifique o comportamento alterado com uma checagem adequada. Informe o que foi verificado e o que não pôde ser executado.
6. Ao concluir, explique brevemente o que mudou, quais arquivos foram afetados e como conferir o resultado. Inclua a explicação da lógica quando ela for nova para o estudante.

Não gere o projeto inteiro de uma vez. Não faça refatorações amplas, migrações destrutivas, commits, push ou publicação sem solicitação correspondente. Não apague dados para resolver erros.

## Decisões e pendências

- Conteúdo sobre personagens, episódios, frases e reflexões está planejado.
- Cadastro, login, API, banco e dashboard fazem parte das entregas previstas, mas sua implementação deve seguir a tarefa solicitada.
- O jogo da memória é uma proposta em avaliação: pares de personagens revelariam frases ou reflexões.
- Quiz de afinidade é uma proposta anterior, não uma funcionalidade confirmada.
- Não implemente pontuação, dificuldade, quantidade de cartas, desempates ou indicadores sem uma definição do usuário.
- Tempo, tentativas e partidas concluídas são sugestões para indicadores. Não use números fictícios como se fossem dados reais do sistema. Trate corretamente a ausência de registros.
- Se a documentação antiga mencionar quiz, pesos ou recomendações, sinalize a divergência e siga as decisões mais recentes do usuário. Não reescreva documentos acadêmicos sem que isso faça parte da tarefa.

## Conteúdo e dados

Não invente frases, episódios, fontes científicas ou experiências pessoais do autor. Diferencie citações do desenho, reflexões autorais e conceitos científicos. Não apresente o jogo como diagnóstico ou teste científico de memória.

Não coloque senhas, tokens ou credenciais reais no código, nos registros ou no README. Preserve o uso de variáveis de ambiente e a proteção de `.env` e `node_modules` no Git. Não exiba dados sensíveis nas respostas ou no diário.

## Diário de prompts obrigatório

Para cada tarefa em que este assistente atuar, acrescente um registro em `docs/diario-de-prompts.md`, preservando os anteriores. Se necessário, crie o arquivo nesse caminho.

Registre:

- Data e assistente utilizado; informe o modelo somente se for conhecido.
- Pedido recebido, preservando o texto quando viável e identificando quando for um resumo.
- O que foi realizado ou fornecido e quais arquivos foram afetados.
- Verificações efetuadas e limitações encontradas.
- O que foi aproveitado e modificado pelo estudante, somente quando ele informar. Caso contrário, marque como pendente de revisão pelo autor.

O link compartilhável da conversa é opcional. Nunca invente links nem declare que o estudante compreendeu, validou ou aprovou uma alteração sem essa confirmação. Faça um registro por tarefa, sem registrar cada ação interna separadamente.

Atualize o README quando a tarefa modificar uma informação ali descrita. Mantenha-o curto e diferencie funcionalidades existentes, planejadas e ainda em avaliação.
