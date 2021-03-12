import React, { useState } from 'react' 
import { connect } from 'react-redux'

import Button from '../button-call-to-action'
import InputText from '../input-text'

import { validateCoupon } from '../_store'

const mapStateToProps = (state) => ({
    ...state.checkout
})

const mapDispatchToProps = (dispatchEvent) => ({
    validateCoupon: (couponCode) => dispatchEvent(validateCoupon(couponCode))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    
    const [ coupon, setCoupon ] = useState(props.coupon.code)
    const [ error, setError ] = useState()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        Promise.all([props.validateCoupon(coupon)])
            .then((results) => {
                results.forEach(result => {
                    switch(result.type){
                        case "checkout/validateCoupon/rejected":
                            setError(result.error.message)
                            break;
                        case "checkout/validateCoupon/fulfilled":
                            if(props.onSubmit) return props.onSubmit()
                            break;
                        default: return       
                    }
                })
            })
    }

    const onFocus = () => setError(false)

    return(
        <>
            {Boolean(props.coupon.discount) &&
                <div>Você ganhou {props.coupon.discount * 100}% de desconto</div>
            }
            {!Boolean(props.coupon.discount) &&
                <form onSubmit={handleSubmit}>
                    <label>
                        Tem um cupom de desconto?
                        <InputText value={coupon} onFocus={onFocus} onChange={setCoupon} required={true} /> <Button type="submit">Aplicar</Button>
                    </label>
                    {error && <p>{error}</p>}
                </form>
            }
        </>
    )
})