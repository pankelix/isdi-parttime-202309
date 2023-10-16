/*
El método 'filter' crea una copia de un array, pero solo con los elementos que pasan la prueba que les pone una funcion. 
*/

function filter(array, callback) {
    var result = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        if (callback(element))
            result[result.length] = element
    }

    return result
}