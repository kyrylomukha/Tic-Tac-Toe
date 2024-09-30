const mainSection = document.querySelector(".main-section");
const vsPlayerButton = createHtmlElement("button", "id", "vs-player", "VS Player");
const vsComputerButton = createHtmlElement("button", "id", "vs-computer","VS Computer",);

mainSection.appendChild(vsPlayerButton);
mainSection.appendChild(vsComputerButton);

const BOARD_SIZE = 9;
const PLAYER_SYMBOLS = {
  X: 'X',
  O: 'O',
};

const GAME_MODES = {
  VS_PLAYER: 'vsPlayer',
  VS_COMPUTER: 'vsComputer',
};

let currentPlayerSymbol = "X";
let humanPlayerSymbol = "";
let gameMode = "";
let gameResult;
let isGameActive = "";

const symbols = {
  Xs: [],
  Os: [],
};

const game = Array(BOARD_SIZE).fill("");

function updateGameDisplay() {
  cleanElement(mainSection);
  createGameBoard();
}

let gameTiles = [];

function createGameBoard() {
  gameTiles = [];
  isGameActive = true;
  currentPlayerSymbol = "X";

  if (gameMode === GAME_MODES.VS_COMPUTER && humanPlayerSymbol === "O") {
    makeComputerMoveFirst();
  }
  const gameSection = createHtmlElement("section", "class", "gameboard", null);
  mainSection.appendChild(gameSection);

  gameResult = createHtmlElement("section", "class", "result", null);
  gameSection.appendChild(gameResult);

  const gameBoard = createHtmlElement("section", "class", "gameTiles", null);
  gameSection.appendChild(gameBoard);

  for (let i = 0; i < BOARD_SIZE; i++) {
    const tile = createHtmlElement("div", "data-number", i, null);
    gameBoard.appendChild(tile);
    gameTiles.push(tile);
  }

  const backToMenuButton = createHtmlElement("button", "class", "white-button", "Back to Menu",);
  const restartGameButton = createHtmlElement("button", null, null, "Restart Game");
  gameSection.appendChild(backToMenuButton);
  gameSection.appendChild(restartGameButton);

  backToMenuButton.addEventListener("click", () => {
    cleanElement(mainSection);
    createMenu();
    gameMode = "";
    game.fill("");
  });

  restartGameButton.addEventListener("click", () => {
    gameTiles = [];
    game.fill("");
    isGameActive = true;
    currentPlayerSymbol = "X";
    cleanElement(gameResult);
    updateGameDisplay();
  });

  for (const tile of gameTiles) {
    tile.addEventListener(
      "click",
      () => {
        if (!isGameActive) {
          return;
        } else if (gameMode === GAME_MODES.VS_PLAYER) {
          drawSymbol(currentPlayerSymbol, tile);
          let dataNumber = +tile.getAttribute("data-number");
          updateObject(dataNumber, game, currentPlayerSymbol);
          changeSymbol(currentPlayerSymbol);
          checkGameStatus(game);
        } else if (gameMode === GAME_MODES.VS_COMPUTER) {
          let dataNumber = +tile.getAttribute("data-number");
          if (game[dataNumber] == "") {
            drawSymbol(humanPlayerSymbol, tile);
            updateObject(dataNumber, game, humanPlayerSymbol);
            checkGameStatus(game);
            if (isGameActive) {
              drawComputerChoice(game);
              checkGameStatus(game);
            }
          }
        }
      },
      { once: true },
    );
  }
}

function makeComputerMoveFirst() {
  if (
    humanPlayerSymbol === "O" &&
    Object.values(game).every((value) => value === "")
  ) {
    drawComputerChoice(game);
  }
}

function createMenu() {
  const header = document.createElement("header");
  const h1 = createHtmlElement("h1", null, null, "Play Tic Tac Toe");
  header.appendChild(h1);

  const choiceSection = createHtmlElement("section", "class", "choice", null);

  const vsPlayerButton = createHtmlElement("button", "id", "vs-player", "VS Player");
  const vsComputerButton = createHtmlElement("button", "id", "vs-computer", "VS Computer");

  choiceSection.appendChild(vsPlayerButton);
  choiceSection.appendChild(vsComputerButton);

  mainSection.appendChild(header);
  mainSection.appendChild(choiceSection);

  vsPlayerButton.addEventListener("click", () => {
    cleanElement(mainSection);
    createGameBoard();
    gameMode = GAME_MODES.VS_PLAYER;
  });

  vsComputerButton.addEventListener("click", () => {
    cleanElement(mainSection);
    showOptions();
    console.log("works");
    gameMode = GAME_MODES.VS_COMPUTER;
  });
}

function cleanElement(el) {
  while (el.lastElementChild) {
    el.removeChild(el.lastElementChild);
  }
}

function createHtmlElement(el, attribute, attributeName, text) {
  let newElement = document.createElement(el);
  if (attribute && attributeName) {
    newElement.setAttribute(attribute, attributeName);
  }
  if (text) {
    newElement.textContent = text;
  }
  return newElement;
}

function showOptions() {
  const header = createHtmlElement("header",null, null);
  const h1 = createHtmlElement("h1",null, null, "Play Tic Tac Toe");
  header.appendChild(h1);
  mainSection.appendChild(header);
  const choiceSection = createHtmlElement("section", "class", "choice");
  const choiceText = createHtmlElement("p", null, null, "Choose your symbol");
  const xBtn = createHtmlElement("button", null, null, "X");
  const oBtn = createHtmlElement("button", null, null, "O");
  mainSection.appendChild(choiceSection);
  choiceSection.appendChild(choiceText);
  choiceSection.appendChild(xBtn);
  choiceSection.appendChild(oBtn);

  xBtn.addEventListener("click", () => {
    currentPlayerSymbol = "X";
    humanPlayerSymbol = "X";
    updateGameDisplay();
  });

  oBtn.addEventListener("click", () => {
    currentPlayerSymbol = "O";
    humanPlayerSymbol = "O";
    updateGameDisplay();
  });
}

// Event listeners
vsPlayerButton.addEventListener("click", () => {
  cleanElement(mainSection);
  createGameBoard();
  gameMode = GAME_MODES.VS_PLAYER;
});

vsComputerButton.addEventListener("click", () => {
  cleanElement(mainSection);
  showOptions();
  gameMode = GAME_MODES.VS_COMPUTER;
});

function generateSymbols(symbol) {
  for (let i = 1; i < 10; i++) {
    const newSymbol = createHtmlElement("img","src",`assets/images/${symbol}'s/${symbol}${i}.png`);
    newSymbol.setAttribute("alt", `${symbol} symbol`);
    if (symbol === "X") {
      symbols.Xs.push(newSymbol);
    } else if (symbol === "O") {
      symbols.Os.push(newSymbol);
    }
  }
}

generateSymbols("X");
generateSymbols("O");

function drawSymbol(symbol, parent) {
  const random = getRandomNum(BOARD_SIZE);
  let image = 0;
  if (symbol === "X") {
    image = symbols.Xs[random];
  } else if (symbol === "O") {
    image = symbols.Os[random];
  }

  const cloneImage = image.cloneNode(true);
  parent.appendChild(cloneImage);
}

function endGame() {
  isGameActive = false;
}

function restartGame() {
  for (square of game) {
    square = "";
  }
}

function changeSymbol(playerType) {
  let oppositeSymbol = playerType === PLAYER_SYMBOLS.X ? PLAYER_SYMBOLS.O : PLAYER_SYMBOLS.X;
  if(gameMode === GAME_MODES.VS_COMPUTER) return oppositeSymbol;
  else if(gameMode === GAME_MODES.VS_PLAYER) return currentPlayerSymbol = oppositeSymbol;
}

function updateObject(num, obj, userType) {
  obj[num] = userType;
}

// Скоротити функцію
function checkGameStatus(obj) {
  let marks = ["X", "O"];
  for (let mark of marks) {
    if (
      (obj[0] === mark && obj[1] === mark && obj[2] === mark) ||
      (obj[3] === mark && obj[4] === mark && obj[5] === mark) ||
      (obj[6] === mark && obj[7] === mark && obj[8] === mark) ||
      (obj[0] === mark && obj[4] === mark && obj[8] === mark) ||
      (obj[2] === mark && obj[4] === mark && obj[6] === mark) ||
      (obj[0] === mark && obj[3] === mark && obj[6] === mark) ||
      (obj[1] === mark && obj[4] === mark && obj[7] === mark) ||
      (obj[2] === mark && obj[5] === mark && obj[8] === mark)
    ) {
      if (gameMode === GAME_MODES.VS_PLAYER) {
        if (mark === "X") {
          showMessage("The Winner is Player X"); 
        } else if(mark === "X") {
            showMessage("The Winner is Player O");
          } endGame();
        return;
      } else if (gameMode === GAME_MODES.VS_COMPUTER) {
        if (mark === humanPlayerSymbol) {
          showMessage("Congrats, you won");
        } else if (mark !== humanPlayerSymbol) {
          showMessage("It's not your day. Try again");
        }
        endGame();
        return;
      }
    }
  }
  if (Object.values(obj).every((value) => value === "X" || value === "O")) {
    showMessage("It's a Draw");
    endGame();
  }
}

function showMessage(message) {
  const header = createHtmlElement("h1", null, null, message);
  setTimeout(() => {
    gameResult.appendChild(header);
  }, 100);
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

// Рекурсію замінити на while
function drawComputerChoice(obj) {
  let oppositeSymbol = changeSymbol(humanPlayerSymbol);

  let random = getRandomNum(BOARD_SIZE);
  if (obj[random] === "") {
    obj[random] = oppositeSymbol;
    setTimeout(() => {
      drawSymbol(oppositeSymbol, gameTiles[random]);
    }, 500);
  } else drawComputerChoice(obj);
}