// --CALCULATOR MATH FUNCTIONS--

const add = ((num1, num2) => {
    return num1 + num2;
});

const subtract = ((num1, num2) => {
    return num1 - num2;
});

const multiply = ((num1, num2) => {
    return num1 * num2;
});

const divide = ((num1, num2) => {
    return num1 / num2;
});

const operate = ((operator, num1, num2) => {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == 'x') {
        return multiply(num1, num2);
    } else(operator == '/')
    return divide(num1, num2);

})

const calculateDisplay = () =>{
    display = operate(operator, num1, num2);
    document.querySelector('#display').innerHTML = display;

}
//--SAVING INPUT AND DISPLAY FUNCTIONS--

let num1 = '';
let num2 = '';
let answer = '';
let operator = [];

const saveNum1 = ((buttonName) => {
    //display.push(buttonName.target.innerHTML);
    num1 += buttonName.target.innerHTML;
    document.querySelector('#display').innerHTML = num1;
    num1 = parseFloat(num1);
    return num1;
})

const operatorPush = (buttonPushed) => {
    //if num1 is not empty and num2 is empty
    if (num1 !== '' && num2 == ''){
    buttons.forEach((button) => {button.removeEventListener('click', saveNum1)});
    operator = buttonPushed.target.id;
    console.log (typeof operator);
    buttons.forEach((button) => {button.addEventListener('click', saveNum2)});
}
    //else if num1 is not empty and num2 is not empty
    else if (num1 !== '' && num2 !== '' ){
        num1 = operate (operator, num1, num2);
        operator = buttonPushed.target.id;
        console.log(num1);
        num2 = '';
    }
    else 
    document.querySelector('#display').innerHTML = 'ERROR';
    return operator;
}

const saveNum2 = ((buttonName) => {
    num2 += buttonName.target.innerHTML;
    document.querySelector ('#display').innerHTML = num2;
    num2 = parseFloat(num2);
    return num2
})

const startOver = () => {
    num1 = '';
    operator = '';
    num2 = '';
    document.querySelector ('#display').innerHTML = '0';
    buttons.forEach((button) => {button.removeEventListener('click', saveNum2)});
    buttons.forEach((button) => {button.addEventListener('click', saveNum1)});
    return num1, operator, num2;
}

//--BUTTON EVENT LISTENERS--
let buttons = document.getElementsByClassName('calc-btn');
buttons = Array.from(buttons);
buttons.forEach((button) => {button.addEventListener('click', saveNum1)});

let operators = document.getElementsByClassName('operator');
operators = Array.from(operators);
operators.forEach((operator) => {operator.addEventListener('click', operatorPush)}); 

let calculate = document.getElementById('calculate');
calculate.addEventListener("click", calculateDisplay);

let clearButton = document.getElementById('clear');
clearButton.addEventListener("click", startOver);