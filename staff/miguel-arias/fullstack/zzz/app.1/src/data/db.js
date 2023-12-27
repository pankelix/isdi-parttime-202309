import { Users, Posts, CreditCards } from "./collections"
import { User, Post, CreditCard } from "./models"

var db = {
    users: new Users,
    posts: new Posts,
    cards: new CreditCards
}

// populate db

const before = Date.now()

db.users.insert(new User(null, 'Wendy Darling', 'wendy@darling.com', '123123123', []), () => {
    db.users.insert(new User(null, 'Peter Pan', 'peter@pan.com', '123123123', []), () => {
        db.posts.insert(new Post(
            null,
            db.users.__documents__[1].id,
            'https://m.media-amazon.com/images/M/MV5BMzIwMzUyYTUtMjQ3My00NDc3LWIyZjQtOGUzNDJmNTFlNWUxXkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_FMjpg_UX1000_.jpg',
            'my granpa!',
            []
        ), () => {
            db.posts.insert(new Post(
                null,
                db.users.__documents__[0].id,
                'https://ih1.redbubble.net/image.2230349250.8377/pp,840x830-pad,1000x1000,f8f8f8.jpg',
                'my sweety!',
                [db.users.__documents__[1].id]
            ), () => {
                db.posts.insert(new Post(
                    null,
                    db.users.__documents__[1].id,
                    'https://m.media-amazon.com/images/I/71JZegDmwbL.jpg',
                    'i love ü baby',
                    [db.users.__documents__[0].id]
                ), () => {
                    db.cards.insert(new CreditCard(null, db.users.__documents__[1].id, 'Peter Pan Integral', '1234 5678 9101 1120', new Date('2024-01-01')), () => {
                        console.log('database luckily populated in', (Date.now() - before) / 1000 + 's')
                    })
                })
            })
        })
    })
})

export default db