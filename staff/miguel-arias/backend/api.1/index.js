const fs = require('fs') //esto es un import, fs está dentro de node

//como leer contenido en el archivo helloworld.txt
/*fs.readFile('./helloworld.txt', 'utf8', (error, content) =>{
    if (error) {
        console.log(error)

        return
    }

    console.log(content)
}) */

//como escribir un archivo llamado holamundo.txt con un texto "Hola mundo!"
fs.writeFile('./holamundo.txt', 'Hola Mundo!', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('saved')
})

console.log('continue...')