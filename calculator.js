//--ALL MATH FUNCTIONS--
const MATH_FUNCS = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => num1 / num2
}


const calculateDisplay = () => {

/*

 But one thing you'll also want to do is make it so that, if the "key" doesn't
 exist in your lookup table, then you will want to set the display to
 'ERROR` here. 

 Remember, you want to find the value of the appropriate key in the lookup table;
 it will return a function.
 You then want to run that function. You can do it all in one line (or two).
 */
    // if (operator != "add" || operator != "subtract"){
    //     displayElem.innerText = 'ERROR'
    // } else
    let display = MATH_FUNCS[operator](num1, num2);

    displayElem.innerText = display;

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
// --FUNCTION TO CHECK OPERATOR AND RETURN ERROR IF OPERATOR NOT IN OBJECT KEY
const operatorCheck = (operator) => {
    //adding multiple comparisons breaks this
    if (operator !== "subtract"){
        console.log (operator)
        console.log (typeof operator);
        displayElem.innerText = 'ERROR';
    }else
        console.log (operator)
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