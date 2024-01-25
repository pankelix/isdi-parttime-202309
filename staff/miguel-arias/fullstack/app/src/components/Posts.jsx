import { useEffect, useState } from "react"
import Post from "./Post"

function Posts({ loadPosts, stamp }) {
    console.log('Posts')

    const [posts, setPosts] = useState([])

    const refreshPosts = () => {
        try {
            loadPosts((error, posts) => {
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
    }

    useEffect(() => {
        console.log('Posts effect')

        refreshPosts()
    }, [stamp])

    return <div className="posts">
        {posts.map(post => <Post key={post.id} post={post} onLikeSuccess={refreshPosts} onDeleteSuccess={refreshPosts} onFavSuccess={refreshPosts} onEditSuccess={refreshPosts} />)}
    </div>
}

export default Posts