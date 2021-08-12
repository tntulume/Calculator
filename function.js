// NON ARGUMENT FUNCTION

function addTwoAndThree(){
    var sum = 2 + 3;
    console.log(sum);
    return sum;
}
addTwoAndThree()

function addSixAndNine(){
    var sum =  6 + 9;
    return sum;
}

var total = addSixAndNine()
console.log(total);


// ARGUMENT FUNCTION

function multiply(num1, num2){
    var result = num1 * num2;
    return result;
}

var answer = multiply(5, 8);
console.log(answer);

// INLINE FUNCTION

var value1 = 40;
var value2 = 50;

(function(value1, value2){
    var result = value1 * value2;
    console.log(result);
})
(value1, value2);

// ARROW WITHOUT ARGUMENTS

let add1 = () => 6 + 7;

var result1  = add1();

console.log(result1);
console.log(add1());

let school = () => 'Entebbe' + ' ' + 'Secondary' + ' ' + 'School';
var schoolName = school();
console.log(schoolName);
console.log(school());


// ARROW WITH ARGUMENTS

let add2 = (a, b, c) => a + b + c;

var result  = add2(5, 6, 9);
console.log(result);

let x = (firstName, lastName) => firstName + ' ' + lastName + ' ' + 2;

const men = {
    height: 2.5,
    colour: 'black',
    size: 'thin'
}
var last = men.colour;
var first = 'Ntulume';
var y = x(first, last);


console.log(y);
console.log(x(2,6));
console.log(x(6,6));
console.log(x('Entebbe',6))




// TERNARY OPPERATOR
var number = 0;

var answer = (number == 0) ? 'The number is Zero' : 'The number is not zero';
console.log(answer)
console.log(answer)

// if(number == 0){
//     console.log('The number is Zero')
// }else{
//     console.log('The number is not zero')
// }
var name1;
name1 = 'Tom';
console.log(name1);

function Addition(a, b, c){
    var p = a + b + c;
    return p;  
}
console.log(Addition(5, 4, 8));



function Addition1(){
    var sum = 1 + 2 + 3;
    console.log(sum);
}


function performOperation1(firstNumber, secondNumber){
    
         let answer = firstNumber + secondNumber;

         return answer;
    }
console.log(performOperation1(6, 1));    
