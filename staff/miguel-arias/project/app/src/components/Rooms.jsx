import { useEffect, useState } from 'react'
import { useContext } from '../hooks'
import { Button, Container, Input, Form } from '../library'

import logic from '../logic'
import helper from '../logic/helpers'

function Rooms(props) {
    const context = useContext()

    const [rooms, setRooms] = useState([])
    const [view, setView] = useState(null)

    const refreshRooms = async () => {
        try {
            const rooms = await logic.retrieveRooms()
            setRooms(rooms)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Rooms effect')

        refreshRooms()
    }, [props.stamp])

    const handleNewRoomClick = () => {
        setView('new-room-view')
    }

    const handleCancelClick = () => {
        setView(null)
    }

    const handleNewRoomSubmit = async (event) => {
        event.preventDefault()
        const name = event.target.roomName.value
        try {
            await logic.createRoom(name)
            refreshRooms()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleDeleteRoomClick = async (roomId) => {
        if (confirm('Are you sure you want to delete this room?'))
            try {
                await logic.deleteRoom(roomId)
                refreshRooms()
                setView(null)
            } catch (error) {
                context.handleError(error)
            }
    }

    return <Container>
        <h1>Rooms</h1>

        {rooms.map(room => <Container key={room.id}><h5>{helper.arrangeText(room.name)}</h5><Button onClick={() => handleDeleteRoomClick(room.id)}>Delete</Button></Container>)}

        {view === 'new-room-view' && <Container>
            <Form onSubmit={handleNewRoomSubmit}>
                <Input id='roomName' placeholder={'New room name'} required={true}></Input>
                <Button type='submit'>Create</Button>
                <Button type='button' onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}

        <Container>
            <Button onClick={handleNewRoomClick}>
                ➕
            </Button>
        </Container>

    </Container>
}

export default Rooms