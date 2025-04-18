export const htmlPracticeCode = {
  html: `
    <div class="calculator-container">
      <div class="display-container">0</div>
      <div class="buttons-container">
        <div class="button function">C</div>
        <div class="button function">±</div>
        <div class="button function">%</div>
        <div class="button operator">/</div>
        <div class="button number">7</div>
        <div class="button number">8</div>
        <div class="button number">9</div>
        <div class="button operator">*</div>
        <div class="button number">4</div>
        <div class="button number">5</div>
        <div class="button number">6</div>
        <div class="button operator">-</div>
        <div class="button number">1</div>
        <div class="button number">2</div>
        <div class="button number">3</div>
        <div class="button operator">+</div>
        <div class="button number zero">0</div>
        <div class="button">.</div>
        <div class="button equals">=</div>
      </div>
    </div>`,

  css: `
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css");
:root {
  --color-navy: #323851;
  --color-navy2: #493e52;
  --color-light-pink: #e4d0c5;
  --color-gray: #616478;
  --color-red-orange: #d58b79;
  --color-light-gray: #dedde1;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
html {
  height: 100%;
}
body {
  height: 100%;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calculator-container {
  max-width: 400px;
  width: 50%;
  min-width: 320px;
  aspect-ratio: 9/16;
  background-color: var(--color-navy);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.display-container {
  border: 4px solid var(--color-red-orange);
  background-color: var(--color-navy2);
  color: var(--color-light-pink);
  font-size: min(32px, max(16px, 4vw));
  border-radius: 16px;
  height: 20%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 16px;
}

.buttons-container {
  height: 80%;
  min-width: 275px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  flex: 1;
}

.button {
  flex-basis: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 4px solid var(--color-light-gray);
  background-color: var(--color-gray);
  color: var(--color-light-gray);
  font-size: min(20px, max(3vw, 12px));

  &:hover {
    background-color: var(--color-light-gray);
    color: var(--color-gray);
    border: 4px solid var(--color-gray);
  }

  &:active {
    background-color: var(--color-light-pink);
  }
}
.zero {
  flex-basis: 46%;
  justify-content: flex-start;
  padding-left: 26px;
}
.operator {
  background-color: var(--color-navy2);
}
.equals {
  background-color: var(--color-navy2);
  border: 4px solid var(--color-red-orange);
  color: var(--color-light-pink);
}
`,

  js: `
function calculate(firstOperand, secondOperand, operator) {
  const formulas = {
    "+": (first, second) => first + second,
    "-": (first, second) => first - second,
    "*": (first, second) => first * second,
    "/": (first, second) => first / second,
  };
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);

  return formulas[operator](first, second);
}

function calculateResult() {
  secondOperand = display.textContent;
  display.textContent = calculate(firstOperand, secondOperand, operator);
  needNext = false;
  firstOperand = null;
}

function saveFirstOperand(newOperator) {
  firstOperand = display.textContent;
  operator = newOperator;
  needNext = true;
  console.log("First Operand: ", firstOperand);
  console.log("Operator: ", operator);
}

function clearDisplay() {
  display.textContent = "0";
}

function addDot() {
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
}

function addNumber(number) {
  if (display.textContent === "0") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

function btnClickHanler(e) {
  console.log(e.target.textContent);
  const btnText = e.target.textContent;

  switch (btnText) {
    case "C":
      clearDisplay();
      break;
    case ".":
      addDot();
      break;
    case "=":
      calculateResult();
      break;
    default:
      if (e.target.classList.contains("number")) {
        if (needNext) {
          display.textContent = "0";
          needNext = false;
        }
        addNumber(btnText);
        return;
      }
      if (e.target.classList.contains("operator")) {
        if (firstOperand === null) {
          saveFirstOperand(btnText);
        }
        return;
      }
      break;
  }
}

const display = document.querySelector(".display-container");
const buttonElems = document.querySelectorAll(".button");

let firstOperand = null;
let secondOperand = null;
let operator = null;
let needNext = false;

buttonElems.forEach((button) => {
  button.addEventListener("click", btnClickHanler);
});`,
};
