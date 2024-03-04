function Input(props) {
    return <input className="input" max={props.max} value={props.value} type={props.type} id={props.id} list={props.list} required={props.required} placeholder={props.placeholder} />
}

export default Input