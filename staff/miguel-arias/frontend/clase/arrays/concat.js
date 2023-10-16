/*
El método 'concat' crea un nuevo array con la conjunción de otros arrays
*/

/* function concat(array1, array2) {
    var result = []

    for (var i = 0; i < array1.length; i++) {
        result[result.length] = array1[i]
    }

    for (var i = 0; i < array2.length; i++) {
        result[result.length] = array2[i]
    }

    return result
} */


/* function concat(...arrays) {
    var concatenatedArray = [...arrays[0]]
    var newArray = [...arrays[1]]
    var lengthCounter = 0
    
    for (var array of arrays) {
        if (arrays.length === 2) {
            var newArray = [concatenatedArray + ',' + newArray]
            return newArray
            
        } else {
            for (i = 2; i < arrays.length; i++) {
                concatenatedArray = [concatenatedArray + ',' + newArray]
                newArray = [arrays[i]]
                lengthCounter++
                if (arrays.length === lengthCounter + 1) {
                    return concatenatedArray
                }
            }
        }
    }
} */

/* function concat(...arraysToConcat) {
    var concatenatedArrays = []

    for (var i = 0; i < arraysToConcat.length; i++) {
        concatenatedArrays = [...concatenatedArrays, ...arraysToConcat[i]]
    }

    return concatenatedArrays
} */

// resolver con arguments

function concat(array) {
    for (var i = 1; i < arguments.length; i++) {
        array[array.length] += arguments[i]
    }
    
    return array
}