function randomDelay(callback) {
    setTimeout(callback, Math.round(Math.random() * 100))
}

/* function asyncDelay(callback, seconds) {
    setTimeout(callback, seconds * 1000))
}*/

module.export = randomDelay