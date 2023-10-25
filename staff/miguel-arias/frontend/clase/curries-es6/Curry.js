class Curry {
    constructor(...args) {
        if (args.length === 1)
            if (Number.isInteger(args[0]) && args[0] >= 0) {
                this.length = args[0]

                return
            } else if (Number.isInteger(args[0]) && args[0] < 0 || typeof args[0] === 'number' && !Number.isInteger(args[0]))
                throw new RangeError('Invalid curry length')


        for (let i = 0; i < args.length; i++) {
            const argument = args[i]

            this[i] = argument
        }

        this.length = args.length
    }

    push(...items) {
        if (items.length) {
            this[this.length] = items[0]
            this.length++


            if (items.length > 1)
                for (let i = 1; i < items.length; i++) {
                    this[this.length] = items[i]
                    this.length++
                }
        }

        return this.length
    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i]

            callback(element)
        }
    }

    at(index) {
        if (index >= this.length || index + this.length < 0)
            return undefined

        if (index === true) {
            element = this[1]
            return element
        } else if (index === false || typeof index === 'string' || typeof index === 'object' || typeof index === 'undefined') {
            element = this[0]
            return element
        }

        if (Number.isInteger(index)) {
            if (index < 0) {
                element = this.length - index
                return element
            }
        }

        if (!Number.isInteger(index)) {
            if (index > 0) {
                index = '' + index + ''
                element = index[0]
                element = Number(element)
                element = this[element]
                return element
            } else {
                index = '' + index + ''
                element = index[0] + index[1]
                element = Number(element)
                element = this[element + this.length]
                return element
            }
        }

        element = this[index]
        return element
    }

    concat(...curries) {
        const newCurry = new Curry()
        for (let i = 0; i < this.length; i++) {
            newCurry[newCurry.length] = this[i]
            newCurry.length++
        }

        for (let i = 0; i < curries.length; i++) {
            for (let j = 0; j < curries[i].length; j++) {
                newCurry[newCurry.length] = curries[i][j]
                newCurry.length++
            }
        }

        return newCurry
    }

    filter(callback) {
        if (typeof callback !== 'function')
            throw new TypeError(typeof callback + ' ' + callback + ' is not a function')

        const filteredCurry = new Curry
        for (let i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                filteredCurry[filteredCurry.length] = this[i]
                filteredCurry.length++
            }
        }

        return filteredCurry
    }

    indexOf(element) {
        for (let i = 0; i < this.length; i++) {
            if (element === this[i])
                return i
        }
        return -1
    }

    join(separator) {
        joinedString = ''

        if (separator === undefined)
            separator = ','

        if (this.length === 0)
            return ''

        if (this.length === 1)
            return this.toString()

        for (let i = 0; i < this.length; i++) {
            joinedString += this[i]

            if (i < this.length - 1)
                joinedString += separator
        }
        return joinedString
    }

    map(callback) {
        switch (typeof callback) {
            case 'function':
                const mappedCurry = new Curry
                for (let i = 0; i < this.length; i++)
                    mappedCurry[i] = callback(this[i])

                return mappedCurry
            case 'undefined':
                throw new TypeError('undefined is not a function')
            case 'string':
                throw new TypeError('string "' + callback + '" is not a function')
            case 'number':
                throw new TypeError('number ' + callback + ' is not a function');
            case 'object':
                throw new TypeError('object ' + callback + ' is not a function');
            case 'boolean':
                throw new TypeError('boolean ' + callback + ' is not a function');
            default:
        }
    }

    pop() {
        if (this.length > 0) {
            let deletedElement = ''

            deletedElement = this[this.length - 1]
            delete this[this.length - 1]
            this.length--
            return deletedElement

        } else {
            return undefined
        }
    }

    find(callback) {
        switch (typeof callback) {
            case 'function':
                for (let i = 0; i < this.length; i++) {
                    if (callback(this[i]))
                        return this[i]
                }
            case 'undefined':
                throw new TypeError('undefined is not a function')
            case 'string':
                throw new TypeError('string "' + callback + '" is not a function')
            case 'number':
                throw new TypeError('number ' + callback + ' is not a function');
            case 'object':
                throw new TypeError('object ' + callback + ' is not a function');
            case 'boolean':
                throw new TypeError('boolean ' + callback + ' is not a function');
            default:
        }
    }

    slice(start, end) {
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

    splice(start, deleteCount) { //NO TERMINADO
        deletedElements = new Curry
        if (arguments.length === 1) {
            for (let i = start; i < this.length; i++) {
                deletedElements[deletedElements.length] = this[i]
                delete this[i]
                deletedElements.length++
            }

            this.length = this.length - deletedElements.length
            return deletedElements

        } else if (arguments.length === 2) {
            for (let i = start; i < this.length; i++) {
                if (i === start + deleteCount - 1) {
                    deletedElements[deletedElements.length] = this[i]
                    delete this[i]
                    deletedElements.length++
                }
            }

            return deletedElements
        }
    }

    reverse() {
        for (let i = 0; i < Math.floor(this.length / 2); i++) {
            let forwardElement = this[i]
            this[i] = this[this.length - 1 - i]
            this[this.length - 1 - i] = forwardElement
        }

        return this
    }

    toReversed() {
        toReversedCurry = new Curry()

        for (let i = this.length - 1; i > -1; i--) {
            toReversedCurry[this.length - 1 - i] = this[i]
            toReversedCurry.length++
        }

        return toReversedCurry
    }

}