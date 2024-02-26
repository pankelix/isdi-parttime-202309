import { useContext } from '../hooks'
import { useState, useEffect } from 'react'
import { Template } from '../components'
import { Container } from '../library'

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
        {templates.map(template => <Template key={template._id} template={template} role={props.role}/>)}
    </Container>
}

export default Templates