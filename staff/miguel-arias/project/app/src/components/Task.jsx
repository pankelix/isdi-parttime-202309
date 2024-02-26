import logic from '../logic'
import { Button, Container } from '../library'

import { useContext } from '../hooks'

function Task(props) {
    const task = props.task
    const assigneeName = props.profileName

    const context = useContext()

    const arrangeText = (text) => {
        let capital = text[0].toUpperCase()
        let newText = capital + text.slice(1)
        return newText.replace("-", " ")
    }

    const arrangeDate = (date) => {
        let month = date.slice(5, 7)
        let day = date.slice(8, 10)
        return `${day} ${month}`
    }

    return <Container>
        <Button>
            {arrangeText(task.template.name)}
            {arrangeDate(task.date)}
            {assigneeName}
        </Button>
    </Container>
}

export default Task