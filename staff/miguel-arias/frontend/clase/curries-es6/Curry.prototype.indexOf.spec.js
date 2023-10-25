TEST('TEST Curry indexOf')

CASE('indexOf string in array')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf('camel')

expectedOutput('2')
console.log(firstIndex)

//

CASE('indexOf string not in array')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf('snake')

expectedOutput('-1')
console.log(firstIndex)

//

CASE('indexOf number (3)')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf(3)

expectedOutput('-1')
console.log(firstIndex)

//

CASE('indexOf (null)')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf(null)

expectedOutput('-1')
console.log(firstIndex)

//

CASE('indexOf empty ()')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf()

expectedOutput('-1')
console.log(firstIndex)

//

CASE('indexOf boolean (true)')

var c = new Curry('ant', 'bison', 'camel', 'duck', 'bison')

var firstIndex = c.indexOf(true)

expectedOutput('-1')
console.log(firstIndex)