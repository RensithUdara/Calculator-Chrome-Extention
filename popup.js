const display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let shouldResetDisplay = false;

function inputDigit(digit) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = digit;
    shouldResetDisplay = false;
  } else {
    display.textContent += digit;
  }
}

function inputDot() {
  if (shouldResetDisplay) {
    display.textContent = '0.';
    shouldResetDisplay = false;
    return;
  }
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function clearDisplay() {
  display.textContent = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  shouldResetDisplay = false;
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.textContent);
  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }
  if (firstOperand == null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation(operator, firstOperand, inputValue);
    display.textContent = String(result);
    firstOperand = result;
  }
  operator = nextOperator;
  waitingForSecondOperand = true;
  shouldResetDisplay = true;
}

function performCalculation(operator, first, second) {
  switch (operator) {
    case 'plus': return first + second;
    case 'minus': return first - second;
    case 'multiply': return first * second;
    case 'divide': return second !== 0 ? first / second : 'Error';
    default: return second;
  }
}

function handleEquals() {
  if (!operator || waitingForSecondOperand) return;
  const inputValue = parseFloat(display.textContent);
  const result = performCalculation(operator, firstOperand, inputValue);
  display.textContent = String(result);
  firstOperand = result;
  operator = null;
  waitingForSecondOperand = false;
  shouldResetDisplay = true;
}

function handlePercent() {
  display.textContent = String(parseFloat(display.textContent) / 100);
  shouldResetDisplay = true;
}

function handlePlusMinus() {
  display.textContent = String(parseFloat(display.textContent) * -1);
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    if (!isNaN(action)) {
      inputDigit(action);
    } else if (action === 'dot') {
      inputDot();
    } else if (action === 'clear') {
      clearDisplay();
    } else if (['plus', 'minus', 'multiply', 'divide'].includes(action)) {
      handleOperator(action);
    } else if (action === 'equals') {
      handleEquals();
    } else if (action === 'percent') {
      handlePercent();
    } else if (action === 'plus-minus') {
      handlePlusMinus();
    }
  });
});

clearDisplay();
