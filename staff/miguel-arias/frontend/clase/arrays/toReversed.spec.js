console.log('TEST Array toReversed')

console.log('CASE reverse an array ["one", "two", "three"]')

var a = ["one", "two", "three"]

var toReversedArray = toReversed(a)

// [one, two, three]
// i = 3 -1 -2 [three]
// i = 2 -1 -1 [three, two]
// i = 1 -1 -0 [three, two, one]

console.log('Expected output: ["three", "two", "one"]')
console.log(toReversedArray)
console.log('Expected output: ["one", "two", "three"]')
console.log(a)