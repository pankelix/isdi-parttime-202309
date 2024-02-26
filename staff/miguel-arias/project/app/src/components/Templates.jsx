import { useContext } from '../hooks'
import { useState, useEffect } from 'react'
import { Template } from '../components'
import { Container, Button } from '../library'

function Templates(props) {

    const [templates, setTemplates] = useState([])

    const context = useContext()

    const refreshTemplates = async () => {
        try {
            const templates = await props.loadTemplates()

            setTemplates(templates)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Templates effect')

        refreshTemplates()
    }, [props.stamp])


    return <Container>
        <h1>Templates</h1>

        <Button>Filter</Button>

        {templates.map(template => <Template key={template._id} template={template} role={props.role} />)}

        <Container>
            <Button>
                ➕
            </Button>
        </Container>
    </Container>
}

export default Templates