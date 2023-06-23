const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let evalStr = [];
let numStr = [];
let hasDecimal = false;

function buttonClicked () {
    if (this.classList.contains("clear-data")) {
        display.innerText = 0;
        resetData();

    } else if (this.classList.contains("equal")) {
        evalStr.push(...numStr);
        display.innerText = eval(evalStr.join(""));
        resetData();

    } else if (this.classList.contains("operator")) {
        if (numStr.length !== 0) {
            evalStr.push(...numStr);
            numStr = [];
            hasDecimal = false;
        }        

        if (evalStr[evalStr.length - 1] === "/" || evalStr[evalStr.length - 1] === "*" || evalStr[evalStr.length - 1] === "-" || evalStr[evalStr.length - 1] === "+") {
            evalStr.pop();
        }

        evalStr.push(this.textContent);

    } else if (this.classList.contains("num")) {
        numStr.push(this.textContent);
        display.innerText = numStr.join("");
        
    } else if (this.classList.contains("decimal") && !hasDecimal) {
        numStr.push(this.textContent);
        display.innerText = numStr.join("");
        hasDecimal = true;
    }
}

function keyboardInput (input) {
    const numInput = /[0-9]/;

    if (input.toLowerCase() === "c" || input === "Clear") {
        display.innerText = 0;
        resetData();

    } else if (input === "Enter" || input === "=") {
        evalStr.push(...numStr);
        display.innerText = eval(evalStr.join(""));
        resetData();

    } else if (input === "/" || input === "*" || input === "-" || input === "+") {
        if (numStr.length !== 0) {
            evalStr.push(...numStr);
            numStr = [];
            hasDecimal = false;
        }        

        if (evalStr[evalStr.length - 1] === "/" || evalStr[evalStr.length - 1] === "*" || evalStr[evalStr.length - 1] === "-" || evalStr[evalStr.length - 1] === "+") {
            evalStr.pop();
        }

        evalStr.push(input);

    } else if (input.match(numInput)) {
        numStr.push(input);
        display.innerText = numStr.join("");

    } else if (input === "." && !hasDecimal) {
        numStr.push(input);
        display.innerText = numStr.join("");
        hasDecimal = true;
    }
}

function resetData () {
    evalStr = [];        
    numStr = [];
    hasDecimal = false;
}

buttons.forEach(button => button.addEventListener("click", buttonClicked));

document.addEventListener("keydown", (e) => {
    keyboardInput(e.key);
});