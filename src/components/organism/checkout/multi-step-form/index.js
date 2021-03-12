import React, { useEffect, useState }  from 'react'
import { connect }          from 'react-redux'

import FormCadastro         from '../form-signup'
import FormAddress          from '../form-personal-address'
import FormPaymentMethod    from '../form-payment-methods'
import FormCoupon           from '../form-coupon'
import FormBoleto           from '../form-boleto'
import FormCreditCard       from '../form-credit-card'
import TransactionStatus    from '../transaction-status'

import { getProductInfo } from '../_store'

import style from './style.module.css'
import './transition.css'

const mapDispatchToProps = (dispatchEvent) => ({
    getProductInfo: () => dispatchEvent(getProductInfo())
})

const mapStateToProps = (state) =>  ({
    ...state.checkout
}) 

export default connect( mapStateToProps, mapDispatchToProps )( props => {

    const [step, setStep] = useState(0)

    //loads product infos into store from api
    useEffect(() => props.getProductInfo(), [])

    const steps = [
        <>
            <FormCadastro onSubmit={() => {
                setStep(step + 1)
            }} />
        </>,
        <>
            <FormAddress onSubmit={() => {
                setStep(step + 1)
            }}/>
        </>,
        <>
            <FormPaymentMethod onSubmit={() => {
                setStep(step + 1)
            }}/>
            <FormCoupon />
        </>,
        <>
            {props.payment_method === "boleto" && 
                <>
                    <FormBoleto onSubmit={() => {
                        setStep(step + 1)
                    }}/>
                    <FormCoupon />
                </>
            }
            {props.payment_method === "credit_card" && 
                <>
                    <FormCreditCard />
                    <FormCoupon />  
                </>
            }
        </>,
        <>
            <TransactionStatus />
        </>
    ]

    const stepsCount = steps.length

    return (
        <aside>
            {!props.critical_error && <>
                {(stepsCount > 1) && 
                    //if there is more than one step, show step bullets
                    <header className={style.header}>
                        {steps.map((child, i) => { 
                            return <div key={i} type="button" className={`${style.header_bullet} ${(i === step) ? style.current : ""}`} />
                        })}
                    </header>
                }
                
                {steps.map((current, index) => {
                    if(step === index){
                        return( 
                            <section key={index}>
                                {current}
                            </section>
                        )
                    }
                    return
                })}
            </>}
            {props.critical_error && <>
                <h3>Houve um erro de crítico de conexão. <br/>Tente novamente em alguns minutos.</h3>
            </>}
        </aside>
    )
})