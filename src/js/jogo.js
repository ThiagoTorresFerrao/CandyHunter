let positionX;
let positionY;
const maxRows = 9; // Número máximo de linhas no tabuleiro
const maxColumns = 9; // Número máximo de colunas no tabuleiro
let level = 1;
let vidas = 4;
const zombies = [];
let moveSet = 0;

// Manual do Jogo "Candy Hunter"
const manualJogo = `Bem-vindo

1. Objetivo:
   - Colete todos os itens no tabuleiro para avançar para o próximo nível.
   - Evite ser pego pelos zumbis. Se você perder todas as vidas, o jogo reinicia.

2. Controles:
   - Use as teclas de seta (↑, ↓, ←, →) ou as teclas W, A, S, D para mover o jogador para cima, baixo, esquerda ou direita, respectivamente.

3. Vidas e Itens:
   - No início do jogo, você tem 2 vidas. Cada vez que um zumbi o pega, você perde uma.
   - Você precisa coletar todos os itens para completar o nível.
   - A quantidade de itens a serem coletados aumenta a cada nível. Assim como a quantidade de zombies.

4. Pontuação:
   - Sua pontuação é baseada na quantidade de movimentos por fase. Quanto menos movimentos você fizer para coletar todos os itens, maior será sua pontuação.

5. Níveis:
   - O jogo começa no nível 1.
   - Cada nível aumenta a dificuldade, adicionando mais zumbis e mais itens para coletar.

6. Fim do Jogo:
   - Você vence quando coletar todos os itens em um nível.
   - Você perde quando suas vidas chegam a zero.

Divirta-se jogando "Candy Hunter" e boa sorte na caça aos doces!

Nota: Este é um exemplo básico de jogo e pode ser expandido e aprimorado com mais recursos e funcionalidades, conforme desejado.`;

// Exibir o manual do jogo
console.log(manualJogo);

// Gerar posição aleatória para o jogador
function gerarPosicaoAleatoria() {
  positionX = Math.floor(Math.random() * maxRows) + 1;
  positionY = Math.floor(Math.random() * maxColumns) + 1;

  // Atribuir a posição ao jogador
  player.style.gridRow = positionX;
  player.style.gridColumn = positionY;
}

function adicionarItensEnemy() {
  // Adicionar inimigos
  for (let i = 1; i < 4; i++) {
    let zombie = document.createElement('img');
    zombie.className = 'zombie';
    zombie.id = 'zombie' + i;
    zombie.src = "https://cdn-icons-png.flaticon.com/512/1078/1078220.png";

    const zombiePositionX = Math.floor(Math.random() * maxRows) + 1;
    const zombiePositionY = Math.floor(Math.random() * maxColumns) + 1;

    zombie.style.gridRow = zombiePositionX;
    zombie.style.gridColumn = zombiePositionY;

    document.querySelector(".playerPoint").appendChild(zombie);
    zombies.push(zombie);
  }

  // Adicionar itens
  for (let i = 1; i < level * 3; i++) {
    let candy = document.createElement('img');
    candy.id = 'item' + i;
    candy.className = 'item';

    if (i % 2 == 0) {
      candy.src = "https://cdn-icons-png.flaticon.com/512/1078/1078205.png";
    } else {
      candy.src = "https://cdn-icons-png.flaticon.com/512/1078/1078203.png";
    }

    const candyPositionX = Math.floor(Math.random() * maxRows) + 1;
    const candyPositionY = Math.floor(Math.random() * maxColumns) + 1;

    candy.style.gridRow = candyPositionX;
    candy.style.gridColumn = candyPositionY;

    document.querySelector(".playerPoint").appendChild(candy);
  }
}

let itensColetados = 0;
const vidasElement = document.getElementById("vidas");
vidasElement.innerHTML = String(vidas);
const itensElement = document.getElementById("itens");

// Função para verificar interações entre o jogador e os itens/zumbis
function verificarInteracoes() {
  const items = document.querySelectorAll('.item');

  // Verificar interações com itens
  items.forEach(item => {
    const itemPositionX = parseInt(item.style.gridRow);
    const itemPositionY = parseInt(item.style.gridColumn);

    if (itemPositionX == positionX && itemPositionY == positionY) {
      item.remove();
      itensColetados++;
      console.log(itensColetados);
      if (itensColetados == (level * 3) - 1) {
        console.log("itensColetados");
        alert("Venceu playboy.\n" + moveSet + " movimentos.");
        level++;
        iniciarJogo();
      }
      itensElement.innerHTML = String(itensColetados);
    }
  });

  // Verificar interações com zumbis
  zombies.forEach(zombie => {
    const zombiePositionX = parseInt(zombie.style.gridRow);
    const zombiePositionY = parseInt(zombie.style.gridColumn);

    if (zombiePositionX == positionX && zombiePositionY == positionY) {
      vidas--;
      vidasElement.innerHTML = String(vidas);
      if (vidas == 0) {
        alert("Perdeu playboy.\n" + moveSet + " movimentos.");
        window.location.reload();
      }
    }
  });
}

// Função para controlar o movimento do jogador
document.addEventListener('keydown', function (event) {
  const key = event.key.toUpperCase();
  moveSet++;

  // Movimento para cima
  if (key === 'ARROWUP' || key === 'W') {
    if (positionX > 1) {
      positionX--;
      player.style.gridRow = positionX;
      moverZumbisAleatoriamente();
      verificarInteracoes();
    }
  }

  // Movimento para baixo
  if (key === 'ARROWDOWN' || key === 'S') {
    if (positionX < maxRows) {
      positionX++;
      player.style.gridRow = positionX;
      moverZumbisAleatoriamente();
      verificarInteracoes();
    }
  }

  // Movimento para a esquerda
  if (key === 'ARROWLEFT' || key === 'A') {
    if (positionY > 1) {
      positionY--;
      player.style.gridColumn = positionY;
      moverZumbisAleatoriamente();
      verificarInteracoes();
    }
  }

  // Movimento para a direita
  if (key === 'ARROWRIGHT' || key === 'D') {
    if (positionY < maxColumns) {
      positionY++;
      player.style.gridColumn = positionY;
      moverZumbisAleatoriamente();
      verificarInteracoes();
    }
  }
});

// Função para mover os zumbis em direções aleatórias
function moverZumbisAleatoriamente() {
  zombies.forEach(zombie => {
    const zombiePositionX = parseInt(zombie.style.gridRow);
    const zombiePositionY = parseInt(zombie.style.gridColumn);
    const direction = Math.floor(Math.random() * 4) + 1;

    // Movimento para cima
    if (direction == 1 && zombiePositionX > 1) {
      zombie.style.gridRow = zombiePositionX - 1;
    }

    // Movimento para baixo
    if (direction == 2 && zombiePositionX < maxRows) {
      zombie.style.gridRow = zombiePositionX + 1;
    }

    // Movimento para a esquerda
    if (direction == 3 && zombiePositionY > 1) {
      zombie.style.gridColumn = zombiePositionY - 1;
    }

    // Movimento para a direita
    if (direction == 4 && zombiePositionY < maxColumns) {
      zombie.style.gridColumn = zombiePositionY + 1;
    }
  });
}

// Função para atualizar o jogo
function atualizarJogo() {
  // VAi demorar pra usar isso
  // Verifica condições de vitória ou derrota
  // 
}

const nivelElement = document.getElementById("nivel");

// Iniciar o jogo
function iniciarJogo() {
  vidas = 2;
  itensColetados = 0;
  vidasElement.innerHTML = String(vidas);
  nivelElement.innerHTML = String(level);
  gerarPosicaoAleatoria(); // Gerar a posição inicial do jogador
  atualizarJogo(); // Iniciar o loop de atualização do jogo
  adicionarItensEnemy();
}

iniciarJogo();
