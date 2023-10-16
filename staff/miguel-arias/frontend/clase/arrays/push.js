/*
El método 'push' inserta los elementos que se le dan al final de un array y devuelve la longitud del nuevo array que es creado.
*/


/* function push(array, elements) {
    elements = [elements]
    var newArray = [...array, ...elements]
    return newArray.length
} */

function push(array) {
    for (var i = 1; i < arguments.length; i++) {
        array[array.length] = arguments[i]
    }

    return array.length
}