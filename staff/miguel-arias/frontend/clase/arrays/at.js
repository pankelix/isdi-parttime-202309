/*
El método 'at' coge un número entero y devuelve el item que está en ese index. Los enteros positivos cuentan desde el principio del array y los negativos cuentan desde el final.

Steps:
- Tengo como parametros el array entero y el indice que quiero sacar
- Recorro el array con un for
- El índice puede ser positivo o negativo, por lo que tengo que crear dos opciones, una para index>0 y otra para index<0
- Para index>0: Cuando el array llegue al punto de index, que lo devuelva
- Para index<0: Cojo el negativo de la longitud del array y voy iterando el for restandole la i. Cuando llega a ser igual que el index que le he dado, que lo devuelva
*/

/* function at(array, index) {
    for (i = 0; i < array.length; i++) {
        if (index >= 0) {
            if (i === index)
                return array[i]

        } else {
            if (index === -(array.length - i))
                return array[i]
        }
    }
} */

/* function at(array, index) {
    if (index >= 0) {
        return array[index]
    }

    return array[array.length + index]
} */

function at(array, index) {
    // devuelveme array con el indice array.length + index a no ser que index sea mayor que 0, que entonces me devuelves solo index
    return array[index >= 0 ? index : array.length + index]
}