console.log('TEST splice')

console.log('CASE replace one element')

var months = ['Jan', 'Feb', 'March', 'April', 'June']

var removed = splice(months, 4, 1, 'May')

console.log(months)
// ['Jan', 'Feb', 'March', 'April', 'May']

console.log(removed)
// ['June']

console.log('CASE insert one element')

var months = ['Jan', 'March', 'April']

var removed = splice(months, 1, 0, 'Feb')

console.log(months)
// ['Jan', 'Feb', 'March', 'April']

console.log(removed)
// []

console.log('CASE remove 0 (zero) elements before index 2, and insert "drum" and "guitar"')

var fish = ['angel', 'clown', 'mandarin', 'sturgeon']

var removed = splice(fish, 2, 0, 'drum', 'guitar')

console.log(fish)
// ['angel', 'clown', 'drum', 'guitar', 'mandarin', 'sturgeon']

console.log(removed)
// []

console.log('CASE remove 1 element at index 3')

var fish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']

var removed = splice(fish, 3, 1)

console.log(fish)
// ['angel', 'clown', 'drum', 'sturgeon']

console.log(removed)
// ['mandarin']

console.log('CASE remove 2 elements from index 3')

var fish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon', 'sword']

var removed = splice(fish, 3, 2)

console.log(fish)
// ['angel', 'clown', 'drum', 'sturgeon']

console.log(removed)
// ['mandarin']