TEST('Curry at')

CASE('at positive integer (3)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(3)

expectedOutput('130')
console.log(element)

//

CASE('at positive integer equal or greater than length (5)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(5)

expectedOutput('undefined')
console.log(element)
//

//

CASE('at (0)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(0)

expectedOutput('5')
console.log(element)

//

CASE('at negative integer (-3)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(-3)

expectedOutput('8')
console.log(element)

//

CASE('at negative integer greater than length (-6)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(-6)

expectedOutput('undefined')
console.log(element)

//

CASE('at negative positive decimal (1.234)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(1.234)

expectedOutput('12')
console.log(element)

//

CASE('at negative negative decimal (-1.234)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(-1.234)

expectedOutput('44')
console.log(element)

//

CASE('at boolean (true)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(true)

expectedOutput('12')
console.log(element)

//

CASE('at string ("hello")')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at('hello')

expectedOutput('5')
console.log(element)

//

CASE('at (null)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(null)

expectedOutput('5')
console.log(element)

//

CASE('at (undefined)')

var c = new Curry(5, 12, 8, 130, 44)

var element = c.at(undefined)

expectedOutput('5')
console.log(element)