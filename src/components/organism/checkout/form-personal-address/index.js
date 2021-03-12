import React from 'react'
import { connect } from 'react-redux'

import InputText from '../input-text'
import Button  from '../button-call-to-action'

import { checkout_actions } from '../_store'

const mapStateToProps = (state) => ({ ...state.checkout })

const mapDispatchToProps = (dispatchEvent) => ({
    setPersonalAddress: (params) => dispatchEvent(checkout_actions.setPersonalAddress(params))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        return props.onSubmit()
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>
                CEP
                <InputText onChange={(value) => props.setPersonalAddress({ zipcode: value }) } value={props.personal_address.zipcode} required={true} />
            </label>
            <label>
                Rua
                <InputText onChange={(value) => props.setPersonalAddress({ street: value }) } value={props.personal_address.street} required={true} />
            </label>
            <label>
                Número
                <InputText onChange={(value) => props.setPersonalAddress({ number: value }) } value={props.personal_address.number} required={true} />
            </label>
            <label>
                Complemento
                <InputText onChange={(value) => props.setPersonalAddress({ complement: value }) } value={props.personal_address.complement} required={true} />
            </label>
            <label>
                Bairro
                <InputText onChange={(value) => props.setPersonalAddress({ neighborhood: value }) } value={props.personal_address.neighborhood} required={true} />
            </label>
            <label>
                Cidade
                <InputText onChange={(value) => props.setPersonalAddress({ city: value }) } value={props.personal_address.city} required={true} />
            </label>
            <label>
                UF
                <InputText onChange={(value) => props.setPersonalAddress({ uf: value }) } value={props.personal_address.uf} required={true} />
            </label>
            <Button type="submit">Continuar</Button>
        </form>
    )
})