/* const users = {
    fullName: 33,
    age: 35,
    '': 60,
    email: "william@wallace.com",
    alive: false
} */

const cars = [ {brand: "ferrari"}, {brand: "audi"}]

/* let isInitial = true */

function replacer(key, value) {
    /* if (isInitial) {
        isInitial = false
        return value
    } */

    /* if (typeof value === "string")
        return undefined

    if (key === "")
        return undefined */
    
    return "<" + key + "," + value + ">"
}

console.log(JSON.stringify(cars, replacer, 4))