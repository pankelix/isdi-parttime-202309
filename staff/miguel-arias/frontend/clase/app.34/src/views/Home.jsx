import { useState, useEffect } from "react"

import logic from "../logic"

import { Button, Link, } from "../library/index"
import { Profile, Posts, NewPost } from "../components/index"

function Home(props) {
    console.log('Home')

    const [view, setView] = useState(null)
    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)

    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {
                alert(error.message)

                return
            }
        })

        props.onLogoutClick()
    }

    useEffect(() => {
        console.log('Home -> effect (name)')

        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setName(user.name)
            })

        } catch (error) {
            alert(error.message)
        }
    }, []) //el array vacío al final sirve para que sólo se active la primera vez

    function handleProfileClick(event) {
        event.preventDefault()

        setView('profile')
    }

    function handleHomeClick(event) {
        event.preventDefault()

        window.scrollTo(0, 0)

        setView(null)
    }

    function handleNewPostClick() {
        setView('new-post')
    }

    function handleNewPostCancel() {
        setView(null)
    }

    function handleNewPostPublish() {
        setStamp(Date.now())
        setView(null)

        window.scrollTo(0, 0)
    }

    function handleFavPostsClick(event) {
        event.preventDefault()

        setView('favs')
    }

    return <div>
        <header>
            <h1><Link onClick={handleHomeClick}>Home</Link></h1>

            <nav>
                <Link onClick={handleProfileClick}>{name}</Link>
                <Link onClick={handleFavPostsClick}>Fav list</Link>
                <Button className="logout-button" onClick={handleLogoutClick}>Logout</Button>
            </nav>
        </header>

        <main>
            {view === 'profile' && <Profile onSuccess={setView} />}

            {(view === null || view === 'new-post') && <Posts loadPosts={logic.retrievePosts.bind(logic)} stamp={stamp} />}

            {view === 'favs' && <Posts loadPosts={logic.retrieveFavPosts.bind(logic)} />}
        </main>

        <footer>
            {view === 'new-post' && <NewPost onSuccess={handleNewPostPublish} onCancel={handleNewPostCancel} />}

            {view !== 'new-post' && <Button className="new-post-button" onClick={handleNewPostClick}>➕</Button>}
        </footer>
    </div>
}

export default Home