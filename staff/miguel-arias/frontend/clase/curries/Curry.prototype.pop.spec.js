console.log('TEST Curry pop')

console.log('CASE pop removing last element of an array')

var c = new Curry(10, 20, 30, 40, 50)

var deletedElement = c.pop()

console.log('Expected output: 50')
console.log(deletedElement)

console.log('Expected output: { 0: 10, 1: 20, 2: 30, 3: 40, length: 4')
console.log(c)

//

console.log('CASE pop removing on an empty array')

var c = new Curry()

var deletedElement = c.pop()

console.log('Expected output: undefined')
console.log(deletedElement)

console.log('Expected output: { length: 0 }')
console.log(c)

//

console.log('CASE pop removing last element of an array with string argument ("hola")')

var c = new Curry(10, 20, 30, 40, 50)

var deletedElement = c.pop()

console.log('Expected output: 50')
console.log(deletedElement)

console.log('Expected output: { 0: 10, 1: 20, 2: 30, 3: 40, length: 4')
console.log(c)

//

console.log('CASE pop removing last element of an array with number argument (3)')

var c = new Curry(10, 20, 30, 40, 50)

var deletedElement = c.pop()

console.log('Expected output: 50')
console.log(deletedElement)

console.log('Expected output: { 0: 10, 1: 20, 2: 30, 3: 40, length: 4')
console.log(c)

//

console.log('CASE pop removing last element of an array with (null) argument')

var c = new Curry(10, 20, 30, 40, 50)

var deletedElement = c.pop()

console.log('Expected output: 50')
console.log(deletedElement)

console.log('Expected output: { 0: 10, 1: 20, 2: 30, 3: 40, length: 4')
console.log(c)

//

console.log('CASE pop removing last element of an array with (undefined) argument')

var c = new Curry(10, 20, 30, 40, 50)

var deletedElement = c.pop()

console.log('Expected output: 50')
console.log(deletedElement)

console.log('Expected output: { 0: 10, 1: 20, 2: 30, 3: 40, length: 4')
console.log(c)

//

console.log('CASE pop removing last element of an array with boolean argument (true)')

var c = new Curry(10, 20, 30, 40, 50)

var deletedElement = c.pop()

console.log('Expected output: 50')
console.log(deletedElement)

console.log('Expected output: { 0: 10, 1: 20, 2: 30, 3: 40, length: 4')
console.log(c)