import React from 'react'

export default ({ checked, onChange, required }) => {

    const handleChange = (e) => onChange(e.target.checked)
    
    return (
        <input checked={checked} required={required || false} onChange={handleChange} type="checkbox" />
    )
}