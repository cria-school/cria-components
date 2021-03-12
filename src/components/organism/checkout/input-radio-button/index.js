import React, { createRef } from 'react'

export default (props) => {
    const input = createRef()

    const handleOnClick = () => {
        const inputElement = input.current;
        inputElement.click()
    }

    return (
        <div>
            <button onClick={handleOnClick}>{props.children}</button>
            <input checked={props.checked} onChange={props.onChange} ref={input} name={props.name} type="radio" />
        </div>
    )
}