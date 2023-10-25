/* string, null, undefined lo convierte a 0 XXX
boolean true lo convierte a 1 XXX
boolean false lo convierte a 0 XXX
primer valor puede ser positivo o negativo, decimal o entero XXX
segundo valor puede ser positivo o negativo, decimal o entero XXX
si el primer valor no existe, lo convierte en 0 XXX
valores negativos cuenta desde el final XXX
valores decimales los convierte al entero(ignora todo lo de después de la coma) XXX
a partir del tercer valor, lo ignora XXX */

Curry.prototype.slice = function (start, end) {
    if (arguments.length === 0)
        start = 0

    if (start === null || start === undefined || start === false || typeof start === 'string')
        start = 0

    if (start === true)
        start = 1

    if (end === null || end === undefined || end === false || typeof end === 'string')
        end = 0

    if (end === true)
        end = 1

    if (!Number.isInteger(arguments[0]))
        if (start > 0) {
            start = '' + start
            start = start[0]
        } else if (start < 0) {
            start = '' + start
            start = start[0] + start[1]
        }
    start = Number(start)

    if (!Number.isInteger(arguments[1]))
        if (end > 0) {
            end = '' + end
            end = end[0]
        } else if (start < 0) {
            end = '' + end
            end = end[0] + end[1]
        }
    end = Number(end)

    if (arguments.length > 2)
        arguments.length = 2

    if (arguments.length === 1) {
        if (start < 0)
            start = start + this.length

        const slicedCurry = new Curry
        for (let i = start; i < this.length; i++) {
            slicedCurry[slicedCurry.length] = this[i]
            slicedCurry.length++
        }

        return slicedCurry
    } else if (arguments.length === 2 || arguments.length === 0) {
        if (start < 0)
            start = start + this.length

        if (end < 0)
            end = end + this.length

        if (start === 0)
            end = c.length

        const slicedCurry = new Curry
        for (let i = start; i < end; i++) {
            slicedCurry[slicedCurry.length] = this[i]
            slicedCurry.length++
        }
        return slicedCurry
    }
}