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
            // tasks = await logic.orderTasks(tasks)
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

    const handleOnTaskClick = (taskId) => {
        setTask(taskId)
        setView('react-to-task-view')
    }

    const onCancelClick = () => {
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
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleAssignThisTask = async (taskId, profileId) => {
        try {
            await logic.assignTask(taskId, profileId)
            refreshTasks()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleAssignThisTaskTo = () => {
        setView('assign-task-view')
    }

    const onDelayTaskClick = () => {
        setView('delay-task-view')
    }

    const handleDelaySubmit = async (event) => {
        event.preventDefault()
        const date = event.target.delayDate.value
        const dateObject = date ? new Date(date) : null

        const taskId = event.nativeEvent.submitter.value
        try {
            await logic.delayTask(taskId, dateObject)
            refreshTasks()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }

    }

    return <Container>
        <h1>Tasks</h1>

        <Button>Filter</Button>

        {tasks.map(task => <Task key={task.id} task={task} profileName={profiles.map(profile => task.assignee === profile.id ? profile.name : '')} onTaskClick={handleOnTaskClick} />)}

        {view === 'react-to-task-view' && <Container>
            {role !== null && <Button onClick={() => handleAssignThisTask(task, null)}>Assign this task</Button>}
            {role === 'admin' && <Button onClick={handleAssignThisTaskTo}>Assign this task to...</Button>}
            {role !== null && <Button>Complete this task</Button>}
            {role !== null && <Button onClick={onDelayTaskClick}>Delay this task</Button>}
            {role === 'admin' && <Button>Edit this task</Button>}
            {role === 'admin' && <Button>Delete this task</Button>}
            {role !== null && <Button onClick={onCancelClick}>Cancel</Button>}
        </Container>}

        {view === 'assign-task-view' && <Container>
            {profiles.map(profile => <Button onClick={() => handleAssignThisTask(task, profile.id)}>{profile.name}</Button>)}
        </Container>}

        {view === 'delay-task-view' && <Container>
            <Form onSubmit={handleDelaySubmit}>
                <Input id='delayDate' type={'date'} required={true}></Input>
                <Button type='submit' value={task}>Delay</Button>
                <Button onClick={onCancelClick}>Cancel</Button>
            </Form>
        </Container>}

        {view === 'new-task-view' && <Container>
            <Button onClick={handleNewTaskClick}>Create new task</Button>
            <Button onClick={handleProposeTaskClick}>Propose task</Button>
        </Container>}

        {view === 'propose-task' && <Container>
            <Form onSubmit={handleProposeTaskSubmit}>
                <Input id='date' type={'date'} required={true}></Input>
                {templates.map(template => <Button name='template' type='submit' value={template.id}><Template key={template.id} template={template} /></Button>)}
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