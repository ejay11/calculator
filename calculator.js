//--ALL MATH FUNCTIONS--
const MATH_FUNCS = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2
}


const calculateDisplay = () => {
  let displayText = "0"

  // Assigned Math_funcs to a variable. Dev Tools tells me this isn't a function, but maybe I'm getting closer? 
  const func = ((num1, num2) => {
    MATH_FUNCS[operator](num1, num2)
  });

  if (func != undefined) {
    displayText = func(num1, num2); // we got a function back! run it!
  } else {
    // looks like `func` was `undefined`! Set the displayText to 'ERROR!'
    displayText = 'ERROR!'
  }

  displayElem.innerText = displayText;

  //--OLD DISPLAY ELEMENTS--
  // let display = MATH_FUNCS[operator](num1, num2);

  // displayElem.innerText = display;

}
//--SAVING INPUT AND DISPLAY FUNCTIONS--

let num1 = '';
let num2 = '';
let answer = '';
let operator = [];
let displayElem = document.querySelector('#display');

const saveNum1 = ((buttonName) => {
  num1 += buttonName.target.innerText;
  displayElem.innerText = num1;
  num1 = parseFloat(num1);
  return num1;
})

const operatorPush = (buttonPushed) => {
  if (num1 !== '' && num2 == '') {
    buttons.forEach((button) => {
      button.removeEventListener('click', saveNum1)
    });
    operator = buttonPushed.target.id;
    console.log(typeof operator);
    buttons.forEach((button) => {
      button.addEventListener('click', saveNum2)
    });
  } else if (num1 !== '' && num2 !== '') {
    num1 = MATH_FUNCS[operator](num1, num2);
    operator = buttonPushed.target.id;
    console.log(num1);
    num2 = '';
  } else
    displayElem.innerText = 'ERROR';
  return operator;
}

const saveNum2 = ((buttonName) => {
  num2 += buttonName.target.innerText;
  displayElem.innerText = num2;
  num2 = parseFloat(num2);
  return num2
})

const startOver = () => {
  num1 = '';
  operator = '';
  num2 = '';
  displayElem.innerText = '0';
  buttons.forEach((button) => {
    button.removeEventListener('click', saveNum2)
  });
  buttons.forEach((button) => {
    button.addEventListener('click', saveNum1)
  });
  return num1, operator, num2;
}

//--BUTTON EVENT LISTENERS--
let buttons = document.getElementsByClassName('calc-btn');
buttons = Array.from(buttons);
buttons.forEach((button) => {
  button.addEventListener('click', saveNum1)
});

let operators = document.getElementsByClassName('operator');
operators = Array.from(operators);
operators.forEach((operator) => {
  operator.addEventListener('click', operatorPush)
});

let calculate = document.getElementById('calculate');
calculate.addEventListener("click", calculateDisplay);

let clearButton = document.getElementById('clear');
clearButton.addEventListener("click", startOver);