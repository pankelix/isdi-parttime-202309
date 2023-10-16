console.log('TEST forEach')

console.log('CASE for each element in [10, 20, 30] print it in the console')

var array = [10, 20, 30]

function printInConsole(element) {
    console.log(element)
}

forEach(array, printInConsole)

console.log('CASE for each element in [10, 20, 30] print it multiplied by 10 in the console')

var array = [10, 20, 30]

function multiplyBy10(element) {
    console.log(element * 10)
}

forEach(array, multiplyBy10)

console.log('CASE for each element in [10, 20, /* empty */, 40] print it in the console ignoring empty elements')

var array = [10, 20, /* empty */, 40]

function printInConsoleIgnoringEmptyElements(element) {
    if (typeof element !== 'undefined')
        console.log(element)
}

forEach(array, printInConsoleIgnoringEmptyElements)