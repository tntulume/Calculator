
const calculatorDisplay = document.getElementById('input');
const output = document.getElementById('output');

const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const undoBtn = document.getElementById('undo');
const calswitchBtn = document.getElementById('calswitch');
const displayView = document.getElementById('display');
const historyBtn = document.getElementById('historyBtn');





// DECLARE LIST OF OPERATORS
let listOperators = ['-', '+', '×', '÷'];
let firstValue = 0;
let secondValue = 0;
let op = '';
let removedCharacters =[];
let is_cal_on = false;
let nextOperation = false;


let history = [];

function AddHistory(equation){
    history.push(equation);
    console.log(history);

}

historyBtn.addEventListener('click', () => clearHistory());

function clearHistory(){
    history = [];
    // historyView.textContent = '';
}

function showHistory(){
    let allHistory = '';
    // historyView.textContent = '';
    history.forEach((historyValue) => {
        allHistory += "<span>" + historyValue + "<button class = \"remove\" value = " + history.indexOf(historyValue) + " onclick = \"removeThis(this.value)\" >delete</button> </span>";
    })
    // historyView.innerHTML = allHistory;
}

function removeThis(indexOfHistory){

    const SEPARATORVIEW = document.getElementById('separator');
    const HISTORY = document.getElementById("history");
    
    history.splice(indexOfHistory, 1);
    console.log(indexOfHistory)
    if(history.length > 0){
        if(indexOfHistory > 0){
            
            let previousIndex = indexOfHistory - 1;
            postion = previousIndex + 1;
            SEPARATORVIEW.textContent = postion +'/'+ history.length
            HISTORY.innerHTML = history[previousIndex] + ' <button class = "remove" onclick = "removeThis(this.value)" value =' +  previousIndex + '><i class="las la-times"></i></button>';
        }
        else{
            if(history.length == 0){
                SEPARATORVIEW.textContent = '0/'+ history.length
                HISTORY.innerHTML = 'Empty <button class = "remove" onclick = "removeThis(this.value)" value =' +  0 + '><i class="las la-times"></i></button>';
            }
            else{
                SEPARATORVIEW.textContent = '1/'+ history.length
                HISTORY.innerHTML = history[0] + ' <button class = "remove" onclick = "removeThis(this.value)" value =' +  0 + '><i class="las la-times"></i></button>';

            }
        }
    }else{
        SEPARATORVIEW.textContent = '0/'+ history.length
        HISTORY.innerHTML = 'Empty <button class = "remove" onclick = "removeThis(this.value)" value =' +  0 + '><i class="las la-times"></i></button>';
    }
    // showHistory()

}

calswitchBtn.addEventListener('click', () => switchCal());

function switchCal(){
    if(is_cal_on){
        console.log('switching cal off')
        is_cal_on = false
        output.textContent = '';
        calculatorDisplay.textContent = '';
        calswitchBtn.textContent = 'ON'
        displayView.innerHTML = '';
        // historyView.textContent= '';
    }
    else{
        // console.log('switching cal on')
        is_cal_on = true
        output.textContent = '0';
        calculatorDisplay.textContent = '0';
        calswitchBtn.textContent = 'OFF'
        // showHistory();
        let history_content = `
                                <span id = "history">Empty </span>
                                <div class="navigate">
                                    <button id = "next" class="freeze"><i class="las la-angle-double-left"></i></button>
                                    <span id = 'separator'>0/0</span>
                                    <button id = "prev" class="freeze"><i class="las la-angle-double-right"></i></button>
                                </div>
                                `
        displayView.innerHTML = history_content;
        let currentIndex = 0;

        const NEXTBTN = document.getElementById("next");
        
        const PREVBTN = document.getElementById("prev");
        const SEPARATORVIEW = document.getElementById('separator');
        const HISTORY = document.getElementById("history");
        
        
        NEXTBTN.addEventListener('click', () => showNextValue());
        PREVBTN.addEventListener('click', () => showPrevValue());
        let postion = 0;
        let historyTotal = history.length;
    }
   
}

// list all buttons
// console.log(inputBtns);

// to show the clicked number on the calculator screen
function sendNumberValue(number){
    if(is_cal_on){
        if(nextOperation){
            calculatorDisplay.textContent = '';
            if(listOperators.includes(number)){
                calculatorDisplay.textContent = output.textContent + number;
            }
            else{
                calculatorDisplay.textContent += number;
            }

            nextOperation = false;
        }
        else{
            //calculatorDisplay.textContent = number 
            // replaces what is already being displayed
            // console.log(number);
            const displayValue = calculatorDisplay.textContent;

            //if current value is '0' replace, else just add multiple number together to forma multi-digit eg 135
            calculatorDisplay.textContent = (displayValue === '0') ? number: displayValue + number;
        } 
    }
}
function splitValues(){
    let equation = calculatorDisplay.textContent;
    // create new array
    var equationBreakdown = new Array();
    //LOOP THROUGHT THE LIST OF OPERATORS
    listOperators.forEach((operator) => {
        //check if the operator exists in the equation string
        if(equation.includes(operator)){
            equationBreakdown = equation.split(operator);
            equationBreakdown.push(operator);
        }

    });

   
    return equationBreakdown;
}

function handleSplitValues(splitValue){
    if(is_cal_on){
        
        if(splitValue.length == 3 & splitValue[1] != ""){
            //ASSIGN SPLIT VALUES
            firstValue = splitValue[0];
            secondValue = splitValue[1];
            op = splitValue[2];

            // console.log(splitValue);
            // console.log('First Value ', firstValue);
            // console.log('Second Value ', secondValue);
            // console.log('Operator ', op);
            
            performOperation(firstValue, secondValue, op)
        }
        else{
            alert('Equation is not complete');
        }
    }
}


function performOperation(firstNumber, secondNumber, operator){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    let answer;
    switch (operator){
        case operator = '+':
            answer = firstNumber + secondNumber;
            break;
        case operator = '-':
        answer = firstNumber - secondNumber;
        break;
        case operator = '×':
            answer = firstNumber * secondNumber;
            break;
        case operator = '÷':
            answer = firstNumber / secondNumber;
            break;
    }

    let completeEquation = calculatorDisplay.textContent + '=' + answer;
    output.textContent = answer;
    nextOperation = true;
    AddHistory(completeEquation)

    const SEPARATORVIEW = document.getElementById('separator');
    const HISTORY = document.getElementById("history");

    let lastIndex = history.length - 1;
    let position = lastIndex + 1;
    SEPARATORVIEW.textContent = position + "/" + history.length;
    HISTORY.innerHTML = history[lastIndex] + '<button class = "remove" onclick = "removeThis(this.value)" value =' +  lastIndex + '><i class="las la-times"></i></button>';

}
    inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains('equal')){
        inputBtn.addEventListener('click', () => handleSplitValues(splitValues()));
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});
// function addDecimal(){
//     //if no decimal, add one. If there's one already. dont add.
//     if (!calculatorDisplay.textContent.includes('.')) {
//         calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
//     }else{
//         alert('Math number can not have more than one point')
//     }
// }
function checkDecimal(){
    let currentEquation = calculatorDisplay.textContent;

    var currentEquationBreakdown = new Array();
    // LOOP THROUGH THE LIST OF OPERATORS

    listOperators.forEach((operator) => {
        if(currentEquation.includes(operator)){
            currentEquationBreakdown = currentEquation.split(operator);
        }
    });

    return currentEquationBreakdown;
}

function addDecimal(){
    if(is_cal_on){
        let splitEquation = checkDecimal();
        // console.log(splitEquation);
        if (!calculatorDisplay.textContent.includes('.')) {
            calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
        }
        else if(splitEquation.length > 1 ){
            if(!splitEquation[1].includes('.')){
                calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
            }
        }
    }
}
// reset calculator display function
function resetAll(){
    if(is_cal_on){
        calculatorDisplay.textContent ='0';
        output.textContent = '0';
    }
}
// reset calculator display arrow function  
//let reset = () => calculatorDisplay.textContent ='0';



// call clear function using clear button event listener
clearBtn.addEventListener('click', () => resetAll()); 

function deleteLastInput(){
    if(is_cal_on){
        let currentEquation = calculatorDisplay.textContent;
        //SPLIT EACH CHARACTER AS A SEPARATE ARRAY ELEMENT
        let currentEquationCharacters = currentEquation.split('');
        if(currentEquationCharacters.length > 0){
            let removedCharacter = currentEquationCharacters.pop();
            removedCharacters.push(removedCharacter);
        }
        // console.log ('current array of equation characters': 'currentEquationCharacters')
        //console.log (removed caracters: 'removedCharacters')
        var newEquation = '';
        currentEquationCharacters.forEach((currentEquationCharacter) => {
            newEquation += currentEquationCharacter;
        });

        calculatorDisplay.textContent = newEquation;
    }
}

deleteBtn.addEventListener('click', () => deleteLastInput());

undoBtn.addEventListener('click', () => undo());

function undo(){
    if(is_cal_on){
        if(removedCharacters.length > 0){
            let lastRemovedCharacterPosition = (removedCharacters.length - 1);
            let lastremovedCharacter = removedCharacters[lastRemovedCharacterPosition];    
            calculatorDisplay.textContent = `${calculatorDisplay.textContent}` + lastremovedCharacter;
            removedCharacters.pop();
        } else {
            alert('All values restored')
        }  
    }
}

// ---------------------------------------------------------------------------------------------
let currentIndex = 0;

function showNextValue(){

    const SEPARATORVIEW = document.getElementById('separator');
    const HISTORY = document.getElementById("history");

    historyTotal = history.length;
    if(historyTotal != 0){
        let lastIndex = historyTotal - 1;
        postion = currentIndex + 1

        console.log(currentIndex)

        if(currentIndex <= lastIndex){
            SEPARATORVIEW.textContent = postion +'/'+ historyTotal
            HISTORY.innerHTML = history[currentIndex] + ' <button class = "remove" onclick = "removeThis(this.value)" value =' +  currentIndex + '><i class="las la-times"></i></button>';
            currentIndex++;
        }else{
            SEPARATORVIEW.textContent = '1/'+ historyTotal
            currentIndex = 0
            HISTORY.innerHTML = history[currentIndex] + ' <button class = "remove" onclick = "removeThis(this.value)" value =' +  currentIndex + '><i class="las la-times"></i></button>';
            alert('This is the last history value')
        }
    }
    // console.log(HISTORY);
}

function showPrevValue(){

    const SEPARATORVIEW = document.getElementById('separator');
    const HISTORY = document.getElementById("history");

    historyTotal = history.length;
    if(history.length > 0){
        let shownHistory = document.getElementById('history');
        // console.log(shownHistory.textContent);
        let shownHistoryContent = shownHistory.textContent;
        let historyValue = shownHistoryContent.split(' ')
        // console.log(historyValue);
        let actualValue = historyValue[0];
        // console.log(actualValue)
        let presentIndex = history.indexOf(actualValue);
        // console.log(presentIndex);
        
        if(presentIndex >= 1){
            
            // console.log(presentIndex);
            // if(presentIndex != 0 ){
                let previousIndex = presentIndex - 1;
                postion = previousIndex + 1;
                SEPARATORVIEW.textContent = postion +'/'+ historyTotal
                HISTORY.innerHTML = history[previousIndex] + ' <button class = "remove" onclick = "removeThis(this.value)" value =' +  previousIndex + '><i class="las la-times"></i></button>';
                // console.log(history[previousIndex]);
                // console.log(previousIndex);
            }
            // else{
            // //     alert('This is the first history value');
            // }
            
        else{
            let previousIndex = history.length - 1;
            postion = previousIndex + 1;
            HISTORY.innerHTML = history[previousIndex] + ' <button class = "remove" onclick = "removeThis(this.value)" value =' +  previousIndex + '><i class="las la-times"></i></button>';
            SEPARATORVIEW.textContent = postion +'/'+ historyTotal
        }
    }
}

