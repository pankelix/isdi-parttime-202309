TEST('TEST Curry reverse')

CASE('CASE reverse curry ["one", "two", "three"] mutating the original array')

var c = new Curry("one", "two", "three")

// [one, two, three]
// i = 0 [three, two, one]

expectedOutput('Curry {0: "three", 1: "two", 2: "one", length: 3 }')
console.log(c.reverse())