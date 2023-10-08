console.log('TEST concat')

console.log('CASE for arrays [1, 2, 3] and [4, 5, 6] concat should return [1, 2, 3, 4, 5, 6]')
console.log(concat([1, 2, 3], [4, 5, 6]))
//[1, 2, 3, 4, 5, 6]

console.log('CASE for arrays ["a", "b"],  ["c", "d"] and ["e", "f"] concat should return [a, b, c, d, e, f]')
console.log(concat(['a', 'b'], ['c', 'd'], ['e', 'f']))
//[a, b, c, d, e, f]

console.log('CASE for arrays ["a1"], ["b2"], ["c3"], ["d4"], ["e5"] and ["f6"] concat should return [a1, b2, c3, d4, e5, f6]')
console.log(concat(["a1"], ["b2"], ["c3"], ["d4"], ["e5"], ["f6"]))
//[a1, b2, c3, d4, e5, f6]

console.log('CASE for arrays ["11"], ["22"], ["33"], ["44"], ["55"], ["66"], ["77"], ["88"], ["99"] and ["100"] concat should return [11, 22, 33, 44, 55, 66, 77, 88, 99, 100]')
console.log(concat(["11"], ["22"], ["33"], ["44"], ["55"], ["66"], ["77"], ["88"], ["99"], ["100"]))
//[11, 22, 33, 44, 55, 66, 77, 88, 99, 100]