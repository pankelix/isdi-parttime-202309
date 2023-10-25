class Pet {
    constructor(name) {
        this.name = name
    }
}

class Dog extends Pet{
    constructor(name) {
        super(name)
    }
}

class Cat extends Pet {
    constructor(name) {
        super(name)
    }
}

class Mice extends Pet {
    constructor(name) {
        super(name)
    }
}

const pluto = new Dog('Pluto')
const silvester = new Cat('Silvester')
const mickey = new Mice('Mickey')

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