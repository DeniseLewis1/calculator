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

    } else if (this.classList.contains("num") || !hasDecimal) {
        if (this.classList.contains("decimal")) {
            hasDecimal = true;
        }

        numStr.push(this.textContent);
        display.innerText = numStr.join("");
        
    }
}

function resetData () {
    evalStr = [];        
    numStr = [];
    hasDecimal = false;
}

buttons.forEach(button => button.addEventListener("click", buttonClicked));

