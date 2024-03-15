import { Button, Container } from '../library'

import { useContext } from '../hooks'

import logic from '../logic'
import helper from '../logic/helpers'

function Task(props) {
    const task = props.task
    const profile = props.profile
    const assigneeName = props.profileName

    const context = useContext()

    const handleTaskClick = () => {
        props.onTaskClick(task)
    }

    return <Container className='relative'>
        <Button className='absolute top-[25%] left-3 text-lg'>{task.date.split('-')[2].split('T')[0]}</Button>

        <Button onClick={handleTaskClick} className=' flex flex-col  justify-center items-center border-2 border-slate-300 p-2 w-[100%] h-[4rem] text-lg'>
            {task.done ? <p>{helper.arrangeText(task.template.name)} (completed)</p> : <p>{helper.arrangeText(task.template.name)}</p>}
            <p>{assigneeName}</p>
            {task.delay ? `Delayed ${task.delay} times` : ''}
        </Button>

        <Button style={{ backgroundColor: task.done === true ? '#3BB14399' : profile ? `${profile.color.code}99` : '' }} className='absolute w-7 h-[4rem] top-[0rem] right-[0rem] text-lg'></Button>
    </Container>
}

export default Task