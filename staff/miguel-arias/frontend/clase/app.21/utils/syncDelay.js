function block(callback, seconds) {
    const before = Date.now()

    while (Date.now() - before < seconds * 1000);

    callback()
}