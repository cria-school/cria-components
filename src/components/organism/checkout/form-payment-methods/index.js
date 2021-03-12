import React from 'react'
import { connect } from 'react-redux'

import InputOptionButton from '../input-radio-button'

import { checkout_actions } from '../_store'

const mapStateToProps = (state) => ({
    ...state.checkout
})

const mapDispatchToProps = (dispatchEvent) => ({
    setPaymentMethod: (args) => dispatchEvent(checkout_actions.setPaymentMethod(args))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        if(props.onSubmit) props.onSubmit()
    }
    return(
        <form onSubmit={handleSubmit}>
            <InputOptionButton onChange={(checked) => { if(checked) props.setPaymentMethod("credit_card") }} name="payment_method" value="credit_card" checked={props.payment_method === "credit_card"}>Cartão de Crédito</InputOptionButton>
            <InputOptionButton onChange={(checked) => { if(checked) props.setPaymentMethod("boleto") }} name="payment_method" value="boleto" checked={props.payment_method === "boleto"}>Boleto</InputOptionButton>
        </form>
    )
})