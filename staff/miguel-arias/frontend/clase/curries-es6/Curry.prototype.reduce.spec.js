TEST('TEST Curry reduce')

CASE('reduce to sum an array of numbers')

const c1 = new Curry(1, 2, 3, 4, 5, 6)

const sum1 = (acc, item) => acc += item

/* const sum = function (acc, item) {
    return acc + item
} */

const initialValue1 = 0

const reduceOutput1 = c1.reduce(sum1, initialValue1)

expectedOutput('21')
console.log(`Output: ${reduceOutput1}`)

//

TEST('TEST Curry reduce')

CASE('reduce to sum an array of words')

const c2 = new Curry("Hello", "World", "I'm", "Miguel")

const sum2 = (acc, item) => acc += item

const reduceOutput2 = c2.reduce(sum2)

expectedOutput("HelloWorldI'mMiguel")
console.log(`Output: ${reduceOutput2}`)