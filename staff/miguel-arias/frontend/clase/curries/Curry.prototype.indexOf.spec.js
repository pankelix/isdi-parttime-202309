console.log('TEST Curry indexOf')

console.log('CASE indexOf string in array')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf('bison')

console.log('Expected output: 1')
console.log(firstIndex)

//

console.log('CASE indexOf string not in array')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf('snake')

console.log('Expected output: -1')
console.log(firstIndex)

//

console.log('CASE indexOf number (3)')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf(3)

console.log('Expected output: -1')
console.log(firstIndex)

//

console.log('CASE indexOf (null)')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf(null)

console.log('Expected output: -1')
console.log(firstIndex)

//

console.log('CASE indexOf empty ()')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf()

console.log('Expected output: -1')
console.log(firstIndex)

//

console.log('CASE indexOf boolean (true)')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf(true)

console.log('Expected output: -1')
console.log(firstIndex)