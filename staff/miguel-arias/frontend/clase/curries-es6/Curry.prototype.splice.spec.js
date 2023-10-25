TEST('TEST Curry splice')

CASE('splice with start (2)')

var c = new Curry("a", "b", "c", "d", "e")

var deletedElements = c.splice(2)

expectedOutput('(deleted elements): Curry { 0: "c", 1: "d", 2: "e", length: 3')
console.log(deletedElements)

expectedOutput(' (original array): Curry { 0: "a", 1: "b", length: 2 }')
console.log(c)

console.log("__________________________________________________")
//

CASE('splice with start and deleteCount (2, 1)')

var c = new Curry("a", "b", "c", "d", "e")

var deletedElements = c.splice(2, 1)

expectedOutput('(deleted elements): Curry { 0: "c", length: 1 }')
console.log(deletedElements)

expectedOutput(' (original array): Curry { 0: "a", 1: "b", 2: "d", 3: "e" length: 4 }')
console.log(c)

console.log("__________________________________________________")
//

CASE('splice with start, deleteCount and item1 (2, 1, "cow")')

var c = new Curry("a", "b", "c", "d", "e")

var deletedElements = c.splice(2, 1, "cow")

expectedOutput('(deleted elements): Curry { 0: "c", length: 1 }')
console.log(deletedElements)

expectedOutput(' (original array): Curry { 0: "a", 1: "b", 2: "cow", 3: "d", 4: "e", length: 5 }')
console.log(c)

console.log("__________________________________________________")
//