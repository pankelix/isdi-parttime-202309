const CSV = require('./CSV')

/* CSV.loadAsObject('./users.csv', (error, users) => {
    if (error) {
        console.log(error)

        return
    }

    console.log(users)
}) */

CSV.loadAsObject('./users.csv', (error, users) => {
    if (error) {
        console.log(error)

        return
    }

    CSV.saveFromObject('./users2.csv', users, error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('end')
    })
})