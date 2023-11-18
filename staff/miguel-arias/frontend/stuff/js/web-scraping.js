function googl(what, callback) {
    const xhr = new XMLHttpRequest

    //response

    XPathResult.onload = function () {
        //console.log(xhr.response)

        const parser = new DOMParser
        const doc = parser.parseFromString(xhr.response, 'text/html')

        const titles = doc.querySelectorAll('h3.LC20lb')

        const results = []

        titles.forEach(title => {
            const result = {
                title: title.innerText,
                url: title.parentElement.href
            }

            results.push(result)
        })

        callback(results)
    }

    // request

    xhr.open('GET', 'https://www.google.com/search?q=' + what)
    xhr.send()
}

googl('pepito grillo', results => results.forEach(result => console.log(result)))
googl('campanilla hada', results => results.forEach(result => {
    const h2 = document.createElement('h2')
    h2.innerText = result.title

    document.body.appendChild(h2)
}))