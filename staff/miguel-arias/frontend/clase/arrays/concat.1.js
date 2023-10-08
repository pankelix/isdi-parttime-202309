/*
El método 'concat' crea un nuevo array con la conjunción de otros arrays
*/

/* function concat(array1, array2) {
    var newArray = array1 + ',' + array2
    return newArray
} */


function concat(...arrays) {
    var newArray = []
    for (var array of arrays)
        newArray += ',' + array
    return newArray
}
