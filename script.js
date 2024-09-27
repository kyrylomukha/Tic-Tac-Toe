const mainSection = document.querySelector(".main-section");
const vsPlayerButton = createHtmlElement("button", "id", "vs-player", "VS Player");
const vsComputerButton = createHtmlElement("button", "id", "vs-computer","VS Computer",);

mainSection.appendChild(vsPlayerButton);
mainSection.appendChild(vsComputerButton);

let currentPlayerSymbol = "X";
let humanPlayerSymbol = "";
let gameMode = "";
let gameResult;
let isGameActive = "";

const game = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};

function updateGameDisplay() {
  cleanElement(mainSection);
  createGameBoard();
}

let gameTiles = [];

function createGameBoard() {
  gameTiles = [];
  isGameActive = true;
  currentPlayerSymbol = "X";

  if (gameMode === "vsComputer") {
    makeComputerMoveFirst();
  }
  const gameSection = createHtmlElement("section", "class", "gameboard", null);
  mainSection.appendChild(gameSection);

  gameResult = createHtmlElement("section", "class", "result", null);
  gameSection.appendChild(gameResult);

  const gameBoard = createHtmlElement("section", "class", "gameTiles", null);
  gameSection.appendChild(gameBoard);

  for (let i = 0; i < 9; i++) {
    const tile = createHtmlElement("div", "data-number", i, null);
    gameBoard.appendChild(tile);
    gameTiles.push(tile);
  }
  console.log(gameTiles);

  const backToMenuButton = createHtmlElement("button", "class", "white-button", "Back to Menu",);
  const restartGameButton = createHtmlElement("button", null, null, "Restart Game");
  gameSection.appendChild(backToMenuButton);
  gameSection.appendChild(restartGameButton);

  backToMenuButton.addEventListener("click", () => {
    cleanElement(mainSection);
    createMenu();
    gameMode = "";
    refreshObj(game);
  });

  restartGameButton.addEventListener("click", () => {
    gameTiles = [];
    refreshObj(game);
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
        } else if (gameMode === "vsPlayer") {
          drawSymbol(currentPlayerSymbol, tile);
          let dataNumber = extractDataNumber(tile);
          updateObject(dataNumber, game, currentPlayerSymbol);
          changeSymbol();
          controlFlow(game);
        } else if (gameMode === "vsComputer") {
          let dataNumber = extractDataNumber(tile);
          if (game[dataNumber] == "") {
            drawSymbol(humanPlayerSymbol, tile);
            updateObject(dataNumber, game, humanPlayerSymbol);
            controlFlow(game);
            if (isGameActive) {
              drawComputerChoice(game);
              controlFlow(game);
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
    gameMode = "vsPlayer";
  });

  vsComputerButton.addEventListener("click", () => {
    cleanElement(mainSection);
    showOptions();
    console.log("works");
    gameMode = "vsComputer";
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
  gameMode = "vsPlayer";
});

vsComputerButton.addEventListener("click", () => {
  cleanElement(mainSection);
  showOptions();
  gameMode = "vsComputer";
});

const Xs = [];
const Os = [];

function generateSymbols(symbol) {
  for (let i = 1; i < 10; i++) {
    const newSymbol = createHtmlElement("img","src",`assets/images/${symbol}'s/${symbol}${i}.png`);
    newSymbol.setAttribute("alt", `${symbol} symbol`);
    if (symbol === "X") {
      Xs.push(newSymbol);
    } else if (symbol === "O") {
      Os.push(newSymbol);
    }
  }
}

generateSymbols("X");
generateSymbols("O");

function drawSymbol(symbol, parent) {
  const random = getRandomNum(9);
  let image = 0;
  if (symbol === "X") {
    image = Xs[random];
  } else if (symbol === "O") {
    image = Os[random];
  }

  const cloneImage = image.cloneNode(true);
  parent.appendChild(cloneImage);
}

function extractDataNumber(el) {
  let dataNumber = el.getAttribute("data-number");
  dataNumber = +dataNumber;
  console.log(dataNumber);
  return dataNumber;
}

function endGame() {
  isGameActive = false;
}

function restartGame() {
  for (square of game) {
    square = "";
  }
}

function changeSymbol() {
  if (currentPlayerSymbol === "X") {
    currentPlayerSymbol = "O";
  } else if (currentPlayerSymbol === "O") {
    currentPlayerSymbol = "X";
  }
}

function updateObject(num, obj, userType) {
  obj[num] = userType;
}

function refreshObj(obj) {
  for (let key in obj) {
    obj[key] = "";
  }
}

function controlFlow(obj) {
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
      if (gameMode === "vsPlayer") {
        if (mark === "X") {
          showMessage("The Winner is Player X");
        } else if (mark === "O") {
          showMessage("The Winner is Player O");
        }
        endGame();
        return;
      } else if (gameMode === "vsComputer") {
        if (mark === humanPlayerSymbol) {
          showMessage("Congrats");
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
    console.log("draw");
    endGame();
  }
}

function showMessage(message) {
  const header = createHtmlElement("h1", null, null, message);
  setTimeout(() => {
    gameResult.appendChild(header);
  }, 500);
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

function drawComputerChoice(obj) {
  let oppositeSymbol;
  if (humanPlayerSymbol === "X") {
    oppositeSymbol = "O";
  } else if (humanPlayerSymbol === "O") {
    oppositeSymbol = "X";
  }

  let random = getRandomNum(9);
  if (obj[random] === "") {
    obj[random] = oppositeSymbol;
    setTimeout(() => {
      drawSymbol(oppositeSymbol, gameTiles[random]);
    }, 500);
  } else drawComputerChoice(obj);
}