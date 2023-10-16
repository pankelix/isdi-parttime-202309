console.log('TEST slice')
console.log('CASE map array [1, 4, 9, 16, 23, 40, 8, 3] with start in 2 and end in 5 sliced array will return [9, 16, 23]')

var arrayToSlice = [1, 4, 9, 16, 23, 40, 8, 3]
var start = 2
var end = 5

var slicedArray = slice(arrayToSlice, start, end)

console.log(slicedArray)

console.log('CASE map array [1, 4, 9, 16, 23, 40, 8, 3] with start in null and end in 7 sliced array will return [1, 4, 9, 16, 23, 40, 8]')

var arrayToSlice = [1, 4, 9, 16, 23, 40, 8, 3]
var start = null
var end = 7

var slicedArray = slice(arrayToSlice, start, end)

console.log(slicedArray)

console.log('CASE map array [1, 4, 9, 16, 23, 40, 8, 3] with start in 0 and end in 7 sliced array will return [1, 4, 9, 16, 23, 40, 8]')

var arrayToSlice = [1, 4, 9, 16, 23, 40, 8, 3]
var start = 3
var end = 0

var slicedArray = slice(arrayToSlice, start, end)

console.log(slicedArray)