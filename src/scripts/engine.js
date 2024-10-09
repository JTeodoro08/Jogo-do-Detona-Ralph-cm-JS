const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lives: document.querySelector("#lives"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
      lives: 5,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0 || state.values.lives <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result);
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

    setTimeout(() => {
        // Se o jogador não acertar, uma vida é perdida
        if (state.values.hitPosition === randomSquare.id) {
          state.values.lives--;
          state.view.lives.textContent = state.values.lives; // Atualiza a exibição das vidas
          playSound("miss"); // Toca um som de "miss"
          state.values.hitPosition = null;
        }
      }, state.values.gameVelocity);
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }
  
  function initialize() {
    addListenerHitBox();
    state.view.lives.textContent = state.values.lives; // Inicializa a exibição das vidas no HTML
  }
  
  initialize();