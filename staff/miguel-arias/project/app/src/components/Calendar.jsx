import { useNavigate } from 'react-router-dom'

import { format, addDay } from '@formkit/tempo'

import session from '../logic/session'
import logic from '../logic'
import helpers from '../logic/helpers'

import { useContext } from '../hooks'

import { useState, useEffect } from 'react'
import { Container, Button, Form, Input, Label } from '../library'

import { Task, Template } from '../components'

function Calendar(props) {
    console.log('Calendar')

    const context = useContext()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState(null)
    const [reversed, setReversed] = useState(false)
    const [today, setToday] = useState(null)
    const [task, setTask] = useState(null)
    const [profiles, setProfiles] = useState([])
    const [templates, setTemplates] = useState([])
    const [view, setView] = useState(null)

    const retrieveAssignee = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            setProfiles(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    const refreshTemplates = async () => {
        try {
            const templates = await logic.retrieveTemplates()

            setTemplates(templates)
        } catch (error) {
            context.handleError(error)
        }
    }

    const refreshToday = () => {
        setToday(new Date().toISOString().split('T')[0])
    }

    const refreshTasks = async () => {
        try {
            const tasks = await logic.retrieveTasks()
            const tasks2 = []
            for (let i = 0; i < tasks.length - 1; i++) {
                const startDate = new Date(tasks[i].date)
                const endDate = new Date(tasks[i + 1].date)
                const msDifference = endDate - startDate
                const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24))

                tasks2.push(tasks[i])
                for (let j = 0; j < daysDifference - 1; j++) {
                    tasks2.push({ date: format(addDay(tasks[i].date, j + 1), 'YYYY-MM-DD').slice(5).replace('-', ' ') })
                    /* const originalDate = tasks[i].date
                    const objectDate = new Date(originalDate)
                    objectDate.setDate(objectDate.getDate() + j)
                    const newDate = objectDate.toISOString().split('T')[0]
                    tasks2.push({ date: newDate }) */
                }
            }
            tasks2.push(tasks[tasks.length - 1])
            // crear array tasks2 y le inyecto las tareas y nulos donde no haya tareas y guardo en setTasks el tasks2
            setTasks(tasks2)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Tasks/Profiles effect')

        refreshToday()
        retrieveAssignee()
        refreshTasks()
        refreshTemplates()
    }, [props.stamp])

    const handleOnTaskClick = (task) => {
        setTask(task)
        setView('react-to-task-view')
    }

    const handleCancelClick = () => {
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

    const handleAssignThisTaskTo = () => {
        setView('assign-task-view')
    }

    const handleAssignThisTask = async (profileId) => {
        try {
            await logic.assignTask(task.id, profileId)
            refreshTasks()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleDelayTaskClick = () => {
        setView('delay-task-view')
    }

    const handleDelaySubmit = async (event) => {
        event.preventDefault()
        const date = event.target.delayDate.value
        try {
            await logic.delayTask(task.id, date)
            refreshTasks()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleDeleteClick = async () => {
        if (confirm('Are you sure you want to delete this task?'))
            try {
                await logic.deleteTask(task.id)
                refreshTasks()
                setView(null)
            } catch (error) {
                context.handleError(error)
            }
    }

    const handleCompleteTaskClick = () => {
        setView('pin-code-view')
    }

    const handleCompleteSubmit = async (event) => {
        event.preventDefault()
        const date = event.target.completionDate.value

        let digit1 = event.target.digit1.value
        let digit2 = event.target.digit2.value
        let digit3 = event.target.digit3.value
        let digit4 = event.target.digit4.value

        let pincode = digit1 + digit2 + digit3 + digit4

        try {
            await logic.completeTask(task.id, pincode, date)
            refreshTasks()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleFilterClick = () => {
        setView('filter-view')
    }

    const handleAscendTasksClick = () => {
        if (reversed === false) {
            const reversedTasks = [...tasks].reverse()
            setTasks(reversedTasks)
            setReversed(true)
        }
    }

    const handleDescendTasksClick = () => {
        if (reversed === true) {
            const reversedTasks = [...tasks].reverse()
            setTasks(reversedTasks)
            setReversed(false)
        }
    }

    /* const handleFilterByRoomClick = () => {
        setFilter('room')
        refreshTasks()
    } */

    /* const handleFilterByRoom = async (templateId) => {
        try {
            const tasks = await logic.retrieveTasksByRoom(templateId)
            setTasks(tasks)
            setView(null)
            setFilter(null)
        } catch (error) {
            context.handleError(error)
        }
    } */

    /* const handleFilterByAssigneeClick = () => {
        setFilter('assignee')
        refreshTasks()
    } */

    /* const handleFilterByAssignee = async (profileId) => {
        try {
            const tasks = await logic.retrieveTasksByAssignee(profileId)
            setTasks(tasks)
            setView(null)
            setFilter(null)
        } catch (error) {
            context.handleError(error)
        }
    } */

    const handleRestartFilters = () => {
        setView(null)
        setFilter(null)
        refreshTasks()
    }

    return <Container>
        <h1>Tasks</h1>

        <Button onClick={handleFilterClick}>Filter</Button>
        <Button onClick={handleRestartFilters}>Restart filters</Button>

        {view === 'filter-view' && <Container>
            <Button onClick={handleAscendTasksClick}>🔼</Button>
            <Button onClick={handleDescendTasksClick}>🔽</Button>
            <Button /* onClick={handleFilterByRoomClick} */>By Room</Button>
            <Button /* onClick={handleFilterByAssigneeClick} */>By Assignee</Button>
        </Container>}

        {/* {filter === 'room' && templates.map(template => template.rooms.map(room => <Container><Button key={room.id} onClick={() => handleFilterByRoom(template.id)}>{helpers.arrangeText(room.name)}</Button></Container>))} */}

        {/* {filter === 'assignee' && profiles.map(profile => <Container><Button key={profile.id} onClick={() => handleFilterByAssignee(profile.id)}>{helpers.arrangeText(profile.name)}</Button></Container>)} */}

        {tasks.map(task => task.id ? <Task key={task.id} task={task} profile={profiles.find(profile => task.assignee === profile.id)} profileName={profiles.map(profile => task.assignee === profile.id ? profile.name : '')} onTaskClick={handleOnTaskClick} /> : <Button key={task.date}>{task.date}</Button>)}

        {view === 'react-to-task-view' && <Container>
            {session.profileRole === 'admin' && <h3>{helpers.arrangeText(task.template.name)}</h3>}
            {session.profileRole === 'admin' && <h3>{helpers.arrangeDate(task.date)}</h3>}
            {session.profileRole === 'admin' && <h3>{profiles.map(profile => profile.id === task.assignee ? profile.name : '')}</h3>}
            {session.profileRole !== null && <Button onClick={() => handleAssignThisTask(null)}>Take this task</Button>}
            {session.profileRole === 'admin' && <Button onClick={handleAssignThisTaskTo}>Assign this task to...</Button>}
            {session.profileRole !== null && <Button onClick={handleCompleteTaskClick}>Complete this task</Button>}
            {session.profileRole !== null && <Button onClick={handleDelayTaskClick}>Delay this task</Button>}
            {session.profileRole === 'admin' && <Button onClick={handleDeleteClick}>Delete this task</Button>}
            {session.profileRole !== null && <Button onClick={handleCancelClick}>Cancel</Button>}
        </Container>}

        {view === 'assign-task-view' && <Container>
            {profiles.map(profile => <Button key={profile.id} onClick={() => handleAssignThisTask(profile.id)}>{profile.name}</Button>)}
        </Container>}

        {view === 'pin-code-view' && <Container>
            <Form onSubmit={handleCompleteSubmit}>
                <Label for='completionDate'>Completion date</Label>
                <Input max={today} id='completionDate' type={'date'} required={true}></Input>
                <p>Pin Code</p>
                <Input id='digit1' placeholder='-'></Input>
                <Input id='digit2' placeholder='-'></Input>
                <Input id='digit3' placeholder='-'></Input>
                <Input id='digit4' placeholder='-'></Input>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>}

        {view === 'delay-task-view' && <Container>
            <Form onSubmit={handleDelaySubmit}>
                <Input id='delayDate' type={'date'} required={true}></Input>
                <Button type='submit' value={task}>Delay</Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}

        {view === 'new-task-view' && <Container>
            <Button onClick={handleNewTaskClick}>Create new task</Button>
            <Button onClick={handleProposeTaskClick}>Propose task</Button>
        </Container>}

        {view === 'propose-task' && <Container>
            <Form onSubmit={handleProposeTaskSubmit}>
                <Input id='date' type={'date'} required={true}></Input>
                {templates.map(template => <Button key={template.id} name='template' type='submit' value={template.id}>
                    <Template template={template} />
                </Button>)}
                {<Button onClick={handleCancelClick}>Cancel</Button>}
            </Form>
        </Container>}

        <Container>
            <Button onClick={handleNewProposalClick}>
                ➕
            </Button>
        </Container>
    </Container >
}

export default Calendar