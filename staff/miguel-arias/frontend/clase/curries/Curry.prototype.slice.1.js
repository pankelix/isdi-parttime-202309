//string, null, undefined lo convierte a 0
//boolean true lo convierte a 1
//boolean false lo convierte a 0
//primer valor puede ser positivo o negativo, decimal o entero
//segundo valor puede ser positivo o negativo, decimal o entero
//si el primer valor no existe, lo convierte en 0
//si el segundo valor no existe, lo convierte en c.length
//valores negativos cuenta desde el final
//valores decimales los convierte al entero(ignora todo lo de después de la coma)
//a partir del tercer valor, lo ignora

Curry.prototype.slice = function (start) {
    slicedArray = []
    for (var i = start; i < c.length; i++) {
        slicedArray[slicedArray.length] = c[i]
    }
    return slicedArray
}