function Input(props) {
    return <input className="input" accept={props.accept} max={props.max} value={props.value} type={props.type} id={props.id} list={props.list} required={props.required} placeholder={props.placeholder} />
}

export default Input