console.log('TEST Curry at')

console.log('CASE at positive integer (3)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(3)

console.log('Expected output: 130')
console.log(element)

//

console.log('CASE at positive integer equal or greater than length (5)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(5)

console.log('Expected output: undefined')
console.log(element)
//

//

console.log('CASE at (0)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(0)

console.log('Expected output: 5')
console.log(element)

//

console.log('CASE at negative integer (-3)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(-3)

console.log('Expected output: 8')
console.log(element)

//

console.log('CASE at negative integer greater than length (-6)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(-6)

console.log('Expected output: undefined')
console.log(element)

//

console.log('CASE at negative positive decimal (1.234)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(1.234)

console.log('Expected output: 12')
console.log(element)

//

console.log('CASE at negative negative decimal (-1.234)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(-1.234)

console.log('Expected output: 44')
console.log(element)

//

console.log('CASE at boolean (true)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(true)

console.log('Expected output: 12')
console.log(element)

//

console.log('CASE at string ("hello")')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at('hello')

console.log('Expected output: 5')
console.log(element)

//

console.log('CASE at (null)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(null)

console.log('Expected output: 5')
console.log(element)

//

console.log('CASE at (undefined)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(undefined)

console.log('Expected output: 5')
console.log(element)