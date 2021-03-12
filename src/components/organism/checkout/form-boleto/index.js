import React, { useEffect, useState } from 'react' 
import { connect } from 'react-redux'

import InputAgree from '../input-agree'
import Button from '../button-call-to-action'

import FieldsetBillingAddres from '../fieldset-billing-address'

import { checkout_actions, submitOrder } from '../../checkout/_store'

const mapStateToProps = (state) => ({
    ...state.checkout
})

const mapDispatchToProps = (dispatchEvent) => ({
    setBillingAddress: (args) => dispatchEvent(checkout_actions.setBillingAddress(args)),
    submitOrder: (args) => dispatchEvent(submitOrder(args))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    
    const [ checked, setChecked ] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitOrder()
        if(props.onSubmit) props.onSubmit()
    }

    useEffect(() => {
        if(checked){
            props.setBillingAddress({ ...props.personal_address })
        } else {
            props.setBillingAddress({
                cep: "",
                street: "",
                number: "",
                complement: "",
                city: "",
                uf: ""
            })
        }
    }, [checked])

    useEffect(() => { 
        if(checked)
            console.log(props.personal_address)
            props.setBillingAddress({ ...props.personal_address }) 
    }, [])
    
    return(
        <form onSubmit={handleSubmit}>
            <label>
                <h3>Endereço de Cobrança</h3>
                <InputAgree onChange={setChecked} checked={checked}/> Usar o mesmo endereço do aluno?
            </label>
            {!checked && <FieldsetBillingAddres />}
            <Button type="submit">Gerar Boleto</Button>
        </form>
    )
})