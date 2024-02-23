import { Container, Button } from '../library'
import classnames from 'classnames'


const Feedback = props => {
    let modifier = 'Feedback--debug'

    switch (props.level) {
        case 'warn':
            modifier = 'Feedback--warn'
            break
        case 'error':
            modifier = 'Feedback--error'
            break
        case 'fatal':
            modifier = 'Feedback--fatal'
            break
        default:
            modifier = 'Feedback--info'
            break
    }
    return <Container className={`Feedback ${modifier}`}>
        <p>{props.message}</p>
        <Button onClick={props.onAccepted}>Accept</Button>
    </Container>
}

export default Feedback