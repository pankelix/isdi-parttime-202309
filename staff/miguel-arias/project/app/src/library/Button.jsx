function Button({className, onClick, type, children, style, name, value}) {
    return <button name={name} value={value} style={style} className={`button ${className ? className : ''}`} onClick={onClick} type={type}>{children}</button>
}

export default Button