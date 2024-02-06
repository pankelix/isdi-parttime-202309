import { Container, Form, Field, Button } from "../library/index"
import logic from "../logic"

import { useContext } from "../hooks"

function NewPost(props) {
    console.log('NewPost')

    const context = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            logic.publishPost(image, text, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onSuccess()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleCancel(event) {
        event.preventDefault()

        props.onCancel()
    }

    return <Container className="new-post-view">
        <h2>New post</h2>

        <Form onSubmit={handleSubmit}>
            <Field id="image" type="url">Image</Field>
            <Field id="text">Text</Field>

            <Button type="submit">Post</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
    </Container>
}

export default NewPost