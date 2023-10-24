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
    
        var filteredCurry = new Curry
        for (let i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                filteredCurry[filteredCurry.length] = this[i]
                filteredCurry.length++
            }
        }
        
        return filteredCurry
    }

    

}