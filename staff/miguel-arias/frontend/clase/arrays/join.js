/*
El método 'join' crea un string con todos los elementos de un array, separados por un separador. Si el array tiene solo 1 item, devuelve el item suelto sin separador.
*/

function join(array, separator) {

    var joinedString = ''

    if (array.length === 1) {
        return array.toString()

    } else {
        for (i = 0; i < array.length; i++) {
            joinedString += array[i] + separator
        }
        
        return joinedString
    }
}
