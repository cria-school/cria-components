import React from 'react'

export default ({ value, onChange, required }) => {
    
    const handleChange = (e) => onChange(e.target.value)

    return <input value={value} required={required || false} onChange={handleChange} type="tel" pattern="\+[0-9]{2}[0-9]{11}" />
}