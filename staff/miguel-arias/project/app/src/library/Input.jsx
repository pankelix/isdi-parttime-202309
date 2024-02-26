function Input(props) {
    return <input className="input" type={props.type} id={props.id} required={props.required} placeholder={props.placeholder}/>
}

export default Input