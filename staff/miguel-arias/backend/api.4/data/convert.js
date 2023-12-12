const CSV = require('../utils/CSV')
const JSON = require('../utils/JSON')

CSV.parseFromFile('./data/users.csv', (error, users) => {
    if (error) {
        console.error(error)

        return
    }

    JSON.stringifyToFile('./data/users.json', users, error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('converted')
    })
})