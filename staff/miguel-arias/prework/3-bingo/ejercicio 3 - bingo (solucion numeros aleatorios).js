/*
let numbers = []

const generateNumbers = (a) => {

    let newNumber = Math.floor(Math.random() * 101);
    if (!a.some(function (e) { return e == newNumber })) {
        
         //Si no se encuentra el valor aleatorio en el arreglo
         //se pushea el valor.
         
        a.push(newNumber);
    }
}

 //Bucle para llenar el arreglo con la cantidad que necesites

while (numbers.length < 15 && 15 < 101) {
    generateNumbers(numbers);
}
 



let numbers = []

const generateNumbers = (numbers) => {
    let newNumber = Math.floor(Math.random() * 101);
    if (!numbers.some(function (e) { return e == newNumber })) {
        numbers.push(newNumber);
    }
}

while (numbers.length < 15) {
    generateNumbers(numbers);
}
*/


let numbers = []

const generateNumbers = (numbers) => {
    let newNumber = Math.floor(Math.random() * 101);
    if (!numbers.some( e => e == newNumber)) {
        numbers.push(newNumber)
    }
}

while (numbers.length < 15) {
    generateNumbers(numbers);
}

alert(numbers)