import { Container, Form, Field, Button } from "../library/index"
import logic from "../logic"

function NewPost({ onSuccess, onCancel }) {

    const handleSubmit = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            logic.publishPost(image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onSuccess()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
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