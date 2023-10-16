/*
Lo que hace forEach es ejecutar una función para cada elemento del array. No devuelve nada
 */

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element)
    }
}