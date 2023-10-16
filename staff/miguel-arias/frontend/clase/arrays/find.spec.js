console.log('TEST find')
console.log('CASE for the array [1, 4, 9, 16] find the first element greater than 5 should result in "9"')

var arrayToSearchIn = [1, 4, 9, 16]

function isGreaterThan5(element) {
    return element > 5
}

var foundValue = find(arrayToSearchIn, isGreaterThan5)

console.log(foundValue)
//9