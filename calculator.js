/*
<Eric>:
Part 1:
Ok, this is kind of advanced, but once you get it, you will be unstoppable.
This is a 2 part-er.

You're going to make a nice constant called `MATH_FUNCS`.
It's going to be an object literal.
You're going to name each property/key in this object literal to a name of each
of your math functions below.
Each property's value will be it's corresponding one-line fat-arrow function.

```
{
  "add": (num1, num2) => return num1 + num2;,
  "subtract" .... blah blah blah
}
```
 */

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

// OPERATE FUNCTION WITH SWITCH STATEMENT
/* 
Wow! Eric tells me this is a great way to write this function. 
It is so short and simple and nice. 
Way to go, me (Ellen Jaquette).
*/
const operate = (operator, num1, num2) => {
switch(operator) {
    case '+':
        return add(num1, num2);
      break;
    case '-':
        return subtract(num1, num2);
      break;
    case 'x':
        return multiply(num1, num2);
      break;
    case '/':
        return divide(num1, num2);
    break
    default:
       return 'ERROR';
  } 
}
// OPERATE COMMAND WITH IF/ELSE STATEMENT
// const operate = ((operator, num1, num2) => {
//     if (operator == '+') {
//         return add(num1, num2);
//     } else if (operator == '-') {
//         return subtract(num1, num2);
//     } else if (operator == 'x') {
//         return multiply(num1, num2);
//     } else(operator == '/')
//     return divide(num1, num2);

// })

const calculateDisplay = () => {
    /*
 <Eric>: Part 2.
 Screw that switch statement above, as well as that whole `operate` function!
 Instead, we're going to use the object literal we
 created above to simply call the right function!
 This is commonly called a "lookup table" or a "lookup map", and it's super fun
 for a lot of cool reasons that you'll see down the road.

 I'm just giving you a hint as to what to do here, more than tell you explicitly.

 https://dev.to/k_penguin_sato/use-lookup-tables-for-cleaning-up-your-js-ts-code-9gk

 But one thing you'll also want to do is make it so that, if the "key" doesn't
 exist in your lookup table, then you will want to set the display to
 'ERROR` here.

 Remember, you want to find the value of the appropriate key in the lookup table;
 it will return a function.
 You then want to run that function. You can do it all in one line (or two).
 */

    const display = operate(operator, num1, num2);
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
        num1 = operate(operator, num1, num2);
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