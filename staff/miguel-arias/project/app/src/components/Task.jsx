import { Button, Container } from '../library'

import { useContext } from '../hooks'

import logic from '../logic'
import helper from '../logic/helpers'

function Task(props) {
    const task = props.task
    const profile = props.profile
    const assigneeName = props.profileName

    const context = useContext()

    const handleTaskClick = () => {
        props.onTaskClick(task)
    }

    return <Container>
        <Button style={{ backgroundColor: profile ? profile.color : '' }} onClick={handleTaskClick}>
            {helper.arrangeText(task.template.name)}
            {helper.arrangeDate(task.date)}
            {assigneeName}
        </Button>
    </Container>
}

export default Task