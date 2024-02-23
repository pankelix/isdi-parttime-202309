import logic from '../logic'

import { useContext } from '../hooks'

import { useState, useEffect } from 'react'
import { Container } from '../library'

import Task from './Task'

function Calendar(props) {
    console.log('Calendar')

    const context = useContext()

    const [tasks, setTasks] = useState([])
    const [profiles, setProfile] = useState([])

    const retrieveAssignee = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            console.log(profiles)
            setProfile(profiles)
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
    }, [props.stamp])

    return <Container>
        <h1>Tasks</h1>
        {tasks.map(task => <Task key={task._id} task={task} profileName={profiles.map(profile => task.assignee === profile._id ? profile.name : '')} />)}
    </Container>
}

export default Calendar