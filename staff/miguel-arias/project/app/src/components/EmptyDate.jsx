import { Button, Container } from '../library'

import { useContext } from '../hooks'

import logic from '../logic'
import helper from '../logic/helpers'

function EmptyDate(props) {
    const task = props.task

    const dateParts = task.date.split('-')
    const formatDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
    const finalDate = formatDate.toISOString().split('T')[0]
    /* const profile = props.profile
    const assigneeName = props.profileName

    const context = useContext()
*/
    const handleTaskClick = (taskDate) => {
        props.onTaskClick(taskDate)
    }

    return <Container className='relative'>
        <Button className='absolute top-[20%] left-3 text-lg'>{task.date.split('-')[0].split('T')[0]}</Button>

        <Button onClick={() => handleTaskClick(task.date)} key={task.date} className='border-2 border-slate-300 p-0 my-2 w-[100%] text-lg'><p style={{ backgroundColor: finalDate < props.today ? '#9fa0a469' : '' }} className='text-slate-400'>No tasks yet</p></Button>
    </Container>
}

export default EmptyDate