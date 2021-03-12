import React, { useEffect } from 'react'
//import validateCPF from './validateCPF'

export default ({ value, required, onChange }) => {
    
    const { number, type } = value

    const checkDocument = (document) => {
        console.log(document)
        
        const documentNumber = (document.replace(/[\.\-\/]/g,'')).substring(0, 11)
        const documentType = (documentNumber.length > 11) ? 'cnpj' : 'cpf'
        
        //const userType = (documentType === 'cnpj') ? 'corporation' : 'individual'
        //const validDocument = validateCPF(documentNumber)
        
        return ({
            type: documentType,
            number: documentNumber
        })
    }

    const handleOnChange = (e) => {
        const newValue = checkDocument(e.target.value)
        return onChange(newValue)
    }

    return <input required={required || false} value={number} onChange={handleOnChange} type="number" />
}