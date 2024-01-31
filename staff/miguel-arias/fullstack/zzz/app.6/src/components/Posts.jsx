import { useEffect, useState } from "react"
import Post from "./Post"

function Posts(props) {
    console.log('Posts')

    const [posts, setPosts] = useState([])

    const refreshPosts = () => {
        try {
            props.loadPosts((error, posts) => {
                if (error) {
                    props.onError(error)

                    return
                }

                posts.reverse()

                setPosts(posts)
            })
        } catch (error) {
            props.onError(error)
        }
    }

    useEffect(() => {
        console.log('Posts effect')

        refreshPosts()
    }, [props.stamp])

    return <div className="posts">
        {posts.map(post => <Post key={post.id} post={post} onLikeSuccess={refreshPosts} onDeleteSuccess={refreshPosts} onFavSuccess={refreshPosts} onEditSuccess={refreshPosts} onError={props.onError} />)}
    </div>
}

export default Posts