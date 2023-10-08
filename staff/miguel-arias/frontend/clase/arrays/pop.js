/*
El método 'pop' elimina el último elemento de un array y devuelve ese elemento eliminado. Este método cambia la longitud del array.

Steps:
- declarar la variable donde va a ir el array sin el último elemento
- recorrer el array, y el último elemento lo meto en una variable
- devuelvo esa variable
- para modificar el array original, le quito el último elemento reduciendo en 1 la distancia de su longitud
*/

function pop(array) {
    var elementRemoved = ''
    for (i = 0; i < array.length; i++) {
        if (i === array.length-1) {
            elementRemoved = array[i]
            array.length = array.length - 1
            return elementRemoved
        }
    }
}