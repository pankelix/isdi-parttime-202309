import { useNavigate } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../hooks'

import { useState, useEffect } from 'react'
import { Container, Button, Form, Input } from '../library'

import { Task, Template } from '../components'

function Calendar(props) {
    console.log('Calendar')

    const role = props.role

    const context = useContext()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState(null)
    const [profiles, setProfile] = useState([])
    const [templates, setTemplates] = useState([])
    const [view, setView] = useState(null)

    const retrieveAssignee = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            console.log(profiles)
            setProfile(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    const refreshTemplates = async () => {
        try {
            const templates = await props.loadTemplates()

            setTemplates(templates)
        } catch (error) {
            context.handleError(error)
        }
    }

    const refreshTasks = async () => {
        try {
            const tasks = await props.loadTasks()
            setTasks(tasks)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Tasks/Profiles effect')

        retrieveAssignee()
        refreshTasks()
        refreshTemplates()
    }, [props.stamp])

    const openModal = (taskId) => {
        setTask(taskId)
        setView('react-to-task-view')
    }

    const closeModal = () => {
        setView(null)
    }

    const handleNewProposalClick = () => {
        setView('new-task-view')
    }

    const handleNewTaskClick = () => {
        navigate('/templates')
    }

    const handleProposeTaskClick = () => {
        setView('propose-task')
    }

    const handleProposeTaskSubmit = async (event) => {
        event.preventDefault()
        const date = event.target.date.value
        const dateObject = date ? new Date(date) : null

        const templateId = event.nativeEvent.submitter.value
        try {
            await logic.createTask(templateId, dateObject)
            refreshTasks()
        } catch (error) {
            context.handleError(error)
        }
    }

    return <Container>
        <h1>Tasks</h1>

        <Button>Filter</Button>

        {tasks.map(task => <Task key={task._id} task={task} profileName={profiles.map(profile => task.assignee === profile._id ? profile.name : '')} onTaskClick={openModal} />)}

        {view === 'react-to-task-view' && <Container>
            {role !== 'null' && <Button>Assign this task</Button>}
            {role === 'admin' && <Button>Assign this task to...</Button>}
            {role !== 'null' && <Button>Complete this task</Button>}
            {role !== 'null' && <Button>Delay this task</Button>}
            {role === 'admin' && <Button>Edit this task</Button>}
            {role === 'admin' && <Button>Delete this task</Button>}
            {role !== 'null' && <Button onClick={closeModal}>Close</Button>}
        </Container>}

        {view === 'new-task-view' && <Container>
            <Button onClick={handleNewTaskClick}>Create new task</Button>
            <Button onClick={handleProposeTaskClick}>Propose task</Button>
        </Container>}

        {view === 'propose-task' && <Container>
            <Form onSubmit={handleProposeTaskSubmit}>
                <Input id='date' type={'date'} placeholder={'Date'} required={true}></Input>
                {templates.map(template => <Button name='template' type='submit' value={template._id}><Template key={template._id} template={template} role={props.role} /></Button>)}
            </Form>
        </Container>}

        <Container>
            <Button onClick={handleNewProposalClick}>
                ➕
            </Button>
        </Container>
    </Container>
}

export default Calendar