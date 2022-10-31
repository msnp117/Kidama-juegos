//Inicialización de variables
let cardsUncover = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let move = 0;
let correct = 0;
let timer = false;
let time = 30;
let timeInit = 30;
let timeRegresiveId = null;

//Apuntando a documentos HTML
let viewMoves = document.getElementById('move');
let viewCorrect = document.getElementById('correct');
let viewTime = document.getElementById('time');

//Creando elementos en HTML
let restartButton = document.createElement('button');

//Generación de números aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

//Funciones
function counterTimer() {
  setInterval(() => {
    time--;
    viewTime.innerHTML = `Tiempo: ${time} segundos`;
    if (time == 0) {
      clearInterval(timeRegresiveId);
      blockCards(numbers);
      time++;
    }
  }, 1000);
}

function blockCards() {
  for (let i = 0; i <= 15; i++) {
    let blockCard = document.getElementById(i);
    blockCard.innerHTML = `<img src="../img/${numbers[i]}.png" alt="">`;
    blockCard.disabled = true;
  }
}

function restartGame() {
  let fatherElement = document.querySelector('.section2');
  let successUp = document.querySelector('#success');
  restartButton.innerHTML = '<a href="">REINICIAR</a>';
  fatherElement.appendChild(restartButton);
  fatherElement.insertBefore(restartButton, successUp);
  document.getElementById('section-height').style.height = '500px';
  restartButton.setAttribute('class', 'change-button');
}

function restart() {
  location.reload();
}

//Función principal
function uncover(id) {
  if (timer == false) {
    counterTimer();
    timer = true;
  }

  cardsUncover++;
  console.log(cardsUncover);

  if (cardsUncover == 1) {
    //Mostrar primer numero
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="./img/${firstResult}.png" alt="" class="img__card">`;

    //Deshabilitar primer botón
    card1.disabled = true;
  } else if (cardsUncover == 2) {
    //Mostrar primer numero
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = `<img src="./img/${secondResult}.png" alt="" class="img__card">`;

    //Deshabilitar primer botón
    card2.disabled = true;

    //Incrementar movimientos
    move++;
    viewMoves.innerHTML = `Movimientos: ${move}`;

    if (firstResult == secondResult) {
      //Crear contador tarjetas correctas
      cardsUncover = 0;

      //Aumentar aciertos
      correct++;
      viewCorrect.innerHTML == `Aciertos: ${correct}`;

      if (correct == 8) {
        clearInterval(timeRegresiveId);
        viewCorrect.innerHTML = `Aciertos: ${correct}🥳🥳`;
        viewTime = `Fantástico! 🥳 Sólo demoraste ${timeInit - time} segundos`;
        viewMoves.innerHTML = `Movimientos: ${moves}🤟🤟`;
      }
    } else {
      //Mostrar momentaneamente valores y volver a tapar
      setTimeout(() => {
        card1.innerHTML = ` `;
        card2.innerHTML = ` `;
        card1.disabled = false;
        card2.disabled = false;
        cardsUncover = 0;
      }, 800);
    }
  }
}
