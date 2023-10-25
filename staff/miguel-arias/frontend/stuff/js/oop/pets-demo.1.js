class Dog {
    constructor(name) {
        this.name = name
    }
}

class Cat {
    constructor(name) {
        this.name = name
    }
}

class Mice {
    constructor(name) {
        this.name = name
    }
}

const pluto = new Dog('Pluto')
const silvester = new Cat('Silvester')
const mickey = new Mice('Mickey')

pluto
//Dog {name: 'Pluto}
//name: 'Pluto'
//[[Prototype]]: Object
silvester
//Cat {name: 'Silvester}
//name: 'Silvester'
//[[Prototype]]: Object
mickey
//Mice {name: 'Mickey}
//name: 'Mickey'
//[[Prototype]]: Object