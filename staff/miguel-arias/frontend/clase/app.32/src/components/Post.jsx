import { Image, Button } from "../library/index"
import logic from "../logic"

function Post(props) {
    const post = props.post

    function handleToggleLikeButtonClick() {
        props.onToggleLikeClick(post.id)
    }

    function handleToggleFavPostButtonClick() {
        props.onToggleFavPostClick(post.id)
    }

    function handleDeletePostButtonClick() {
        props.onDeletePostClick(post.id)
    }

    return <article className="post">
        <h3>{post.author.name}</h3>
        <Image src={post.image} />

        <div className="post-buttons">
            <Button onClick={handleToggleLikeButtonClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length}</Button>
            <Button onClick={handleToggleFavPostButtonClick}>{post.fav ? '🌟' : '⭐'}</Button>
            {post.author.id == logic.sessionUserId && <Button onClick={handleDeletePostButtonClick}>🚽</Button>}
        </div>

        <div className="post-text">
            <h4>{post.author.name}</h4>
            <p>{post.text}</p>
        </div>
    </article>
}

export default Post