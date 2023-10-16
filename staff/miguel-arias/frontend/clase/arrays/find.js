/* 
El método "find" devuelve el primer elemento de un array que satisface una callback. Si ninguno satisface, devuelve undefined.
*/

function find(array, callback) {
    for (let i = 0; i < array.length; i++) {
        var element = array[i]

        if (callback(element))
            return element

    }
}