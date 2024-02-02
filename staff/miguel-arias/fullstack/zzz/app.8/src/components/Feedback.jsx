import { Container, Button } from "../library"
import './Feedback.sass'

const Feedback = props => {
    return <Container className={`Feedback Feedback--${props.level}`}>
        <p>{props.message}</p>
        <Button onClick={props.onAccepted}>Accept</Button>
    </Container>
}

export default Feedback