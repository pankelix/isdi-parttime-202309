TEST('TEST Curry join')

CASE('array joined by ("*")')

var c = new Curry(10, 20, 30)

var joinedString = c.join('*')

expectedOutput('"10*20*30"')
console.log(joinedString)

//

CASE('array joined by (undefined)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(undefined)

expectedOutput('"10,20,30"')
console.log(joinedString)

//

CASE('array joined by empty ()')

var c = new Curry(10, 20, 30)

var joinedString = c.join()

expectedOutput('"10,20,30"')
console.log(joinedString)

//

CASE('array joined by number (3)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(3)

expectedOutput('"10320330"')
console.log(joinedString)

//

CASE('array joined by string ("and")')

var c = new Curry(10, 20, 30)

var joinedString = c.join('and')

expectedOutput('"10and20and30"')
console.log(joinedString)

//

CASE('array joined by boolean (true)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(true)

expectedOutput('"10true20true30"')
console.log(joinedString)

//

CASE('array joined by (null)')

var c = new Curry(10, 20, 30)

var joinedString = c.join(null)

expectedOutput('"10null20null30"')
console.log(joinedString)