import { Button } from '../library'

function Template(props) {
    const template = props.template

    const arrangeText = (text) => {
        let capital = text[0].toUpperCase()
        let newText = capital + text.slice(1)
        return newText.replace("-", " ")
    }

    return <article>
        <h3>{arrangeText(template.name)}</h3>

        {props.role === 'admin' && <aside>
            <Button>Edit task</Button>
            <Button>Store task</Button>
            <Button>Delete task</Button>
        </aside>}
    </article>
}

/*  */

export default Template