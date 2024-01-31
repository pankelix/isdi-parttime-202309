import { useState } from "react"
import { Image, Button, Input } from "../library/index"
import logic from "../logic"
import context from "../logic/context"

function Post(props) {
    const post = props.post

    const [edit, setEdit] = useState(null)

    function handleToggleLikeClick() {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    props.onError(error)

                    return
                }

                props.onLikeSuccess()
            })

        } catch (error) {
            props.onError(error)
        }
    }

    function handleDeleteClick() {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        props.onError(error)

                        return
                    }

                    props.onDeleteSuccess()
                })
            } catch (error) {
                props.onError(error)
            }
        }

        return
    }

    function handleToggleFavClick() {
        try {
            logic.toggleFavPost(post.id, error => {
                if (error) {
                    props.onError(error)

                    return
                }

                props.onFavSuccess()
            })
        } catch (error) {
            props.onError(error)
        }
    }

    function handleToggleEditClick() {
        try {
            logic.toggleEditPost(post.id, error => {
                if (error) {
                    props.onError(error)

                    return
                }

                if (edit !== 'edit') {
                    setEdit('edit')

                    return
                }

                setEdit('null')
            })
        } catch (error) {
            props.onError(error)
        }
    }

    function handleEditConfirmClick() {
        const textToEdit = document.querySelector('#textToEdit').value
        console.log(textToEdit)
        try {
            logic.updatePostText(post.id, textToEdit, error => {
                if (error) {
                    props.onError(error)

                    return
                }
                props.onEditSuccess()
            })
            setEdit('null')
        } catch (error) {
            props.onError(error)
        }
    }

    return <article className="post">
        <h3>{post.author.name}</h3>
        <Image src={post.image} />

        <aside>
            <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length}</Button>
            <Button onClick={handleToggleFavClick}>{post.fav ? '🌟' : '⭐'}</Button>
            {post.author.id == context.token && <Button onClick={handleDeleteClick}>🚽</Button>}
        </aside>

        <aside>
            <h4>{post.author.name}</h4>
            <p>{post.text}</p>
            {post.author.id == context.token && <Button className="edit-button" onClick={handleToggleEditClick}>✏</Button>}
            {edit === 'edit' && <div> <Input id="textToEdit"></Input> <Button onClick={handleEditConfirmClick}>✅</Button> </div>}
        </aside>
    </article>
}

export default Post