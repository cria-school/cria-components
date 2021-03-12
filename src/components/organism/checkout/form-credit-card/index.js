import React, { useState } from 'react' 
import { connect } from 'react-redux'

import InputText from '../input-text'

import { checkout_actions, submitOrder } from '../../checkout/_store'

const mapStateToProps = (state) => ({
    ...state.checkout
})

const mapDispatchToProps = (dispatchEvent) => ({
    submitOrder:     (args) => dispatchEvent(submitOrder(args)),
    setCreditCard_1: (args) => dispatchEvent(checkout_actions.setCreditCard_1(args)),
    setCreditCard_2: (args) => dispatchEvent(checkout_actions.setCreditCard_2(args))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    
    const [ second_card, setSecond_card ] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(props.onSubmit) props.onSubmit()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Número
                <InputText pattern="[0-9]" value={props.credit_card[0].number} onChange={(value) => { props.setCreditCard_1({ number: value })}} />
            </label>
            <label>
                Nome
                <InputText pattern="[a-z A-Z]" value={props.credit_card[0].holder_name} onChange={(value) => { props.setCreditCard_1({ holder_name: value })}} />
            </label>
            <label>
                Validade
                <InputText pattern="([0]?[1-9]|[1][0-2]){0,1}/?[0-9]" value={props.credit_card[0].expire_date} onChange={(value) => { props.setCreditCard_1({ expire_date: value })}} />
            </label>
            <label>
                CVV
                <InputText value="[0-9]" value={props.credit_card[0].cvv} onChange={(value) => { props.setCreditCard_1({ cvv: value })}} />
            </label>
        </form>
    )
})