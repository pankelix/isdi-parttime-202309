console.log('TEST Curry toReversed')

console.log('CASE reverse curry ["one", "two", "three"] not mutating the original array')

var c = new Curry("one", "two", "three")

var toReversedCurry = c.toReversed()

// [one, two, three]
// i = 3 -1 -2 [three]
// i = 2 -1 -1 [three, two]
// i = 1 -1 -0 [three, two, one]

console.log('Expected output: Curry {0: "three", 1: "two", 2: "one", length: 3 }')
console.log(toReversedCurry)
console.log('Expected output: Curry {0: "one", 1: "two", 2: "three", length: 3 }')
console.log(c)