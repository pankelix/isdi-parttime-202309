TEST('Curry push')

CASE('CASE push 1 element')

var c = new Curry(10, 20, 30)

var length = c.push(40)

expectedOutput('4')
console.log(length)

expectedOutput('Curry { 0: 10, 1: 20, 2: 30, 3: 40, length: 4 }')
console.log(c)

CASE('CASE push 3 elements')

var c = new Curry(10, 20, 30)

var length = c.push(40, 50, 60)

expectedOutput('6')
console.log(length)

expectedOutput('Curry { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, length: 6 }')
console.log(c)

CASE('CASE push no elements')

var c = new Curry(10, 20, 30)

var length = c.push()

expectedOutput('3')
console.log(length)

expectedOutput('Curry { 0: 10, 1: 20, 2: 30, length: 3 }')
console.log(c)