const fs = require('fs') //esto es un import, fs está dentro de node

//como leer contenido en el archivo users.csv
fs.readFile('./users.csv', 'utf8', (error, content) => {
    if (error) {
        console.log(error)

        return
    }

    const users = []

    const lines = content.split('\r\n') //separamos los datos por lineas (dividiendo a cada salto de linea)

    const fields = lines[0].split(',') //separamos la primera linea en columnas (dividiendo en cada coma)

    for (let i = 1; i < lines.length; i++) { //separamos el resto de lineas tambien en columnas
        const line = lines[i]

        const values = line.split(',')

        const user = {}

        for(const j in fields) {
            const field = fields[j] //0 = id, 1 = name, 2 = email, 3 = password

            user[field] = values[j] // user[id] = user/567, user[name] = Pin Ocho, user[email] = pin@ocho.com ...
        }

        users.push(user)
    }

        console.log(users)
})

//como escribir un archivo llamado holamundo.txt con un texto "Hola mundo!"
/* fs.writeFile('./holamundo.txt', 'Hola Mundo!', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('saved')
}) */

console.log('continue...')