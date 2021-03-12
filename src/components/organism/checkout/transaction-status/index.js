import React from 'react'
import { connect } from 'react-redux'

import Button from '../button-call-to-action'

const mapStateToProps = (state) => ({
    ...state.checkout
})

export default connect(mapStateToProps)( props => {
    
    const statuses = {
        boleto: {
            waiting_payment: (
                <>
                    <h2>Imprima seu boleto!</h2>
                    <h3>Parabéns</h3>
                    <h4>Seu pedido foi efetuado!</h4>
                    <p>Clique no botão abaixo para visualizar o boleto. Você também o receberá por e-mail.</p>
                    <p><small>Se não receber nosso e-mail em breve, dê uma olhadinha na caixa de spam.</small></p>
                    <a href={props.boleto_url} rel="noopener noreferrer" target="_blank">
                        <Button>Visualizar Boleto</Button>
                    </a>
                </>
            ),
            idle: (
                <>
                    <h2>Gerando boleto...</h2>
                </>
            )
        },
        credit_card: {
            refused: (
                <>
                    <h2>Pagamento Recusado</h2>
                    <p>Infelizmente o seu .</p>
                    <p><small>Se não receber nosso e-mail em breve, dê uma olhadinha na caixa de spam.</small></p>
                    <a href={props.boleto_url} rel="noopener noreferrer" target="_blank">
                        <Button>Visualizar Boleto</Button>
                    </a>
                </>
            ),
            processing: (<p>Processando</p>),
            paid: (<p>Pago</p>)
        }
    }

    const StatusToRender = () => <>{statuses[props.payment_method][props.transaction_status]}</>
    console.log(StatusToRender)

    return <StatusToRender />
})