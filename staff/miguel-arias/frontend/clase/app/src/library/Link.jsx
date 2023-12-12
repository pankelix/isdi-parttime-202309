function Link({className, onClick, children}) {
    return <a className={`link ${className ? className : ''}`} href="" onClick={onClick}>{children}</a>
}

export default Link