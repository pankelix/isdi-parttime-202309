console.log('TEST Curry concat')

console.log('CASE concat 1 array')

var curry1 = new Curry(1, 2, 3, 4, 5)

var curry2 = new Curry(6, 7, 8, 9, 10)

var newCurry = curry1.concat(curry1, curry2)

console.log('Expected output: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, length: 10 }')
console.log(newCurry)

//

console.log('CASE concat N arrays')

var curry1 = new Curry(1, 2, 3, 4)

var curry2 = new Curry(5, 6, 7, 8)

var curry3 = new Curry(9, 10, 11, 12)

var curry4 = new Curry(13, 14, 15, 16)

var newCurry = curry1.concat(curry2, curry3, curry4)

console.log('Expected output: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 15: 16, length: 16 }')
console.log(newCurry)

//

console.log('CASE concat nested arrays')

console.log('CASE concat on non-array objects')