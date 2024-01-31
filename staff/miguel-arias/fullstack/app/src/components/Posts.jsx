import { useEffect, useState } from "react"
import Post from "./Post"
import { useContext } from "../hooks"

function Posts(props) {
    console.log('Posts')

    const context = useContext()

    const [posts, setPosts] = useState([])

    const refreshPosts = () => {
        try {
            props.loadPosts((error, posts) => {
                if (error) {
                    context.handleError(error)

                    return
                }

                posts.reverse()

                setPosts(posts)
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Posts effect')

        refreshPosts()
    }, [props.stamp])

    return <div className="posts">
        {posts.map(post => <Post key={post.id} post={post} onLikeSuccess={refreshPosts} onDeleteSuccess={refreshPosts} onFavSuccess={refreshPosts} onEditSuccess={refreshPosts} />)}
    </div>
}

export default Posts