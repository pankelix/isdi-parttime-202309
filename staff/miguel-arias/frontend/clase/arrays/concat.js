/*
El método 'concat' crea un nuevo array con la conjunción de otros arrays
*/


function concat(...arrays) {
    var concatenatedArray = [...arrays[0]]
    var newArray = [...arrays[1]]
    var lengthCounter = 0

    for (var array of arrays) {
        if (arrays.length === 2) {
            var newArray = [concatenatedArray + ',' + newArray]
            return newArray

        } else {
            for (i=2; i < arrays.length; i++) {
                concatenatedArray = [concatenatedArray + ',' + newArray]
                newArray = [arrays[i]]
                lengthCounter++
                if (arrays.length === lengthCounter+1) {
                    return concatenatedArray
                }
            }
        }
    }
}
