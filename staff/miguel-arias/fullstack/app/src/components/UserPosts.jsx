import { useEffect, useState } from "react"
import Post from "./Post"
import { useParams } from 'react-router-dom'
import { useContext } from '../hooks'

function UserPosts(props) {
    const params = useParams()
    console.log(`${params.userId} Posts`)

    const context = useContext()

    const [posts, setPosts] = useState([])

    const refreshPosts = () => {
        try {
            props.loadPosts(params.userId, (error, posts) => {
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
        {posts.map(post => <Post key={post.id} post={post} onLikeSuccess={refreshPosts} onDeleteSuccess={refreshPosts} onFavSuccess={refreshPosts} onEditSuccess={refreshPosts} onCommentSuccess={refreshPosts} onCommentDeletion={refreshPosts}/>)}
    </div>
}

export default UserPosts