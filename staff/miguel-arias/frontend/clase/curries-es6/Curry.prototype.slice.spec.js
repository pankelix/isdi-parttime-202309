TEST('TEST Curry slice')

CASE('slice with 1 positive integer provided (2)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(2)

expectedOutput('Curry { 0: "c", 1: "d", 2: "e", length: 3 }')
console.log(slicedCurry)

//

CASE('slice with 2 positive integers provided (2, 4)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(2, 4)

expectedOutput('Curry { 0: "c", 1: "d", length: 2 }')
console.log(slicedCurry)

//

CASE('slice with 1 positive decimal provided (2.234)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(2.234)

expectedOutput('Curry { 0: "c", 1: "d", 2: "e", length: 3 }')
console.log(slicedCurry)

//

CASE('slice with 2 positive decimals provided (2.234, 4.234)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(2.234, 4.234)

expectedOutput('Curry { 0: "c", 1: "d", length: 2 }')
console.log(slicedCurry)

//

CASE('slice with 1 negative integer provided (-2)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(-2)

expectedOutput('Curry { 0: "d", 1: "e", length: 2 }')
console.log(slicedCurry)

//

CASE('slice with 2 negative integers provided (-2, -1)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(-2, -1)

expectedOutput('Curry { 0: "d", length: 1 }')
console.log(slicedCurry)

//

CASE('slice with 1 negative decimal provided (-2.234)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(-2.234)

expectedOutput('Curry { 0: "d", 1: "e", length: 2 }')
console.log(slicedCurry)

//

CASE('slice with 2 negative decimals provided (-2.234, -1.234)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(-2.234, -1.234)

expectedOutput('Curry { 0: "d", length: 1 }')
console.log(slicedCurry)

//

CASE('slice with more than 2 arguments provided (1, 2, 3)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(1, 2, 3)

expectedOutput('Curry { 0: "b", length: 1 }')
console.log(slicedCurry)

//

CASE('slice with string provided ("hola")')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice('hola')

expectedOutput('Curry { 0: "a", 1: "b", 2: "c", 3: "d", 4; "e", length: 5 }')
console.log(slicedCurry)

//

CASE('slice with (null) provided')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(null)

expectedOutput('Curry { 0: "a", 1: "b", 2: "c", 3: "d", 4; "e", length: 5 }')
console.log(slicedCurry)

//

CASE('slice with (undefined) provided')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(undefined)

expectedOutput('Curry { 0: "a", 1: "b", 2: "c", 3: "d", 4; "e", length: 5 }')
console.log(slicedCurry)

//

CASE('slice with boolean provided (false)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(false)

expectedOutput('Curry { 0: "a", 1: "b", 2: "c", 3: "d", 4; "e", length: 5 }')
console.log(slicedCurry)

//

CASE('slice with boolean provided (true)')

var c = new Curry("a", "b", "c", "d", "e") 

var slicedCurry = c.slice(true)

expectedOutput('Curry { 0: "b", 1: "c", 2: "d", 3: "e", length: 4 }')
console.log(slicedCurry)