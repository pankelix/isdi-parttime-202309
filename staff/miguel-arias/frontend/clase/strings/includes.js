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
        - Creamos dos variables, asignando una a la primera posición y otra a la segunda de textToFind.
        - Recorrer el string.
        - Buscar en la string la primera de las variables.
        - En caso de que encuentre la primera, comprueba que la siguiente letra es la segunda variable devolviendo true en caso afirmativo y false en cualquier otro caso.
        */


        var charOne = textToFind[0]
        var charTwo = textToFind[1]

        for (var i = 0; i < string.length; i++)
            if (string[i] === charOne && string[i + 1] === charTwo) return true

        return false
    } else if (textToFind.length === 3) {

        /*
        Steps:
        - Si la longitud de textToFind=3.
        - Creamos tres variables, asignando una a cada letra del textToFind.
        - Recorrer string.
        - Buscar en el string la primera de las variables.
        - En caso de que la encuentre, comprueba que la siguiente letra es la segunda variable devolviendo true en caso afirmativo hace lo mismo con la tercera devolviendo true y false en caso de que no se cumpla alguna de las condiciones.
        */

        var charOne = textToFind[0]
        var charTwo = textToFind[1]
        var charThree = textToFind[2]

        for (var i = 0; i < string.length; i++)
            if (string[i] === charOne && string[i + 1] === charTwo && string[i + 2] === charThree) return true

        return false
    } else {

        /*
        Steps:
        - Para cualquier longitud de textToFind.
        - No podemos crear tres variables, porque son virtualmente infinitas. Tenemos que crear dos e ir concatenando el resultado de la segunda a la primera.
        - Recorrer string.
        - Buscar en el string la primera de las variables.
        - En caso de que la encuentre, comprueba que la siguiente letra es la segunda variable. Si es true, concatenas la variable 2 a la 1 y repites.
        */

        var concatenatedLetters = textToFind[0]
        var newLetter = textToFind[1]

        for (var i = 2; i < string.length; i++) {
            if (string[i] === concatenatedLetters && string[i + 1] === newLetter) {
                concatenatedLetters = string[i] + string[i + 1]
                newLetter = string[i + 2]
            }
            if (concatenatedLetters === textToFind)
                return true
        }

        return false
    }
}