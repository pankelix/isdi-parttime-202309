function Input(props) {
    return <input className="input" value={props.value} type={props.type} id={props.id} required={props.required} placeholder={props.placeholder}/>
}

export default Input