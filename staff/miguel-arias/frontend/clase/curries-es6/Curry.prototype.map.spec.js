TEST('TEST Curry map')

CASE('map array elements multiplied by 2')

var c = new Curry(1, 2, 3, 4, 5)

var multiplyBy2 = function (element) {
    return element*2
}

var mappedArray= c.map(multiplyBy2)

expectedOutput('{ 0: 2, 1: 4, 2: 6, 3: 8, 4: 10, length: 5')
console.log(mappedArray)

//

console.log('TEST Curry map ERRORS')

CASE('map no arguments given')

var c = new Curry(1, 2, 3, 4, 5)

expectedOutput('TypeError: undefined is not a function')
try {
    var mappedArray = c.map()
} catch (error) {
    console.log(error)
}

//

CASE('map argument is a string')

var c = new Curry(1, 2, 3, 4, 5)

expectedOutput('TypeError: string "hello" is not a function')

try {
    var mappedArray = c.map('hello')
} catch (error) {
    console.log(error)
}

//

CASE('map argument is a number')

var c = new Curry(1, 2, 3, 4, 5)

expectedOutput('TypeError: number 2 is not a function')

try {
    var mappedArray = c.map(2)
} catch (error) {
    console.log(error)
}

//

CASE('map argument is null')

var c = new Curry(1, 2, 3, 4, 5)

expectedOutput('TypeError: object null is not a function')

try {
    var mappedArray = c.map(null)
} catch (error) {
    console.log(error)
}

//

CASE('map argument is undefined')

var c = new Curry(1, 2, 3, 4, 5)

expectedOutput('TypeError: undefined is not a function')

try {
    var mappedArray = c.map(undefined)
} catch (error) {
    console.log(error)
}

//

CASE('map argument is boolean')

var c = new Curry(1, 2, 3, 4, 5)

expectedOutput('TypeError: boolean true is not a function')

try {
    var mappedArray = c.map(true)
} catch (error) {
    console.log(error)
}