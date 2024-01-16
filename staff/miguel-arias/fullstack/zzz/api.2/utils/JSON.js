const fs = require ('fs')

function parseFromFile(file, callback) {
    fs.readFile(file, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const data = JSON.parse(json)

        callback(null, data)
    })
}

function stringifyToFile(file, data, callback) {
    const json = JSON.stringify(data, null, 4)

    fs.writeFile(file, json, error => {
        if (error) {
            callback(error)

            return
        }

        callback(null)
    })
}

module.export = {
    parse: JSON.parse,
    parseFromFile,
    stringify: JSON.stringify,
    stringifyToFile
}