/*
El método 'sort' ordena los elementos que se le dan y te devuelve una referencia al mismo array, ahora ordenado.

Steps:
- Tengo un array desordenado
- Hago un for
- Hago un for anidado
- Cuando la resta del número del primer for con el número del for anidado me de negativo, lo pusheo a otro array
*/

/* function sort(array) {
    var newArray = []
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length; j++) {
            if (array[i] < array[j]) {
                newArray.push(array[i])
                console.log(array[i])
                console.log(array[j])
                console.log(newArray)
                break
            }
        }
    }
    console.log(newArray)
} */

function sort(array) {
    var newArray = []
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length; j++) {
            if (array[i] - array[j] < 0) {
                newArray.push(array[i])
                console.log(array[i])
                console.log(array[j])
                console.log(newArray)
                break
            } else if (array[i] - array[j] > 0) {
                newArray.push(array[j])
                console.log(array[i])
                console.log(array[j])
                console.log(newArray)
                break
            } else {
                break
            }
        }
    }
    console.log(newArray)
}