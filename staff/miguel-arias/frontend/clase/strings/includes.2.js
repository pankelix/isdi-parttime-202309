function includes(string, textToFind) {

    if (textToFind.length === 1) {
        for (var i = 0; i < string.length; i++) {
            if (string[i] === textToFind) {
                return true
            }
        }

        return false
    } else if (textToFind.length === 2) {
        
        /*
        Steps:
        - Si la longitud de textToFind=2.
        - Creamos dos variables para compararlas entre ellas, asignando una a la primera posición y otra a la segunda.
        - Recorrer textToFind.
        - Buscar en la string la primera de las variables.
        - En caso de que encuentre la primera, comprueba que la siguiente letra es la segunda variable devolviendo true en caso afirmativo y false en caso contrario.
    
        */

        var charOne = textToFind[0]
        var charTwo = textToFind[1]

        for (var i=0; i<string.length; i++) {
            if (string[i] === charOne) {
                if (string[i+1] === charTwo) {
                    return true
                }

                return false
            }
        }
    }
}