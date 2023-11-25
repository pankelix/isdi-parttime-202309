import React from "react"
import logic from "../logic"
import Profile from "./Profile"

import { Container, Form, Field, Button, Link, } from "../library/index"
import { Post } from "../components/index"

function Home(props) {
    console.log('Home')

    const [view, setView] = React.useState(null)
    const [name, setName] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [favs, setFavs] = React.useState(null)

    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {
                alert(error.message)

                return
            }
        })

        props.onLogoutClick()
    }

    React.useEffect(() => {
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

        setView(null)
    }

    function handleNewPostClick() {
        setView('new-post')
    }

    function handleCancelNewPostClick(event) {
        event.preventDefault()

        setView(null)
    }

    function refreshPosts() {
        if (view === null || view === 'new-post')
            try {
                logic.retrievePosts((error, posts) => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    posts.reverse()

                    setPosts(posts)
                })
            } catch (error) {
                alert(error.message)
            }
        else if (view === 'favs')
            try {
                logic.retrieveFavPosts((error, favs) => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    favs.reverse()

                    setFavs(favs)
                })
            } catch (error) {
                alert(error.message)
            }
    }

    React.useEffect(() => {
        console.log('Home -> effect (posts)')

        refreshPosts()
    }, [view])

    function handleNewPostSubmit(event) {
        event.preventDefault()

        const image = event.target.querySelector('#image-input').value
        const text = event.target.querySelector('#text-input').value

        try {
            logic.publishPost(image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                try {
                    logic.retrievePosts((error, posts) => {
                        if (error) {
                            alert(error.message)

                            return
                        }

                        posts.reverse()

                        setPosts(posts)
                        setView(null)
                    })
                } catch (error) {
                    alert(error.message)
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleToggleLikePostClick(postId) {
        try {
            logic.toggleLikePost(postId, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                refreshPosts()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleDeletePostClick(postId) {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                logic.deletePost(postId, error => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    refreshPosts()
                })
            } catch (error) {
                alert(error.message)
            }
        }

        return
    }

    function handleToggleFavPostClick(postId) {
        try {
            logic.toggleFavPost(postId, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                refreshPosts()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleFavPostsClick(event) {
        event.preventDefault()

        try {
            logic.retrieveFavPosts((error, favs) => {
                if (error) {
                    alert(error.message)

                    return
                }

                favs.reverse()

                setFavs(favs)
                setView('favs')
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div>
        <header className="home-header">
            <h1><Link onClick={handleHomeClick}>Home</Link></h1>

            <div className="home-header-buttons">
                <Button className="new-post-button" onClick={handleNewPostClick}>➕</Button>
                <Link onClick={handleProfileClick}>{name}</Link>
                <Link onClick={handleFavPostsClick}>Fav list</Link>
                <Button className="logout-button" onClick={handleLogoutClick}>Logout</Button>
            </div>
        </header>

        {view === 'profile' && <Profile onClick={handleProfileClick} />}

        {view === 'new-post' && <Container>
            <div className="new-post-view">
                {console.log('new post view')}
                <h2>New post</h2>

                <Form onSubmit={handleNewPostSubmit}>
                    <Field id="image-input" type="url">Image</Field>

                    <Field id="text-input">Text</Field>

                    <Button type="submit">Post</Button>
                    <Button onClick={handleCancelNewPostClick}>Cancel</Button>
                </Form>
            </div>
        </Container>}

        {(view === null || view === 'new-post') && posts !== null && <div className="post-div">
            {console.log('normalview')}
            {posts.map(post => <Post key={post.id} post={post} onToggleLikeClick={handleToggleLikePostClick} onToggleFavPostClick={handleToggleFavPostClick} onDeletePostClick={handleDeletePostClick} />)}
        </div>}

        {view === 'favs' && favs !== null && <div className="post-div">
            {console.log('favs')}

            {favs.map(post => <Post key={post.id} post={post} onToggleLikeClick={handleToggleLikePostClick} onToggleFavPostClick={handleToggleFavPostClick} onDeletePostClick={handleDeletePostClick} />)}
        </div>}
    </div>
}

export default Home