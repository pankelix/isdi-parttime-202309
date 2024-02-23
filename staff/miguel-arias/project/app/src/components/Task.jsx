import logic from '../logic'
import { Container } from '../library'

import { useContext } from '../hooks'

function Task(props) {
    const task = props.task
    const assigneeName = props.profileName

    const arrangeText = (text) => {
        let capital = text[0].toUpperCase()
        let newText = capital + text.slice(1)
        return newText.replace("-", " ")
    }

    const arrangeDate = (date) => {
        let month = date.slice(5,7)
        let day = date.slice(8,10)
        return `${day} ${month}`
    }

    return <article>
        <h3>{arrangeText(task.template.name)}</h3><h3>{arrangeDate(task.date)}</h3><h3>{assigneeName}</h3>
    </article>
}

export default Task