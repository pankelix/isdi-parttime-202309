console.log('TEST Curry constructor')

console.log('CASE construct curry with 3 arguments 10, 20 and 30')

var c = new Curry(10, 20, 30)

console.log(c)
// Curry { 0: 10, 1: 20, 2: 30, length: 3 }

console.log('CASE construct curry with 1 argument that is a positive integer')

var c = new Curry(100)

console.log(c)
// Curry { length: 100 }

console.log('CASE construct curry with 1 argument that is a boolean')

var c = new Curry(true)

console.log(c)
// Curry { 0: true, length: 1 }

console.log('CASE construct curry with 1 argument that is a string')

var c = new Curry('hello')

console.log(c)
// Curry { 0: 'hello', length: 1 }

console.log('CASE construct curry fails with 1 argument that is a negative integer')

try {
    new Curry(-1)
} catch (error) {
    console.log(error)
    // RangeError: Invalid curry length
}

console.log('CASE construct curry fails with 1 argument that is a positive decimal number')

try {
    new Curry(1.234)
} catch (error) {
    console.log(error)
    // RangeError: Invalid curry length
}