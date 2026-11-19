// Demonstração local: o estado existe apenas enquanto esta página está aberta.
const pairs = [
  ['☀', 'sol'],
  ['☾', 'lua'],
  ['★', 'estrela'],
  ['◆', 'diamante'],
  ['▲', 'triângulo'],
  ['♥', 'coração']
];
const board = document.querySelector('#board');
const stats = document.querySelector('#stats');
let first, moves, matches, pending;
function showStats() {
  const message = matches === pairs.length ? 'Você encontrou todos os pares! ' : '';
  stats.textContent = message + matches + ' de ' + pairs.length + ' pares · ' + moves + ' tentativas';
}
function start() {
  // Cancela o fechamento de cartas da rodada anterior ao recomeçar.
  clearTimeout(pending);
  pending = null;
  first = null;
  moves = 0;
  matches = 0;
  const cards = pairs.concat(pairs);
  // Embaralha as duas cópias de cada símbolo.
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  board.replaceChildren();
  cards.forEach(([symbol, name], index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'card';
    const hiddenName = 'Virar carta ' + (index + 1);
    function hide() {
      button.textContent = '✦';
      button.setAttribute('aria-label', hiddenName);
      button.classList.remove('open');
    }
    hide();
    button.addEventListener('click', () => {
      if (pending || first?.button === button || button.disabled) return;
      button.textContent = symbol;
      button.setAttribute('aria-label', name);
      button.classList.add('open');
      if (!first) {
        first = {button, symbol, hide};
        return;
      }
      moves++;
      const previous = first;
      first = null;
      if (previous.symbol === symbol) {
        matches++;
        for (const matched of [previous.button, button]) {
          matched.disabled = true;
          matched.classList.add('done');
        }
      } else {
        pending = setTimeout(() => {
          previous.hide();
          hide();
          pending = null;
        }, 750);
      }
      showStats();
    });
    board.append(button);
  });
  showStats();
}
document.querySelector('#reset').addEventListener('click', start);
start();
