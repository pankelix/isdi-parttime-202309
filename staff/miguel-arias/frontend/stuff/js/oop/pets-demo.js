class Pet {
    constructor(name) {
        this.name = name
    }

    fart() { console.log('farting!') } //comportamiento general de todos los pets
}

class Dog extends Pet {
    constructor(name) {
        super(name)
    }

    bark() { console.log('woof!') } //comportamiento especifico de Dog
}

class Dalmata extends Dog {
    constructor(name) {
        super(name)
    }
}

class Cat extends Pet {
    constructor(name) {
        super(name)
    }

    meow() { console.log('meow!') }
}

class Mice extends Pet {
    constructor(name) {
        super(name)
    }

    squeak() { console.log('creee!') }
}

const pluto = new Dog('Pluto')
const silvester = new Cat('Silvester')
const mickey = new Mice('Mickey')
const pongo = new Dalmata('Pongo')

pluto
//Dog {name: 'Pluto}
//name: 'Pluto'
//[[Prototype]]: Pet
//constructor: class Dog
//[[Prototype]]: Object
silvester
//Cat {name: 'Silvester}
//name: 'Silvester'
//[[Prototype]]: Pet
//constructor: class Cat
//[[Prototype]]: Object
mickey
//Mice {name: 'Mickey}
//name: 'Mickey'
//[[Prototype]]: Pet
//constructor: class Mice
//[[Prototype]]: Object
pongo
//Dog {name: 'Pongo}
//name: 'Pongo'
//[[Prototype]]: Dog
//constructor: class Dalmata
//[[Prototype]]: Pet
//constructor: class Dog
//[[Prototype]]: Object
//constructor: class Pet