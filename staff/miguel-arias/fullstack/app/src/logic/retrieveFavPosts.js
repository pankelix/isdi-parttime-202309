import context from "./context"

function retrieveFavPosts(callback) {
    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.sessionUserId}`
        }
    }

    fetch('http://localhost:8000/posts/favs', req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => console.log(new Error(body.message)))
                    .catch(error => callback(error))

                return
            }

            res.json()
                .then(posts => callback(null, posts))
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default retrieveFavPosts