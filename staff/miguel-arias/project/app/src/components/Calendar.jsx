import { useNavigate } from 'react-router-dom'

import { format, addDay, weekStart, weekEnd, dayEnd } from '@formkit/tempo'

import session from '../logic/session'
import logic from '../logic'
import helpers from '../logic/helpers'

import { useContext } from '../hooks'

import { useState, useEffect } from 'react'
import { Container, Button, Form, Input, Label, Field } from '../library'

import { Task, Template } from '.'

function Calendar(props) {
    console.log('Calendar')

    const context = useContext()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [reversed, setReversed] = useState(false)
    const [today, setToday] = useState(null)
    const [buttonDate, setButtonDate] = useState(null)
    const [week, setWeek] = useState(0)
    const [task, setTask] = useState(null)
    const [profiles, setProfiles] = useState([])
    const [chosenTemplate, setChosenTemplate] = useState(null)
    const [templates, setTemplates] = useState([])
    const [onlyMine, setOnlyMine] = useState(false)
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
            let tasks
            if (onlyMine === false)
                tasks = await logic.retrieveTasks(week)
            else if (onlyMine === true)
                tasks = await logic.retrieveProfileTasks(week)

            const tasks2 = []

            const currentDate = addDay(new Date(), week * 7)
            const startOfCurrentWeek = dayEnd(weekStart(currentDate, 1))

            if (tasks.length === 0) {
                for (let j = 0; j < 7; j++) {
                    tasks2.push({ date: format(addDay(startOfCurrentWeek, j), 'DD-MM-YYYY')/* .slice(0, 5).replace('-', ' ') */ })
                }

            } else {
                const firstTaskDate = new Date(tasks[0].date)
                const firstPartOfWeekInms = firstTaskDate - startOfCurrentWeek
                const firstPartOfWeek = Math.ceil(firstPartOfWeekInms / (1000 * 60 * 60 * 24))

                for (let j = 0; j < firstPartOfWeek; j++) {
                    tasks2.push({ date: format(addDay(startOfCurrentWeek, j), 'DD-MM-YYYY')/* .slice(0, 5).replace('-', ' ') */ })
                }

                for (let i = 0; i < tasks.length - 1; i++) {
                    const startDate = new Date(tasks[i].date)
                    const endDate = new Date(tasks[i + 1].date)
                    const msDifference = endDate - startDate
                    const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24))

                    tasks2.push(tasks[i])
                    for (let j = 0; j < daysDifference - 1; j++) {
                        tasks2.push({ date: format(addDay(tasks[i].date, j + 1), 'DD-MM-YYYY')/* .slice(5).replace('-', ' ') */ })
                        /* const originalDate = tasks[i].date
                        const objectDate = new Date(originalDate)
                        objectDate.setDate(objectDate.getDate() + j)
                        const newDate = objectDate.toISOString().split('T')[0]
                        tasks2.push({ date: newDate }) */
                    }
                }
                tasks2.push(tasks[tasks.length - 1])

                const endOfCurrentWeek = dayEnd(weekEnd(currentDate, 1))
                const lastTaskDate = new Date(tasks[tasks.length - 1].date)
                const lastPartOfWeekInms = endOfCurrentWeek - lastTaskDate
                const lastPartOfWeek = Math.ceil(lastPartOfWeekInms / (1000 * 60 * 60 * 24))

                for (let k = 0; k < lastPartOfWeek; k++) {
                    tasks2.push({ date: format(addDay(lastTaskDate, k + 1), 'DD-MM-YYYY')/* .slice(0, 5).replace('-', ' ') */ })
                }
            }
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
    }, [props.stamp, week, onlyMine])

    const handleOnTaskClick = (task) => {
        if (onlyMine === true || task.done === true)
            return

        const dateString = task.date.split('T')[0]
        const dateParts = dateString.split('-')
        const formatDate = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`)
        const finalDate = formatDate.toISOString().split('T')[0]

        setButtonDate(finalDate)

        setTask(task)
        setView('react-to-task-view')
    }

    const handleCancelClick = () => {
        setView(null)
        setButtonDate(null)
        setChosenTemplate(null)
    }

    const handleNewProposalClick = () => {
        setView('new-task-view')
    }

    const handleNewTaskClick = () => {
        navigate('/templates')
    }

    const handleProposeTaskClick = (taskDate) => {
        if (session.profileRole === null)
            return

        if (typeof taskDate === 'string') {
            const dateParts = taskDate.split('-')
            const formatDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
            const finalDate = formatDate.toISOString().split('T')[0]

            setButtonDate(finalDate)
        }

        setView('propose-task')
    }

    const handleProposeTaskSubmit = async (event) => {
        event.preventDefault()
        const date = event.target.date.value
        /* const dateObject = date ? new Date(date) : null */
        try {
            await logic.createTask(chosenTemplate, date ? date : buttonDate)
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
        let materializedTaskId
        if (task.id.includes('_')) {
            try {
                materializedTaskId = await logic.materializeTask(task, profileId)
            } catch (error) {
                context.handleError(error)
            }
        }

        try {
            await logic.assignTask(materializedTaskId ? materializedTaskId : task.id, profileId)
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
        if (confirm("Are you sure you want to delete this task? You'll delete all tasks like this one"))
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

        let materializedTaskId
        if (task.id.includes('_')) {
            try {
                materializedTaskId = await logic.materializeTask(task)
            } catch (error) {
                context.handleError(error)
            }
        }

        const date = event.target.completionDate.value

        let digit1 = event.target.digit1.value
        let digit2 = event.target.digit2.value
        let digit3 = event.target.digit3.value
        let digit4 = event.target.digit4.value

        let pincode = digit1 + digit2 + digit3 + digit4

        try {
            await logic.completeTask(materializedTaskId ? materializedTaskId : task.id, pincode, date)
            refreshTasks()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleArrangeTasksClick = () => {
        const reversedTasks = [...tasks].reverse()
        setTasks(reversedTasks)
        if (reversed === false) {
            setReversed(true)
        } else if (reversed === true)
            setReversed(false)
    }

    const handleShowOnlyMine = () => {
        setOnlyMine(!onlyMine)
    }

    const handleLastWeekClick = () => {
        setWeek(week - 1)
    }

    const handleNextWeekClick = () => {
        setWeek(week + 1)
    }

    return <Container>
        <h1>Calendar</h1>

        <Container>
            <Button onClick={handleArrangeTasksClick}>{reversed ? '🔽' : '🔼'}</Button>
            {session.profileRole !== null && <Label >
                <Input type='checkbox' checked={onlyMine} onChange={handleShowOnlyMine}></Input>
                Mine only
            </Label>}
        </Container>

        {view === 'filter-view' && <Container>
            <Button onClick={handleAscendTasksClick}>🔼</Button>
            <Button onClick={handleDescendTasksClick}>🔽</Button>
        </Container>}

        <Container>
            <Button onClick={handleLastWeekClick}>⏫</Button>

            {tasks.map(task => task.id ? <Task key={task.id} task={task} profile={profiles.find(profile => task.assignee === profile.id)} profileName={profiles.map(profile => task.assignee === profile.id ? profile.name : '')} onTaskClick={handleOnTaskClick} /> : <Button onClick={() => handleProposeTaskClick(task.date)} key={task.date}>{task.date}</Button>)}

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
            {profiles.map(profile => profile.id !== session.profileId ? <Button key={profile.id} onClick={() => handleAssignThisTask(profile.id)}>{profile.name}</Button> : '')}
        </Container>}

        {view === 'pin-code-view' && <Container>
            <Form onSubmit={handleCompleteSubmit}>
                <Label for='completionDate'>Completion date</Label>
                <Input max={today} id='completionDate' type={'date'} required={true}></Input>
                <p>Pin Code</p>
                <Input type='number' min='0' max='9' id='digit1' placeholder='-'></Input>
                <Input type='number' min='0' max='9' id='digit2' placeholder='-'></Input>
                <Input type='number' min='0' max='9' id='digit3' placeholder='-'></Input>
                <Input type='number' min='0' max='9' id='digit4' placeholder='-'></Input>
                <Button type='submit'>Submit</Button>
                <Button type='button' onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}

        {view === 'delay-task-view' && <Container>
            <Form onSubmit={handleDelaySubmit}>
                <Input id='delayDate' defaultValue={buttonDate} type={'date'} required={true}></Input>
                <Button type='submit' value={task}>Delay</Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}

        {view === 'new-task-view' && <Container>
            <Button onClick={handleNewTaskClick}>Create new task</Button>
            {templates.length > 0 ? <Button onClick={handleProposeTaskClick}>Propose task</Button> : ''}
        </Container>}

        {view === 'propose-task' && <Container>
            {templates.length > 0 ? <Form onSubmit={handleProposeTaskSubmit}>
                <Input defaultValue={buttonDate} min={today} id='date' type={'date'} required={true}></Input>

                {templates.map(template => <Button style={{ backgroundColor: chosenTemplate === template.id ? 'red' : '' }} onClick={() => setChosenTemplate(template.id)} key={template.id} name='template' type='button' value={template.id}>
                    {template.name}{template.periodicity}
                </Button>)}

                <Button type='submit'>Submit</Button>

                <Button onClick={handleCancelClick}>Cancel</Button>
            </Form> : <h3>Please click on the + below to create a template</h3>}

        </Container>}

        {session.role !== null && <Container>
            <Button onClick={handleNewProposalClick}>
                ➕
            </Button>
        </Container>}
    </Container >
}

export default Calendar