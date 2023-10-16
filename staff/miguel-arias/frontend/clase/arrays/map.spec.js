console.log('TEST map')
console.log('CASE map array [1, 4, 9, 16] to new array with same elements but multiplied by two. Expected output [2, 8, 18, 32]')

var arrayToMap = [1, 4, 9, 16]

function multiplyByTwo (x) {
    return x*2
}

var mappedArray = map(arrayToMap, multiplyByTwo)

console.log(mappedArray)
// [2, 8, 18, 32]