window.addEventListener('DOMContentLoaded', () => { //targets HTML to listen to events on
    const tiles = Array.from(document.querySelectorAll('.tile')); //tiles
    const playerDisplay = document.querySelector('.display-player'); //playerdisplay
    const resetButton = document.querySelector('#reset'); //query selector for reset
    const announcer = document.querySelector('.announcer'); //announces winner
    let board = ['', '', '', '', '', '', '', '', '']; //let so that the board positions can change
    let currentPlayer = 'X'; //X starts
    let isGameActive = true; //game begins
  
    const PLAYERX_WON = 'PLAYERX_WON'; //for who wins
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE'; //draw
    const winningConditions = [ //all possible winning conditions for the 3 by 3 board
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
  ];
  const isValidAction = (tile) => { //conditions for x vs o
      if (tile.innerText === 'X' || tile.innerText === 'O'){
          return false;
      }
  
      return true;
  };
  
  const updateBoard =  (index) => { //current player is updated and shown after one player goes
     board[index] = currentPlayer;
  }
  
  const changePlayer = () => { //player changes after each click, so you cant go more than once in a row
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
  }
  
  const announce = (type) => { //player winning announces
      switch(type){
         case PLAYERO_WON:
              announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
              break;
         case PLAYERX_WON:
              announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
              break;
         case TIE:
              announcer.innerText = 'Tie';
          }
      announcer.classList.remove('hide');
  };
  
  function handleResultValidation() { //three in a row wins
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }
  
    if (!board.includes("")) announce(TIE);
  }
  
  const userAction = (tile, index) => { //more updates to board
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };
  
  tiles.forEach( (tile, index) => {
      tile.addEventListener('click', () => userAction(tile, index));
  });
  
  const resetBoard = () => { //board resets after game is done
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      announcer.classList.add('hide');
  
      if (currentPlayer === 'O') {
          changePlayer();
      }
  
      tiles.forEach(tile => {
          tile.innerText = '';
          tile.classList.remove('playerX');
          tile.classList.remove('playerO');
      });
  }
  
  resetButton.addEventListener('click', resetBoard);
  });
