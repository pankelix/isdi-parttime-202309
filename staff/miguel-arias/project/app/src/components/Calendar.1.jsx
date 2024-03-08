import { useNavigate } from 'react-router-dom'

import { format, addDay, weekStart, weekEnd, dayEnd } from '@formkit/tempo'

import session from '../logic/session'
import logic from '../logic'
import helpers from '../logic/helpers'

import { useContext } from '../hooks'

import { useState, useEffect } from 'react'
import { Container, Button, Form, Input, Label } from '../library'

import { Task, Template } from '.'

function Calendar(props) {
    console.log('Calendar')

    const context = useContext()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState(null)
    const [reversed, setReversed] = useState(false)
    const [today, setToday] = useState(null)
    const [week, setWeek] = useState(0)
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
            const tasks = await logic.retrieveTasks(week)
            const tasks2 = []

            const currentDate = addDay(new Date(), week * 7)
            const startOfCurrentWeek = dayEnd(weekStart(currentDate, 1))
            const endOfCurrentWeek = dayEnd(weekEnd(currentDate, 1))

            for (let i = 0; i < 1; i++) {
                const nextTaskDate = new Date(tasks[i].date)
                const firstPartOfWeekInms = nextTaskDate - startOfCurrentWeek
                const firstPartOfWeek = Math.ceil(firstPartOfWeekInms / (1000 * 60 * 60 * 24))
                let firstPartCounted = false
                let secondPartCounted = false

                if (firstPartCounted === false) {
                    for (let j = 0; j < firstPartOfWeek; j++) {
                        tasks2.push({ date: format(addDay(startOfCurrentWeek, j), 'DD-MM-YYYY').slice(0, 5).replace('-', ' ') })
                    }
                    firstPartCounted = true
                }


                for (let k = 0; k < tasks.length - 1; k++) {
                    const startDate = new Date(tasks[i].date)
                    const endDate = new Date(tasks[i + 1].date)
                    const msDifference = endDate - startDate
                    const daysDifference = Math.ceil(msDifference / (1000 * 60 * 60 * 24))

                    tasks2.push(tasks[i + k])
                    if (daysDifference !== 1) {
                        tasks2.push({ date: format(addDay(tasks[i].date, k + 1), 'DD-MM-YYYY').slice(0, 5).replace('-', ' ') })
                        /* const originalDate = tasks[i].date
                        const objectDate = new Date(originalDate)
                        objectDate.setDate(objectDate.getDate() + k)
                        const newDate = objectDate.toISOString().split('T')[0]
                        tasks2.push({ date: newDate }) */
                    }
                    tasks2.push(tasks[i + 1 + k])
                }

                if (secondPartCounted === false) {

                    const lastTaskDate = new Date(tasks[i + 1].date)
                    const lastPartOfWeekInms = endOfCurrentWeek - lastTaskDate
                    const lastPartOfWeek = Math.floor(lastPartOfWeekInms / (1000 * 60 * 60 * 24))

                    for (let l = 0; l < lastPartOfWeek; l++) {
                        tasks2.push({ date: format(addDay(tasks[i + 1].date, l + 1), 'DD-MM-YYYY').slice(0, 5).replace('-', ' ') })
                    }
                    secondPartCounted = true
                }
            }

            /* tasks2.push(tasks[tasks.length - 1]) */
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
    }, [props.stamp, week])

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
        /* const dateObject = date ? new Date(date) : null */

        const templateId = event.nativeEvent.submitter.value
        try {
            await logic.createTask(templateId, date)
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

    const handleLastWeekClick = () => {
        setWeek(week - 1)
    }

    const handleNextWeekClick = () => {
        setWeek(week + 1)
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
        <Container>
            <Button onClick={handleLastWeekClick}>⏫</Button>

            {tasks.map(task => task.id ? <Task key={task.id} task={task} profile={profiles.find(profile => task.assignee === profile.id)} profileName={profiles.map(profile => task.assignee === profile.id ? profile.name : '')} onTaskClick={handleOnTaskClick} /> : <Button key={task.date}>{task.date}</Button>)}

            <Button onClick={handleNextWeekClick}>⏬</Button>
        </Container>

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

        {session.role !== null && <Container>
            <Button onClick={handleNewProposalClick}>
                ➕
            </Button>
        </Container>}
    </Container >
}

export default Calendar