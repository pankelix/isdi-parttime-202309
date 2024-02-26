function Button({className, onClick, type, children, style}) {
    return <button style={style} className={`button ${className ? className : ''}`} onClick={onClick} type={type}>{children}</button>
}

export default Button