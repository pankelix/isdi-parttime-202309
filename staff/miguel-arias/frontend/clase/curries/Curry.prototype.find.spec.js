console.log('TEST Curry find')

console.log('CASE find ')

var c = new Curry(5, 12, 8, 130, 44)

var greaterThan10 = function (element) {
    return element > 10
}

var firstFoundElement = c.find(greaterThan10)

console.log('Expected output: 12')
console.log(firstFoundElement)

//

console.log('TEST Curry find ERRORS')

console.log('CASE find no arguments given')

var c = new Curry(1, 2, 3, 4, 5)

console.log('Expected output: TypeError: undefined is not a function')
try {
    var firstFoundElement = c.find()
} catch (error) {
    console.log(error)
}

//

console.log('CASE find argument is a string')

var c = new Curry(1, 2, 3, 4, 5)

console.log('Expected output: TypeError: string "hello" is not a function')

try {
    var firstFoundElement = c.find('hello')
} catch (error) {
    console.log(error)
}

//

console.log('CASE find argument is a number')

var c = new Curry(1, 2, 3, 4, 5)

console.log('Expected output: TypeError: number 2 is not a function')

try {
    var firstFoundElement = c.find(2)
} catch (error) {
    console.log(error)
}

//

console.log('CASE find argument is null')

var c = new Curry(1, 2, 3, 4, 5)

console.log('Expected output: TypeError: object null is not a function')

try {
    var firstFoundElement = c.find(null)
} catch (error) {
    console.log(error)
}

//

console.log('CASE find argument is undefined')

var c = new Curry(1, 2, 3, 4, 5)

console.log('Expected output: TypeError: undefined is not a function')

try {
    var firstFoundElement = c.find(undefined)
} catch (error) {
    console.log(error)
}

//

console.log('CASE find argument is boolean')

var c = new Curry(1, 2, 3, 4, 5)

console.log('Expected output: TypeError: boolean true is not a function')

try {
    var firstFoundElement = c.find(true)
} catch (error) {
    console.log(error)
}