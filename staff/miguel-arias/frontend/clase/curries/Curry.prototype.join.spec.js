console.log('TEST Curry join')

console.log('CASE array joined by ("*")')

var c = new Curry(10, 20, 30)

var joinedString = c.join('*')

console.log('Expected output: "10*20*30"')
console.log(joinedString)

//

console.log('CASE array joined by (undefined)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(undefined)

console.log('Expected output: "10,20,30"')
console.log(joinedString)

//

console.log('CASE array joined by empty ()')

var c = new Curry(10, 20, 30)

var joinedString = c.join()

console.log('Expected output: "10,20,30"')
console.log(joinedString)

//

console.log('CASE array joined by number (3)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(3)

console.log('Expected output: "10320330"')
console.log(joinedString)

//

console.log('CASE array joined by string ("and")')

var c = new Curry(10, 20, 30)

var joinedString = c.join('and')

console.log('Expected output: "10and20and30"')
console.log(joinedString)

//

console.log('CASE array joined by boolean (true)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(true)

console.log('Expected output: "10true20true30"')
console.log(joinedString)

//

console.log('CASE array joined by (null)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(null)

console.log('Expected output: "10null20null30"')
console.log(joinedString)