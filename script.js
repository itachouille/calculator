const screen = document.getElementById("screen");
const resetButton = document.getElementById("reset-btn");
const loveButton = document.getElementById("love-btn");
const numberButtons = document.querySelectorAll(".number-btn");
const signButtons = document.querySelectorAll(".sign-btn");

let currentNumber = "";
let previousNumber = "";
let operator = null;

function updateScreen(content) {
  screen.textContent = content;
}

resetButton.addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operator = null;
  updateScreen("0");
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber === "0") currentNumber = "";
    currentNumber += button.textContent;
    updateScreen(currentNumber);
  });
});

signButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber === "") return;
    if (operator && previousNumber && currentNumber) {
      calculate();
    }
    operator = button.textContent;
    previousNumber = currentNumber;
    currentNumber = "";
  });
});

document.querySelector(".sign-btn:last-child").addEventListener("click", () => {
  if (previousNumber && currentNumber && operator) {
    calculate();
  }
});

function calculate() {
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);

  if (isNaN(num1) || isNaN(num2)) return;

  let result = 0;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "%":
      result = num1 % num2;
      break;
  }

  updateScreen(result);
  currentNumber = result.toString();
  previousNumber = "";
  operator = null;
}

loveButton.addEventListener("click", () => {
  screen.innerHTML = `<span>Made with ❤️ by Anthony</span>`;
});
