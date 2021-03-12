import React        from 'react'
import { connect }  from 'react-redux'

import InputText    from '../input-text'
import InputEmail   from '../input-email'
import InputAgree   from '../input-agree'
import InputCPF     from '../input-cpf'
import InputPhone   from '../input-phone'
import Button       from '../button-call-to-action'

import { checkout_actions, activeCampaignRegisterCustomer, activeCampaignConversionEvent } from '../_store'

const mapStateToProps = (state) => {
    const { name, lastName, email, document, phone, agree_with_terms_and_privacy, events} = state.checkout
    return { name, lastName, email, document, phone, agree_with_terms_and_privacy, events}
}

const mapDispatchToProps = (dispatchEvent) => {
    
    const { setName, setLastName, setEmail, setDocument, setPhone, setAgree } = checkout_actions
    
    return { 
        setName:            (args) => dispatchEvent(setName(args)), 
        setLastName:        (args) => dispatchEvent(setLastName(args)), 
        setEmail:           (args) => dispatchEvent(setEmail(args)), 
        setDocument:        (args) => dispatchEvent(setDocument(args)), 
        setPhone:           (args) => dispatchEvent(setPhone(args)), 
        setAgree:           (args) => dispatchEvent(setAgree(args)),

        activeCampaignConversionEvent: (args) => dispatchEvent(activeCampaignConversionEvent(args)),
        activeCampaignRegisterCustomer: (args) => dispatchEvent(activeCampaignRegisterCustomer(args))
    }
}

const Form = ({ onSubmit, name, setName, lastName, setLastName, email, setEmail, document, setDocument, phone, setPhone, agree_with_terms_and_privacy, setAgree, events, activeCampaignConversionEvent, activeCampaignRegisterCustomer }) => {
    
    const handleSubmit = (e) => {

        e.preventDefault()
        
        const registration = activeCampaignRegisterCustomer({
            firstName: name,
            lastName,
            phone,
            email
        })

        const conversion = activeCampaignConversionEvent({
            event: events.signup,
            email
        })

        Promise.all([registration, conversion]).then(() => onSubmit())
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Nome
                <InputText value={name} onChange={setName} required={true} />
            </label>
            <label>
                Sobrenome
                <InputText value={lastName} onChange={setLastName} required={true} />
            </label>
            <label>
                E-mail
                <InputEmail value={email} onChange={setEmail} required={true} />
            </label>
            <label>
                CPF
                <InputCPF value={document} onChange={setDocument} required={true} />
            </label>
            <label>
                Telefone
                <InputPhone value={phone} onChange={setPhone} required={true} />
            </label>
            <label>
                <InputAgree checked={agree_with_terms_and_privacy} onChange={setAgree} required={true} /> Concordo com a <a target="_blank" rel="noopener noreferrer" title="Política de Privacidade | Cria School" href="https://cria.school/politica-de-privacidade">Política de Privacidade</a> e com os <a target="_blank" rel="noopener noreferrer" title="Termos de Uso | Cria School" href="https://cria.school/termos-de-uso">Termos de Uso</a>.
            </label>
            <Button type="submit">Continuar</Button>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)