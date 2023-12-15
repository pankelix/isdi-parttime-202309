const fs = require('fs')

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

module.exports = {
    parse: JSON.parse, /* interpretar un string y convertirlo a un objeto */
    parseFromFile,
    stringify: JSON.stringify, /* un objeto convertirlo a un string */
    stringifyToFile
}