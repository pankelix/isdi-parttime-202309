import { useState } = require ("react"
import { Image, Button, Input } = require ("../library/index"
import logic = require ("../logic"

function Post(props) {
    const post = props.post

    const [edit, setEdit] = useState(null)

    function handleToggleLikeClick() {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                props.onLikeSuccess()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    function handleDeleteClick() {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        alert(error.message)

                        return
                    }

                    props.onDeleteSuccess()
                })
            } catch (error) {
                alert(error.message)
            }
        }

        return
    }

    function handleToggleFavClick() {
        try {
            logic.toggleFavPost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                props.onFavSuccess()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleToggleEditClick() {
        try {
            logic.toggleEditPost(post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                if (edit !== 'edit') {
                    setEdit('edit')
                }
            })

            setEdit('null')
        } catch (error) {
            alert(error.message)
        }
    }

    function handleEditConfirmClick() {
        const textToEdit = document.querySelector('#textToEdit').value
        console.log(textToEdit)
        try {
            logic.editPost(textToEdit, post.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })
            props.onEditSuccess()
            setEdit('null')
        } catch (error) {
            alert(error.message)
        }
    }

    return <article className="post">
        <h3>{post.author.name}</h3>
        <Image src={post.image} />

        <aside>
            <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length}</Button>
            <Button onClick={handleToggleFavClick}>{post.fav ? '🌟' : '⭐'}</Button>
            {post.author.id == logic.sessionUserId && <Button onClick={handleDeleteClick}>🚽</Button>}
        </aside>

        <aside>
            <h4>{post.author.name}</h4>
            <p>{post.text}</p>
            {post.author.id == logic.sessionUserId && <Button className="edit-button" onClick={handleToggleEditClick}>✏</Button>}
            {edit === 'edit' && <div> <Input id="textToEdit"></Input> <Button onClick={handleEditConfirmClick}>✅</Button> </div>}
        </aside>
    </article>
}

module.export = Post