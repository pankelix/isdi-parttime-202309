console.log('TEST filter')

console.log('CASE for the array ["spray", "limit", "elite", "exuberant", "destruction", "present"] and test (word.length > 6) filter should result in ["exuberant", "destruction", "present"]')

var arrayToFilter = ["spray", "limit", "elite", "exuberant", "destruction", "present"]

function wordLengthIsGreaterThan6(element) {
    return element.length > 6
}

var filteredArray = filter(arrayToFilter, wordLengthIsGreaterThan6)


console.log(filteredArray)