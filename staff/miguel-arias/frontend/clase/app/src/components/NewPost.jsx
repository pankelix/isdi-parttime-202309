import { Container, Form, Field, Button } from "../library/index"
import logic from "../logic"

function NewPost(props) {
    console.log('new-post')

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
                    })
                } catch (error) {
                    alert(error.message)
                }
            })

            props.onSuccess(event)
        } catch (error) {
            alert(error.message)
        }
    }

    function handleCancelNewPostClick(event) {
        event.preventDefault()

        props.onCancel(null)
    }

    return <Container>
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
    </Container>
}

export default NewPost