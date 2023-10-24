TEST('TEST Curry forEach')

CASE('CASE for each element in [10, 20, 30] print it in the console')

var c = new Curry(10, 20, 30)

function printInConsole(element) {
    console.log(element)
}

expectedOutput('3 console logs (10, 20, 30)')
var result = c.forEach(printInConsole)

expectedOutput('Curry { 0: 10; 1: 20, 2: 30, length: 3 }')
console.log(c)

// preguntar a Manu

/* console.log('CASE for each element in [10, 20, empty, 40] print it in the console ignoring empty elements')

var c = new Curry(10, 20, empty, 40) // empty debe estar comentado

function printInConsole(element) {
    console.log(element)
}

console.log('Expected output: 3 console logs (10, 20, 40)')
var result = c.forEach(printInConsole)
console.log(result)


console.log('Expected output: { 0: 10; 1: 20, 2: 40, length: 3 }')
console.log(c) */