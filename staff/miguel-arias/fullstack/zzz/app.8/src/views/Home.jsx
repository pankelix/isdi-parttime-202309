import { useState, useEffect } from "react"

import logic from "../logic"

import { useContext } from "../hooks"

import { Button, Link, } from "../library/index"
import { Profile, Posts, NewPost } from "../components/index"

function Home(props) {
    console.log('Home')

    const context = useContext()

    const [view, setView] = useState(null)
    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)

    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {
                context.handleError(error)

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
                    context.handleError(error)

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

    function handleChangeUserData() {
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

    return <>
        <header>
            <h1><Link className="header-text" onClick={handleHomeClick}></Link></h1>

            <nav>
                <Link onClick={handleProfileClick}>{name}</Link>
                <Link onClick={handleFavPostsClick}>Your ⭐</Link>
                <Button className="logout-button" onClick={handleLogoutClick}>Logout</Button>
            </nav>
        </header>

        <main>
            {view === 'profile' && <Profile onSuccess={handleChangeUserData} />}

            {(view === null || view === 'new-post') && <Posts loadPosts={logic.retrievePosts} stamp={stamp} />}

            {view === 'favs' && <Posts loadPosts={logic.retrieveFavPosts} />}
        </main>

        <footer>
            {view === 'new-post' && <NewPost onSuccess={handleNewPostPublish} onCancel={handleNewPostCancel} />}

            {view !== 'new-post' && <Button className="new-post-button" onClick={handleNewPostClick}>➕</Button>}
        </footer>
    </>
}

export default Home