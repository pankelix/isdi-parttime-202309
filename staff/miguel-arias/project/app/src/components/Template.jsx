import { useState, useEffect } from 'react'

import { useContext } from '../hooks'

import logic from '../logic'
import helper from '../logic/helpers'
import { Button, Container, Form, Input } from '../library'

function Template(props) {
    const template = props.template
    const rooms = props.rooms
    const context = useContext()

    const [view, setView] = useState()

    const handleDeleteClick = async () => {
        if (confirm('Are you sure you want to delete this template? All tasks related to this will be deleted too'))
            try {
                await logic.deleteTemplate(template.id)
                props.onDeleteSuccess()
            } catch (error) {
                context.handleError(error)
            }
    }

    const handleEditClick = () => {
        setView('edit-click-view')
    }

    const handleTaskClick = (roomId) => {
        props.onChosenRoom(roomId)
    }

    const handleCancelClick = () => {
        setView(null)
        props.onCancelClick()
    }

    const handleEditTemplateClick = async (event) => {
        event.preventDefault()
        const name = event.target.taskName.value
        const periodicityNumber = Number(event.target.periodicityNumber.value)
        const periodicityRange = props.dayOrWeek
        const rooms = props.chosenRooms
        const points = Number(event.target.points.value)
        try {
            await logic.editTemplate(template.id, name, periodicityNumber, periodicityRange, rooms, points)
            props.onEditSuccess()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    return <article>
        <Container>
            <h3>{helper.arrangeText(template.name)}</h3>
            <h4>Points</h4>
            <p>{template.points}</p>
            <h4>Rooms</h4>
            {template.rooms.map(room => room.id === room.id ?  <p>{helper.arrangeText(room.name)}</p> : '')}
            <h4>Periodicity</h4>
            <p>{helper.arrangePeriodicity(template.periodicity)}</p>
        </Container>

        {props.role === 'admin' && <aside>
            <Button onClick={handleEditClick}>Edit task</Button>
            <Button onClick={handleDeleteClick}>Delete template</Button>
        </aside>}

        {view === 'edit-click-view' && <Container>
            <h4>{helper.arrangeText(template.name)}</h4>
            <Form onSubmit={handleEditTemplateClick}>
                <Input id='taskName' type='text' required={true} placeholder={'Task name'}></Input>

                <p>It repeats every</p>
                <Input type='number' min='1' id='periodicityNumber' placeholder='Number' required={true}></Input>

                <Button type='button' id='day' onClick={props.onSetDay} style={{ backgroundColor: props.dayOrWeek === 'day' ? 'red' : '' }}>'Days'</Button>

                <Button type='button' id='week' onClick={props.onSetWeek} style={{ backgroundColor: props.dayOrWeek === 'week' ? 'red' : '' }}>'Weeks'</Button>

                <Input id='points' placeholder={'Points (optional)'}>Points(optional)</Input>

                <p>Rooms</p>
                {props.rooms.map(room => <Button type='button' key={room.id} style={{ backgroundColor: props.chosenRooms.includes(room.id) ? 'red' : '' }} onClick={() => handleTaskClick(room.id)}>{room.name}</Button>)}

                <Button type='submit'>Create</Button>

                <Button onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}
    </article>
}

export default Template