import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Image, Button, Input, Form, Link } from "../library/index"
import logic from "../logic"
import session from "../logic/session"
import { useContext } from '../hooks/index'

function Post(props) {
    const post = props.post

    const [edit, setEdit] = useState(null)

    const context = useContext()
    const navigate = useNavigate()

    function handleToggleLikeClick() {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onLikeSuccess()
            })

        } catch (error) {
            context.handleError(error)
        }
    }

    function handleDeleteClick() {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        context.handleError(error)

                        return
                    }

                    props.onDeleteSuccess()
                })
            } catch (error) {
                context.handleError(error)
            }
        }

        return
    }

    function handleToggleFavClick() {
        try {
            logic.toggleFavPost(post.id, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onFavSuccess()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleToggleEditClick() {
        try {
            logic.toggleEditPost(post.id, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                if (edit !== 'edit') {
                    setEdit('edit')

                    return
                }

                setEdit('null')
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleEditConfirmClick() {
        const textToEdit = document.querySelector('#textToEdit').value
        console.log(textToEdit)
        try {
            logic.updatePostText(post.id, textToEdit, error => {
                if (error) {
                    context.handleError(error)

                    return
                }
                props.onEditSuccess()
            })
            setEdit('null')
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleCommentSubmit(event) {
        event.preventDefault()
        const textToComment = document.querySelector(`#textToComment${post.id}`).value
        try {
            logic.commentPost(session.userId, post.id, textToComment, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onCommentSuccess()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    /* function handleDeleteComment() {
        try {
            logic.deleteComment(session.userId, comments._id, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onCommentDeletion()
            })
        } catch (error) {
            context.handleError(error)
        }
    } */

    const handleUserClick = event => {
        event.preventDefault()
        navigate(`/users/${post.author.id}`)
    }

    return <article className="post">
        <h3><Link onClick={handleUserClick}>{post.author.name}</Link></h3>
        <Image src={post.image} />

        <aside>
            <Button onClick={handleToggleLikeClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length}</Button>
            <Button onClick={handleToggleFavClick}>{post.fav ? '🌟' : '⭐'}</Button>
            {post.author.id == session.userId && <Button onClick={handleDeleteClick}>🚽</Button>}
        </aside>

        <aside>
            <h4>{post.author.name}</h4>
            <p>{post.text}</p>
            {post.author.id == session.userId && <Button className="other-button" onClick={handleToggleEditClick}>✏</Button>}
            {edit === 'edit' && <div> <Input id="textToEdit"></Input> <Button onClick={handleEditConfirmClick}>✅</Button> </div>}
        </aside>
        <aside className="comments">
            {post.comments && post.comments.map(comment => <div >▶<h5>{comment.name}</h5> <h6>{comment.text}</h6> {/* <Button onClick={() => handleDeleteComment(comment.id)}>💥</Button> */}</div>)}
        </aside>
        <aside className="comments">
            <Form onSubmit={handleCommentSubmit}>
                <Input id={`textToComment${post.id}`} type="text" placeholder="Add a comment">Add a comment</Input>
                <Button className="other-button" type="submit">Publish</Button>
            </Form>
        </aside>
    </article>
}

export default Post