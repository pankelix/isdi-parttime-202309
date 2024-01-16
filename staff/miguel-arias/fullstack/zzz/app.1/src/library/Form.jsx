function Form(props) {
    return <form className="form" onSubmit={props.onSubmit}>{props.children}</form>
}

module.export = Form