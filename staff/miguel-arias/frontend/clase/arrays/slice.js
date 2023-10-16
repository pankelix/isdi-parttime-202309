/* 
Lo que hace slice es crear un nuevo array a partir de un trozo de otro array, delimitado desde start hasta end. El array original no es modificado, devuelve un array distinto.

- Tengo que recorrer el array
- El for tiene que empezar en el punto start, y durar hasta end. Para calcular cuanto dura restar end a start.
- Si solo pongo el start, me tiene que ir hasta el final del array
- Si pongo un end que se pasa de indices en el array, tiene que ir hasta el final del array y ya
- Si start es negativo, se empieza desde array.length - start
- Si start es positivo y end es negativo, start empieza normal pero end empieza desde el final del array
- Si no se pone nada en start ni end, debería darte el array entero
 */

function slice(array, start, end) {
    if (start === null)
        start = 0

    var result = []

    if (start > 0) {
        for (var i = start; i < end; i++)
            result[i - start] = array[i]
    
        return result
    }

    if (start < 0) {
        var position = start + array.length
        for (var i = position; i < end; i++)
            result[i - start] = array[i]
    
        return result
    }
}