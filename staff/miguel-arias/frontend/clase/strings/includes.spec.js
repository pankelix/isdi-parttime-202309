console.log('TEST includes')

console.log('CASE for string "hola mundo" includes "m" results in true')
console.log(includes('hola mundo', 'm'))
//true

console.log('CASE for string "hola mundo" includes "w" results in false')
console.log(includes('hola mundo', 'w'))
//false

console.log('CASE for string "hola mundo" includes "h" results in true')
console.log(includes('hola mundo', 'h'))
//true

console.log('CASE for string "hola mundo" includes "o" results in true')
console.log(includes('hola mundo', 'o'))
//true

console.log('CASE for string "hola mundo" includes "H" results in false')
console.log(includes('hola mundo', 'H'))
//false

console.log('CASE for string "hola mundo" includes "mu" results in true')
console.log(includes('hola mundo', 'mu'))
//true

console.log('CASE for string "hola mundo" includes "mo" results in false')
console.log(includes('hola mundo', 'mo'))
//false

console.log('CASE for string "hola mundo" includes "la" results in true')
console.log(includes('hola mundo', 'la'))
//true

console.log('CASE for string "hola mundo" includes "las" results in false')
console.log(includes('hola mundo', 'las'))
//false

console.log('CASE for string "hola mundo" includes "la " results in true')
console.log(includes('hola mundo', 'la '))
//true

console.log('CASE for string "hola mundo" includes "wo" results in false')
console.log(includes('hola mundo', 'wo'))
//false

console.log('CASE for string "hola mundo" includes "law" results in false')
console.log(includes('hola mundo', 'law'))
//false

console.log('CASE for string "hola mundo" includes "mund" results in true')
console.log(includes('hola mundo', 'mund'))
//true

console.log('CASE for string "hola mundo" includes "laho" results in false')
console.log(includes('hola mundo', 'laho'))
//false