/*
OOOOOOHHH fancy. Looky here - it's an Anonymous, Immediately-invoked function expression.
Whose return values will be an "object literal"! WTF? Why would we do this?

In short, scoping. This keeps all our variables , from
being in the global scope of the page. If index.html adds more scripts besides
this one, there is less chance that we will have a variable conflict!

There's TONS to explain here, but it's pretty awesome.

https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression-iife/
This function now returns NOTHING. But it runs right after it's defined.
So there's no need to assign the output of this function to a [global] variable.

There are now NO global variables that this script introduces!
 */
(() => {

  const newNumParts = [] // collects digits/decimals from user input
  let operator = null; // the latest operator
  let subtotal = null; // the running subtotal

  /*
  --ALL MATH FUNCTIONS--
  These will be used later in this script.
  */
  const MATH_FUNCS = {
    add: () => subtotal + getNewNum(),
    subtract: () => subtotal - getNewNum(),
    multiply: () => subtotal * getNewNum(),
    divide: () => subtotal / getNewNum()
  }

  /*
  Next, we grab all the elements off the screen using `querySelector` and
  `querySelectorAll`.
  https://www.w3schools.com/jsref/met_document_queryselector.asp

  Then we assign the elements we find to a `const` variable; we won't be
  re-assigning them again. Now the variables are sitting there, ready for us
  to use and re-use them; there's no need to search the DOM again for the
  elements more than once!
  */
  const calcButton = document.querySelector('#calculate');
  const clearButton = document.querySelector('#clear');
  const operatorElems = document.querySelectorAll('.operator');
  const buttonElems = document.querySelectorAll('.calc-btn');
  const displayElem = document.querySelector('#display');

  // Retrieve/parse the number from the collected newNumParts
  const getNewNum = () => {
    return parseFloat(newNumParts.join(''))
  }

  const clearNumParts = () => {
    newNumParts.length = 0  // this clears the array. Dumb way to do it, I know.
  }

  /*
    Actually does the magic of keeping a running subtotal
    1. choose the right math function, based on the latest operator.
    2. check that the subtotal is present and the new num is present as well
    3. run that function, or if the operator isn't there, return an error.

  */
  const setSubtotal = () => {
    const newNum = getNewNum()

    if (subtotal === null) {
      subtotal = newNum;
      clearNumParts();
      return
    }

    if (isNaN(newNum)) return // newNumParts is likely empty!

    const mathFunc = MATH_FUNCS[operator]
    if (!mathFunc) return 'ERROR!';

    subtotal = mathFunc();
    clearNumParts();
  }

  // Only job is to set the display to the `val`. simple!
  const setDisplay = (val) => {
    displayElem.innerText = val;
  }

  // Find the value. Set the display to that value!
  const displayCalculation = () => {
    setSubtotal();
    setDisplay(subtotal);
  }

  /*
    Sets the operator value.
    But also, at the time the operator is pressed
  */
  const setOperator = (event) => {
    setSubtotal()
    operator = event.target.id;
  }

  // Clear the display. Clear the subtotal.
  const startOver = () => {
    clearNumParts()
    subtotal = null;
    operator = null;
    setDisplay(0);
  }

  // Show the number pressed.
  const collectNumParts = (event) => {
    const part = event.target.innerText;
    newNumParts.push(part);
    setDisplay(getNewNum())
  }

  /*
    We're doing all the things that need to happen at the beginning of the
    script. This function will be called in index.html once the DOM is loaded.
  */
  const init = () => {
    console.log("initializing...")
    console.log("[initializing] adding event listeners...")
    calcButton.addEventListener("click", displayCalculation);
    clearButton.addEventListener("click", startOver);
    operatorElems.forEach((operator) => {
      operator.addEventListener('click', setOperator)
    });
    buttonElems.forEach((button) => {
      button.addEventListener('click', collectNumParts)
    });
  }

  // Here, we wait for the DOM to be ready, after which we run `init`.
  // `init` is above, and it attaches event listeners to all the
  // appropriate elements on the [now DOM-ready] page.
  // If you remember, this event listener was in our index.html file, but now
  // we've just put it here instead. CLEANER.
  window.addEventListener('DOMContentLoaded', init)
})();
// ^^^^ This is the auto-invoking part of this function.
