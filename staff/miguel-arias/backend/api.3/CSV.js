const fs = require('fs')

function loadAsObject(file, callback) {
    fs.readFile(file, 'utf8', (error, csv) => {
        if (error) {
            console.log(error)

            return
        }

        const data = []

        const lines = csv.split('\r\n')

        const fields = lines[0].split(',')

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i]

            const values = line.split(',')

            const item = {}

            for (const j in fields) {
                const field = fields[j] //0 = id, 1 = name, 2 = email, 3 = password

                item[field] = values[j] // user[id] = user/567, user[name] = Pin Ocho, user[email] = pin@ocho.com ...
            }

            data.push(item)
        }

        callback(null, data)
    })
}

function saveFromObject(file, data, callback) {
    const fields = Object.keys(data[0])

    let csv = fields.join()

    for (const item of data) {
        let line = ''

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]

            line += item[field] + (i < fields.length - 1 ? ',' : '')
        }

        csv += '\r\n' + line
    }

    fs.writeFile(file, csv, error => {
        if (error) {
            callback(error)

            return
        }

        callback(null)
    })
}

module.exports = {
    loadAsObject,
    saveFromObject
}