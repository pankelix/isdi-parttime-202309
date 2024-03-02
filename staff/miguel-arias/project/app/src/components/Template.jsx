import { Button } from '../library'

import { useContext } from '../hooks'

import logic from '../logic'
import helper from '../logic/helpers'

function Template(props) {
    const template = props.template
    const context = useContext()

    const handleDeleteClick = async () => {
        if (confirm('Are you sure you want to delete this template? All tasks related to this will be deleted too'))
            try {
                await logic.deleteTemplate(template.id)
                props.onDeleteSuccess()
            } catch (error) {
                context.handleError(error)
            }
    }

    return <article>
        <h3>{helper.arrangeText(template.name)}</h3>

        {props.role === 'admin' && <aside>
            <Button>Edit task</Button>
            <Button onClick={handleDeleteClick}>Delete template</Button>
        </aside>}
    </article>
}

export default Template