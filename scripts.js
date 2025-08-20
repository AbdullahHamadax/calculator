const buttons = [
  "Ac",
  "⌫",
  "/",
  "*",
  "7",
  "8",
  "9",
  "-",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "=",
  "0",
  ".",
];

const container = document.querySelector("#container");
const userInput = document.querySelector("#user-input");
const firstNumDisplay = document.querySelector("#first-number");
const operatorDisplay = document.querySelector("#operator");
const secondNumDisplay = document.querySelector("#second-number");
const resultDisplay = document.querySelector("#result");

let first = "";
let second = "";
let op = "";
let result = "";

buttons.forEach((btn) => {
  const div = document.createElement("button");

  const styles = {
    Ac: "bg-[#5E605F] text-white py-3 rounded-2xl text-xl hover:bg-[#9b9b9b] cursor-pointer",
    "⌫": "bg-[#5E605F] text-white py-3 rounded-2xl text-xl hover:bg-[#9b9b9b] cursor-pointer",
    "/": "bg-[#2C95C5] text-white py-3 rounded-2xl text-xl font-bold hover:bg-[#fff] hover:text-black cursor-pointer",
    "*": "bg-[#2C95C5] text-white py-3 rounded-2xl text-xl font-bold hover:bg-[#fff] hover:text-black cursor-pointer",
    "-": "bg-[#2C95C5] text-white py-3 rounded-2xl text-xl font-bold hover:bg-[#fff] hover:text-black cursor-pointer",
    "+": "bg-[#2C95C5] text-white py-3 rounded-2xl text-xl font-bold hover:bg-[#fff] hover:text-black cursor-pointer",
    "=": "bg-[#2C95C5] text-white py-3 rounded-2xl row-span-2 text-xl font-bold flex items-center justify-center hover:bg-[#fff] hover:text-black cursor-pointer",
    0: "bg-[#2F3135] text-[#2C95C5] text-2xl py-3 rounded-2xl col-span-2 text-xl hover:bg-[#404247] cursor-pointer",
    default:
      "bg-[#2F3135] text-[#2C95C5] text-2xl py-3 rounded-2xl hover:bg-[#404247] cursor-pointer",
  };

  div.className = styles[btn] || styles["default"];
  div.textContent = btn;

  div.addEventListener("click", () => handleInput(btn));
  container.appendChild(div);
});

function handleInput(btn) {
  if (!isNaN(btn)) {
    if (op === "" && first.length < 10) {
      first += btn;
    } else if (op !== "" && second.length < 10) {
      second += btn;
    }
  } else if (btn === "Ac") {
    clear();
  } else if (btn === "⌫") {
    backspace();
  } else if (["+", "-", "*", "/"].includes(btn)) {
    if (first !== "" && result !== "You can't divide by 0!") {
      op = btn;
    }
  } else if (btn === ".") {
    if (op === "" && !first.includes(".") && first.length < 10) {
      first += first === "" ? "0." : ".";
    } else if (op !== "" && !second.includes(".") && second.length < 10) {
      second += second === "" ? "0." : ".";
    }
  } else if (btn === "=") {
    evaluate();
  }

  updateDisplay();
}

function updateDisplay() {
  firstNumDisplay.textContent = first;
  operatorDisplay.textContent = op;
  secondNumDisplay.textContent = second;
  resultDisplay.textContent = result;
}

function clear() {
  first = "";
  second = "";
  op = "";
  result = "";
  updateDisplay();
}

function backspace() {
  if (second !== "") {
    second = second.slice(0, -1);
  } else if (op !== "") {
    op = "";
  } else {
    first = first.slice(0, -1);
  }
  updateDisplay();
}

function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? null : a / b;
}

function evaluate() {
  if (first === "" || second === "" || op === "") return;

  let a = Number(first);
  let b = Number(second);

  if (op === "+") result = sum(a, b);
  if (op === "-") result = subtract(a, b);
  if (op === "*") result = multiply(a, b);
  if (op === "/") {
    if (b === 0) {
      result = "You can't divide by 0!";
      first = "";
      second = "";
      op = "";
      updateDisplay();
      return;
    } else {
      result = divide(a, b);
    }
  }

  result = Number(result).toFixed(3);

  if (result.replace(".", "").length > 12) {
    result = "Overflow! Please clear.";
    return;
  }

  first = result;
  second = "";
  op = "";
}
