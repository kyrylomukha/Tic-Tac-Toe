const main = document.querySelector(".main-section");
const vsPlayerBtn = createHtmlElement("button", "id", "vs-player", "VS Player");
const vsComputerBtn = createHtmlElement("button", "id", "vs-computer","VS Computer",);

main.appendChild(vsPlayerBtn);
main.appendChild(vsComputerBtn);

let playerChoice = "X";
let userChoice = "";
let gameType = "";
let gameResult;
let isOn = "";

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

function updatePage() {
  cleanElement(main);
  createGameboard();
}

let tiles = [];

function createGameboard() {
  tiles = [];
  isOn = true;
  playerChoice = "X";

  if (gameType === "vsComputer") {
    moveFirst();
  }
  const gameSection = createHtmlElement("section", "class", "gameboard", null);
  main.appendChild(gameSection);

  gameResult = createHtmlElement("section", "class", "result", null);
  gameSection.appendChild(gameResult);

  const gameBoard = createHtmlElement("section", "class", "tiles", null);
  gameSection.appendChild(gameBoard);

  for (let i = 0; i < 9; i++) {
    const tile = createHtmlElement("div", "data-number", i, null);
    gameBoard.appendChild(tile);
    tiles.push(tile);
  }
  console.log(tiles);

  const backBtn = createHtmlElement("button", "class", "white-button", "Back to Menu",);
  const restartBtn = createHtmlElement("button", null, null, "Restart Game");
  gameSection.appendChild(backBtn);
  gameSection.appendChild(restartBtn);

  backBtn.addEventListener("click", () => {
    cleanElement(main);
    createMenu();
    gameType = "";
    refreshObj(game);
  });

  restartBtn.addEventListener("click", () => {
    tiles = [];
    refreshObj(game);
    isOn = true;
    playerChoice = "X";
    cleanElement(gameResult);
    updatePage();
  });

  for (const tile of tiles) {
    tile.addEventListener(
      "click",
      () => {
        if (!isOn) {
          return;
        } else if (gameType === "vsPlayer") {
          drawSymbol(playerChoice, tile);
          let dataNumber = extractDataNumber(tile);
          updateObject(dataNumber, game, playerChoice);
          changeSymbol();
          controlFlow(game);
        } else if (gameType === "vsComputer") {
          let dataNumber = extractDataNumber(tile);
          if (game[dataNumber] == "") {
            drawSymbol(userChoice, tile);
            updateObject(dataNumber, game, userChoice);
            controlFlow(game);
            if (isOn) {
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

function moveFirst() {
  if (
    userChoice === "O" &&
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

  const vsPlayerBtn = createHtmlElement("button", "id", "vs-player", "VS Player");
  const vsComputerBtn = createHtmlElement("button", "id", "vs-computer", "VS Computer");

  choiceSection.appendChild(vsPlayerBtn);
  choiceSection.appendChild(vsComputerBtn);

  main.appendChild(header);
  main.appendChild(choiceSection);

  vsPlayerBtn.addEventListener("click", () => {
    cleanElement(main);
    createGameboard();
    gameType = "vsPlayer";
  });

  vsComputerBtn.addEventListener("click", () => {
    cleanElement(main);
    showOptions();
    console.log("works");
    gameType = "vsComputer";
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
  main.appendChild(header);
  const choiceSection = createHtmlElement("section", "class", "choice");
  const choiceText = createHtmlElement("p", null, null, "Choose your symbol");
  const xBtn = createHtmlElement("button", null, null, "X");
  const oBtn = createHtmlElement("button", null, null, "O");
  main.appendChild(choiceSection);
  choiceSection.appendChild(choiceText);
  choiceSection.appendChild(xBtn);
  choiceSection.appendChild(oBtn);

  xBtn.addEventListener("click", () => {
    playerChoice = "X";
    userChoice = "X";
    updatePage();
  });

  oBtn.addEventListener("click", () => {
    playerChoice = "O";
    userChoice = "O";
    updatePage();
  });
}

// Event listeners
vsPlayerBtn.addEventListener("click", () => {
  cleanElement(main);
  createGameboard();
  gameType = "vsPlayer";
});

vsComputerBtn.addEventListener("click", () => {
  cleanElement(main);
  showOptions();
  gameType = "vsComputer";
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
  isOn = false;
}

function restartGame() {
  for (square of game) {
    square = "";
  }
}

function changeSymbol() {
  if (playerChoice === "X") {
    playerChoice = "O";
  } else if (playerChoice === "O") {
    playerChoice = "X";
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
      if (gameType === "vsPlayer") {
        if (mark === "X") {
          showMessage("The Winner is Player X");
        } else if (mark === "O") {
          showMessage("The Winner is Player O");
        }
        endGame();
        return;
      } else if (gameType === "vsComputer") {
        if (mark === userChoice) {
          showMessage("Congrats");
        } else if (mark !== userChoice) {
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
  if (userChoice === "X") {
    oppositeSymbol = "O";
  } else if (userChoice === "O") {
    oppositeSymbol = "X";
  }

  let random = getRandomNum(9);
  if (obj[random] === "") {
    obj[random] = oppositeSymbol;
    setTimeout(() => {
      drawSymbol(oppositeSymbol, tiles[random]);
    }, 500);
  } else drawComputerChoice(obj);
}