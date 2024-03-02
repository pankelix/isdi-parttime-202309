import { Button } from '../library'

import logic from '../logic'
import helper from '../logic/helpers'

function Template(props) {
    const template = props.template

    const handleDeleteClick = async () => {
        try {
            await logic.deleteTemplate(template.id)
        } catch (error) {

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

/*  */

export default Template