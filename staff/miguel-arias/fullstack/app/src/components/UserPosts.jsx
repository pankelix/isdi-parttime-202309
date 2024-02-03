import { Container } from '../library'
import { useParams } from 'react-router-dom'

function UserPosts() {
    const params = useParams()
    return <Container>
        <h1>TODO show user posts from {params.userId}</h1>
    </Container>
}

export default UserPosts