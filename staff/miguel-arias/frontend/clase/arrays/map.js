/* 
Lo que hace maps es crear un nuevo array con los mismos elementos pero modificados en base a una función callback. Devuelve un array
 */

function map (array, callback) {
    var result = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i] //element es cada elemento del array
        result[i] = callback(element) //result[i] nos lo posiciona en el indice del array que toca (0, 1, 2...) y al hacer el callback sobre element nos lo multiplica por 2
    }

    return result
}