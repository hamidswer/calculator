class Calculator {
    constructor (previousOperandText,currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
        this.curry = "";
        this.words = [];
        this.finalParagraph = "";
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        this.words = [];
        this.curry = "";
        this.result = "";
        this.previousOperandText.innerText = "";
        this.currentOperandText.innerText = "";
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1); 
    }
    appendNum(number) {
        if (number === "." && this.currentOperand.toString().includes(".")) {
        }
        else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        };
        
    }
    roundIt(round){
        let roundNow = "";
        if (round == Number(round.toFixed(1))){
            roundNow = round.toFixed(1);
        }
        else if (round == Number(round.toFixed(2))){
            roundNow = round.toFixed(2);
        }
        else if (round == Number(round.toFixed(3))){
            roundNow = round.toFixed(3);
        }
        else {
            roundNow = round.toFixed(4);
        }
        return roundNow;
    }
    instanceOperation(operate) {  
        if (operate == "sin" && this.currentOperand) {
            this.currentOperand = this.currentOperand * 0.0174533;
            this.currentOperand = this.roundIt(Math.sin(this.currentOperand));
        }; 
        if (operate == "cos" && this.currentOperand) {
            this.currentOperand = this.currentOperand * 0.0174533;
            this.currentOperand = this.roundIt(Math.cos(this.currentOperand));
        }; 
        if (operate == "tan" && this.currentOperand) {
            let testTan = Number(this.currentOperand);
            if (testTan >= 0) {
                if (testTan > 360){
                    let testDivide = Math.floor((testTan / 360));
                    console.log(testDivide);
                    testTan = this.currentOperand - (testDivide * 360);
                    console.log(this.currentOperand);
                }
                if (testTan !== 90 && testTan !== 270) {
                    this.currentOperand = testTan * 0.0174533;
                    this.currentOperand = this.roundIt(Math.tan(this.currentOperand));
                }  
            }
            if (testTan < 0) {
                if (testTan < -360){
                    let testDivide = Math.abs(Math.ceil((testTan / 360)));
                    console.log(testDivide);
                    testTan = this.currentOperand + (testDivide * 360);
                    console.log(testTan);
                }
                if (testTan !== -90 && testTan !== -270) {
                    this.currentOperand = testTan * 0.0174533;
                    this.currentOperand = this.roundIt(Math.tan(this.currentOperand));
                }
            } 
        }; 
        if (operate == "cot" && this.currentOperand) {
            let testCot = Number(this.currentOperand);
            if (testCot > 0) {
                if (testCot > 360){
                    let testDivide = Math.floor((testCot / 360));
                    console.log(testDivide);
                    testCot = this.currentOperand - (testDivide * 360);
                    console.log(this.currentOperand);
                }
                if (testCot !== 180) {
                    this.currentOperand = testCot * 0.0174533;
                    this.currentOperand = this.roundIt(1/Math.tan(this.currentOperand));
                }  
            }
            if (testCot < 0) {
                if (testCot < -360){
                    let testDivide = Math.abs(Math.ceil((testCot / 360)));
                    console.log(testDivide);
                    testCot = this.currentOperand + (testDivide * 360);
                    console.log(testCot);
                }
                if (testCot !== -180) {
                    this.currentOperand = testCot * 0.0174533;
                    this.currentOperand = this.roundIt(1/Math.tan(this.currentOperand));
                }
            }            
        }; 
        if (operate == "|x|" && this.currentOperand) {
            this.currentOperand = Math.abs(this.currentOperand);
        };
        if (operate == "%" && this.currentOperand) {
            this.currentOperand = this.currentOperand / 100;
        };
        if (operate == "RAND" && !this.currentOperand) {
            this.currentOperand = Math.random().toFixed(4);
        };
        if (operate == "log" && this.currentOperand) {
            this.currentOperand = Math.log(this.currentOperand) / Math.log(10);
            if (this.currentOperand % 1) {
                this.currentOperand = this.roundIt(this.currentOperand);
            }
        };
        if (operate == "π" && !this.currentOperand) {
            this.currentOperand = 3.1416;
        };
        if (operate == "e" && !this.currentOperand) {
            this.currentOperand = 2.7183;
        };
        if (operate == "n!" && this.currentOperand) {
            if (this.currentOperand >= 0) {
                let factorialCalc = 1;
                for (let i = this.currentOperand; i > 0; i--){
                    factorialCalc *= i;
                }
                if (factorialCalc % 1) {
                    factorialCalc = this.roundIt(factorialCalc);
                }
                this.currentOperand = factorialCalc;
            }
            else {
                this.currentOperand = NaN;
            }
            
        };
        if (operate == "√" && this.currentOperand) {
            this.currentOperand = Math.sqrt(this.currentOperand);
            if (this.currentOperand % 1) {
                this.currentOperand = this.roundIt(this.currentOperand);
            }
        };
        if (operate == "+/-" && this.currentOperand) {
            this.currentOperand = -1 * this.currentOperand;
        };
        if (operate == "x ²" && this.currentOperand) {
            this.currentOperand = Math.pow(this.currentOperand, 2);
            if (this.currentOperand % 1) {
                this.currentOperand = this.roundIt(this.currentOperand);
            }
        };
    }
    chooseOperation(operation) { 
        if (this.currentOperand === '') return;
        if (isNaN(this.currentOperand)) {
            this.words = [];
            this.currentOperand = 0;
        };
        if (this.previousOperand !== '') {
            this.compute();
        }
        if (operation == "x ⁿ") {
            this.operation = "<h6>^</h6>";
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        else if (operation == "Round to x") {
            this.operation = "<h6>RT</h6>";
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        else if (operation == "*") {
            this.operation = "<small>×</small>";
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        else if (operation == "/") {
            this.operation = "<small>÷</small>";
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        else {
            this.operation = `<small>${operation}</small>`;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        }  
    compute() {
        if (this.currentOperand == ".") {
            this.clear();
        }
        else {
            if (this.words[this.words.length-2] == "<small>+</small>" || this.words[this.words.length-2] == "<small>-</small>" || this.words[this.words.length-2] == "<small>×</small>" || this.words[this.words.length-2] == "<small>÷</small>" || this.words[this.words.length-2] == "<h6>^</h6>" || this.words[this.words.length-2] == "<h6>RT</h6>") {
                this.words.pop();
            }
            if (isNaN(this.prevy) || this.prevy == undefined){}
            else if (this.words[this.words.length-2] == "<small>=</small>" && this.words[this.words.length-2] !== this.prevy){
                this.words = [];
                this.words.push(`${this.prevy}`);
            }
            else if (this.words[this.words.length-2] !== "<small>=</small>") {
                this.words.push(`${this.prevy}`);
            }
            if (this.operation == undefined){}
            else {
                this.words.push(`${this.operation}`);
            }
            if (isNaN(this.curry) || this.curry == undefined){}
            else {
                this.words.push(`${this.curry}`);
            }
        }
        
    }
    getDisplay(...number) {
        const sNumber = number.toString();
        const iDigits = parseFloat(sNumber.split('.')[0]);
        const dDigits = sNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(iDigits)) {
            integerDisplay = '';
        } 
        else {
            integerDisplay = iDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (dDigits != null) {
            return `${integerDisplay}.${dDigits}`;
        }
        else {
            return integerDisplay;
        }
    }
    update(updates) {
        
        if (updates == "update") {
            this.compute();
            this.words.pop();
            if (this.currentOperand){
                this.words.push(this.currentOperand); 
            }
            let result = this.words;
            this.finalParagraph = this.words.toString().replace(/,/g, "");
            let numbers =[];
            if (result.includes("<h6>RT</h6>")){
                for (let i = 0; i <result.length -1; i++){
                    if (result[i] == "<h6>RT</h6>") {
                        let newN = parseFloat(result[i-1]).toFixed(parseFloat(result[i+1]));
                        numbers = parseFloat(result.splice(i-1, 3, newN));
                        i = 0;
                    }
                    else { }
                }
            }
            if (result.includes("<h6>^</h6>")){
                for (let i = 0; i <result.length -1; i++){
                    if (result[i] == "<h6>^</h6>") {
                        let newN = Math.pow(parseFloat(result[i-1]), parseFloat(result[i+1]));
                        if (newN % 1) {
                            newN = this.roundIt(newN);
                        }
                        numbers = parseFloat(result.splice(i-1, 3, newN));
                        i = 0;
                    }
                    else { }
                }
            }
            if (result.includes("<small>×</small>")){
                for (let i = 0; i <result.length -1; i++){
                    if (result[i] == "<small>×</small>") {
                        let newN = parseFloat(result[i-1]) * parseFloat(result[i+1]);
                        if (newN % 1) {
                            newN = this.roundIt(newN);
                        }
                        numbers = parseFloat(result.splice(i-1, 3, newN));
                        i = 0;
                    }
                    else { }
                }
            }
            if (result.includes("<small>÷</small>")){
                for (let i = 0; i <result.length -1; i++){
                    if (result[i] == "<small>÷</small>") {
                        let newN = parseFloat(result[i-1]) / parseFloat(result[i+1]);
                        if (newN % 1) {
                            newN = this.roundIt(newN);
                        }
                        numbers = parseFloat(result.splice(i-1, 3, newN));
                        i = 0;
                    }
                    else { }
                }
            }
            if (result.includes("<small>+</small>")){
                for (let i = 0; i <result.length -1; i++){
                    if (result[i] == "<small>+</small>") {
                        let newN = parseFloat(result[i-1]) + parseFloat(result[i+1]);
                        if (newN % 1) {
                            newN = this.roundIt(newN);
                        }
                        numbers = parseFloat(result.splice(i-1, 3, newN));
                        i = 0;
                    }
                    else { }
                }  
            }
            if (result.includes("<small>-</small>")){
                for (let i = 0; i <result.length -1; i++){
                    if (result[i] == "<small>-</small>") {
                        let newN = parseFloat(result[i-1]) - parseFloat(result[i+1]);
                        if (newN % 1) {
                            newN = this.roundIt(newN);
                        }
                        numbers = parseFloat(result.splice(i-1, 3, newN));
                        i = 0;
                    }
                    else { }
                }
            }
            if (!this.finalParagraph || !result){ }
            else {
                if (Number(result[0]) % 1) {
                    result[0] = this.roundIt(Number(result[0]));
                }
                this.previousOperandText.innerHTML = `${this.finalParagraph}<small>=</small>${this.getDisplay(result[0])}`;  
                this.currentOperandText.innerHTML = this.getDisplay(result); 
                this.words = [];
                this.currentOperand = parseFloat(result[0]);
                this.previousOperand = '';
                this.operation = undefined;
            }
        }
        else {
            this.prevy = parseFloat(this.previousOperand);
            this.curry = parseFloat(this.currentOperand);
            this.currentOperandText.innerHTML = this.currentOperand;
            if (this.operation !== undefined) {
                (this.words[0])? this.previousOperandText.innerHTML = this.words.toString().replace(/,/g, "") : this.previousOperandText.innerHTML = this.previousOperand + this.operation;
            }
        }
    }
}
const dataClear = document.querySelector("[data-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataOperation = document.querySelectorAll('[data-operation]');
const instanceOperation = document.querySelectorAll('[data-instance-operation]');
const dataNumber = document.querySelectorAll('[data-number]');
const dataEquals = document.querySelector("[data-equals]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandText, currentOperandText);
dataNumber.forEach(number => {
    number.addEventListener("click", (num)=>{
        num.preventDefault();
        calculator.appendNum(number.innerText);
        calculator.update();
    })
});
instanceOperation.forEach(button => {
    button.addEventListener("click", function(but){
        but.preventDefault();
        calculator.instanceOperation(this.innerText);
        calculator.update();
    })
});
dataOperation.forEach(button => {
    button.addEventListener("click", function(but){
        but.preventDefault();
        calculator.chooseOperation(this.innerText);
        calculator.update();
    })
});
dataClear.addEventListener("click", (cl)=>{
    cl.preventDefault();
        calculator.clear();
        calculator.update();
});
dataDelete.addEventListener("click", (del)=>{
    del.preventDefault();
    calculator.delete();
    calculator.update();
});

dataEquals.addEventListener("click", (eq)=>{
    eq.preventDefault();
    calculator.update("update");
});
window.addEventListener('keydown', (e)=>{
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
        e.preventDefault();
        calculator.appendNum(e.key);
        calculator.update();
    };
    if (e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*"){
        e.preventDefault();
        calculator.chooseOperation(e.key);
        calculator.update();
    };
    if (e.key == "Enter"){
        e.preventDefault();
        calculator.update("update");
    };
    if (e.key == "Delete"){
    e.preventDefault();
    calculator.delete();
    calculator.update();
    };
});