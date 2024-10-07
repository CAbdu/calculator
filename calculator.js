let currentInput = '0';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

const display = document.getElementById('display');

function updateDisplay(value) {
  display.textContent = value;
}

function handleNumber(value) {
  if (resultDisplayed) {
    currentInput = value;
    resultDisplayed = false;
  } else {
    currentInput = currentInput === '0' ? value : currentInput + value;
  }
  updateDisplay(currentInput);
}

function handleOperator(value) {
  if (operator !== '') {
    calculate();
  }
  previousInput = currentInput;
  operator = value;
  currentInput = '';
}

function handleSpecialFuntion(value) {
  switch (value) {
    case 'clear':
      currentInput = '0';
      previousInput = '';
      operator = '';
      updateDisplay(currentInput);
      break; 
    
    case 'percent':
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay(currentInput);
      break;
      case 'backspace': // Handle the backspace functionality
      if (currentInput.length > 1) {
          currentInput = currentInput.slice(0, -1);
      } else {
          currentInput = '0';
      }
      updateDisplay(currentInput);
      break;
    default: 
      break;
  }
}


function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
      case '+':
          result = prev + curr;
          break;
      case '-':
          result = prev - curr;
          break;
      case '*':
          result = prev * curr;
          break;
      case '/':
          result = curr !== 0 ? prev / curr : 'Error';
          break;
      default:
          return;
  }
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  resultDisplayed = true;
  updateDisplay(currentInput)
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.value;
    if(!isNaN(value) || value === '.') {
      handleNumber(value);
    } else if (value === '=' && previousInput !== '' && currentInput !== '') {
      calculate();
    } else if (value === '+' || value === '-' || value === '*' || value == '/') {
      handleOperator(value);
    } else {
      handleSpecialFuntion(value);
    }
  });
});