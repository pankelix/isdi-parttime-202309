import { useContext } from '../hooks'
import { useState, useEffect } from 'react'
import { Template } from '../components'
import { Container, Button, Form, Input } from '../library'

import helpers from '../logic/helpers'
import logic from '../logic'

function Templates(props) {

    const [templates, setTemplates] = useState([])
    const [rooms, setRooms] = useState([])
    const [filter, setFilter] = useState(null)
    const [reversed, setReversed] = useState(false)
    const [chosenRooms, setChosenRooms] = useState([])
    const [dayOrWeek, setDayOrWeek] = useState('day')
    const [view, setView] = useState(null)

    const context = useContext()

    const refreshTemplates = async () => {
        try {
            const templates = await logic.retrieveTemplates()

            setTemplates(templates)
        } catch (error) {
            context.handleError(error)
        }
    }

    const refreshRooms = async () => {
        try {
            const rooms = await logic.retrieveRooms()

            setRooms(rooms)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Templates effect')

        refreshTemplates()
        refreshRooms()
    }, [props.stamp])

    const handleNewTemplateView = () => {
        setView('new-template-view')
    }

    const handleNewTemplateClick = async (event) => {
        event.preventDefault()
        const name = event.target.taskName.value
        const periodicityNumber = Number(event.target.periodicityNumber.value)
        const periodicityRange = dayOrWeek
        const rooms = chosenRooms
        const points = Number(event.target.points.value)
        try {
            await logic.createTemplate(name, periodicityNumber, periodicityRange, rooms, points)
            refreshTemplates()
            refreshRooms()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleTaskClick = (roomId) => {
        const chosenRoom = roomId
        chosenRooms.includes(chosenRoom) ?
            setChosenRooms(oldRooms => oldRooms.filter(room => room !== roomId)) :
            setChosenRooms(oldRooms => [...oldRooms, chosenRoom])
    }

    const handleSetDay = () => {
        setDayOrWeek('day')
    }

    const handleSetWeek = () => {
        setDayOrWeek('week')
    }

    const handleCancelClick = () => {
        setView(null)
        setDayOrWeek('day')
        setChosenRooms([])
    }

    const handleFilterClick = () => {
        setView('filter-view')
    }

    const handleAscendTemplatesClick = () => {
        if (reversed === false) {
            const reversedTemplates = [...templates].reverse()
            setTemplates(reversedTemplates)
            setReversed(true)
        }
    }

    const handleDescendTemplatesClick = () => {
        if (reversed === true) {
            const reversedTemplates = [...templates].reverse()
            setTemplates(reversedTemplates)
            setReversed(false)
        }
    }

    const handleFilterByRoomClick = () => {
        setFilter('room')
        refreshTemplates()
    }

    const handleFilterByRoom = (roomId) => {
        const templatesFilteredByRoom = templates.filter((template) => template.rooms.some((room) => room._id === roomId))
        setTemplates(templatesFilteredByRoom)
        setView(null)
        setFilter(null)
    }

    const handleRestartFilters = () => {
        setView(null)
        setFilter(null)
        refreshTemplates()
    }

    return <Container>
        <h1>Templates</h1>

        <Button onClick={handleFilterClick}>Filter</Button>
        <Button onClick={handleRestartFilters}>Restart filters</Button>

        {view === 'filter-view' && <Container>
            <Button onClick={handleAscendTemplatesClick}>🔼</Button>
            <Button onClick={handleDescendTemplatesClick}>🔽</Button>
            <Button onClick={handleFilterByRoomClick}>By Room</Button>

            {filter === 'room' && templates.map(template => template.rooms.map(room => <Button key={room.id} onClick={() => handleFilterByRoom(room._id)}>{helpers.arrangeText(room.name)}</Button>))}

        </Container>}

        {templates.map(template => <Template key={template.id} template={template} rooms={rooms} role={props.role} onDeleteSuccess={refreshTemplates} dayOrWeek={dayOrWeek} onSetDay={handleSetDay} onSetWeek={handleSetWeek} onEditSuccess={refreshTemplates} onRefreshRooms={refreshRooms} chosenRooms={chosenRooms} onChosenRoom={handleTaskClick} onCancelClick={handleCancelClick} />)}

        <Container>
            <Button onClick={handleNewTemplateView}>
                ➕
            </Button>
        </Container>

        {view === 'new-template-view' && <Container>
            <Form onSubmit={handleNewTemplateClick}>
                <Input id='taskName' type='text' required={true} placeholder={'Task name'}></Input>

                <p>It repeats every</p>
                <Input type='number' min='1' id='periodicityNumber' placeholder='Number' required={true}></Input>

                <Button type='button' id='day' onClick={handleSetDay} style={{ backgroundColor: dayOrWeek === 'day' ? 'red' : '' }}>'Days'</Button>

                <Button type='button' id='week' onClick={handleSetWeek} style={{ backgroundColor: dayOrWeek === 'week' ? 'red' : '' }}>'Weeks'</Button>

                <Input id='points' placeholder={'Points (optional)'}>Points(optional)</Input>

                <p>Rooms</p>
                {rooms.map(room => <Button type='button' key={room.id} style={{ backgroundColor: chosenRooms.includes(room.id) ? 'red' : '' }} onClick={() => handleTaskClick(room.id)}>{room.name}</Button>)}

                <Button type='submit'>Create</Button>

                <Button onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}
    </Container>
}

export default Templates