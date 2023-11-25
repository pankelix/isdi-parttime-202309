function asyncDelay(callback) {
    setTimeout(callback, Math.random * 100)
}

export default asyncDelay