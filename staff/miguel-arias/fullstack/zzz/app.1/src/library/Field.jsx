import Label = require ("./Label"
import Input = require ("./Input"

function Field(props) {
    return <>
        <Label forId={props.id}>{props.children}</Label>
        <Input id={props.id} type={props.type || "text"} placeholder={props.placeholder || ""} />
    </>
}

module.export = Field