import React from 'react'

export default (props) => {
    
    const handleChange = (e) => props.onChange(e.target.value)
    
    return (
        <input {...props} value={props.value} onChange={handleChange} type="text" />
    )
}