// Criar o tabuleiro
for (let i = 0; i < 80; i++) {
  var divElement = document.createElement('div');
  divElement.className = 'area';
  document.getElementById("board").appendChild(divElement);
}

// Personagens
const radios = document.querySelectorAll("input");
const userChoose = document.getElementById("userChoose");
const player = document.querySelector(".player");

// Definir imagens iniciais dos personagens
userChoose.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1078/1078195.png')";
player.src = "https://cdn-icons-png.flaticon.com/512/1078/1078195.png";

// Alterar personagens com base na escolha do usuário
radios.forEach(radio => {
  radio.addEventListener('change', function () {
    if (this.value === 'witch') {
      userChoose.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1078/1078195.png')";
      player.src = "https://cdn-icons-png.flaticon.com/512/1078/1078195.png";
    } else if (this.value === 'jason') {
      userChoose.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1078/1078201.png')";
      player.src = "https://cdn-icons-png.flaticon.com/512/1078/1078201.png";
    } else if (this.value === 'faixa') {
      userChoose.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1078/1078173.png')";
      player.src = "https://cdn-icons-png.flaticon.com/512/1078/1078173.png";
    } else if (this.value === 'bozo') {
      userChoose.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1078/1078174.png')";
      player.src = "https://cdn-icons-png.flaticon.com/512/1078/1078174.png";
    }
  });
});
