import React from 'react'
import { connect } from 'react-redux'

import InputText from '../input-text'

import { checkout_actions } from '../_store'

const mapStateToProps = (state) => ({ ...state.checkout })

const mapDispatchToProps = (dispatchEvent) => ({
    setBillingAddress: (params) => dispatchEvent(checkout_actions.setBillingAddress(params))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    return(
        <>
            <label>
                CEP
                <InputText onChange={(value) => props.setBillingAddress({ zipcode: value }) } value={props.billing_address.zipcode} required={true} />
            </label>
            <label>
                Rua
                <InputText onChange={(value) => props.setBillingAddress({ street: value }) } value={props.billing_address.street} required={true} />
            </label>
            <label>
                Número
                <InputText onChange={(value) => props.setBillingAddress({ number: value }) } value={props.billing_address.number} required={true} />
            </label>
            <label>
                Complemento
                <InputText onChange={(value) => props.setBillingAddress({ complement: value }) } value={props.billing_address.complement} required={true} />
            </label>
            <label>
                Bairro
                <InputText onChange={(value) => props.setBillingAddress({ neighborhood: value }) } value={props.billing_address.neighborhood} required={true} />
            </label>
            <label>
                Cidade
                <InputText onChange={(value) => props.setBillingAddress({ city: value }) } value={props.billing_address.city} required={true} />
            </label>
            <label>
                UF
                <InputText onChange={(value) => props.setBillingAddress({ uf: value }) } value={props.billing_address.uf} required={true} />
            </label>
        </>
    )
})