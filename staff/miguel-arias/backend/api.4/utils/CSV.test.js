const CSV = require('./CSV')

CSV.parseFromFile('./data/users.csv', (error, users) => {
    if (error) {
        console.log(error)

        return
    }

    CSV.stringifyToFile('./data/users2.csv', users, error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('end')
    })
})

/* const csv = `id,name,email,password\r
amhkljhnhc4,Cala Bacin,cala@bacin.com,123123123\r
3clwq1ubm7u0,Zana Horia,zana@horia.com,123123123`

const users = CSV.parse(csv)
console.log(users)

const csv2 = CSV.stringify(users)
console.log(csv2) */