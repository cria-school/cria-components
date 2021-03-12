import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { CriaProductsAdapter } from '../../api-adapters'

const APIKey    = "72e2a68accf05e426eeada6656ca978b306db57d1dcc5ed6aaab73ac7760e371801b5d02ee86a696cd84e10cc92ad747a7da6482db4218bc3d147650f72f73e5"
const APIBase   = "https://cria-products-server-test-4jl524vdfa-ue.a.run.app"
const productID = "395e44768896183b369319053b0b0b35"

const CriaProducts = new CriaProductsAdapter({ 
    APIKey, 
    APIBase,
    productID
})

const namespace = "checkout"

const activeCampaignConversionEvent = createAsyncThunk(
    `${namespace}/activeCampaignConversionEvent`, 
    async(data) => {
        const response = await CriaProducts.conversionEvent(data)
        return response.data
    }
)

const activeCampaignRegisterCustomer = createAsyncThunk(
    `${namespace}/activeCampaignRegisterCustomer`,
    async(data) => {
        const response = await CriaProducts.registerCustomer(data)
        return response.data
    }
)

const validateCoupon = createAsyncThunk(
    `${namespace}/validateCoupon`,
    async (couponCode, thunkAPI) => {
        const state = thunkAPI.getState()

        const response = await CriaProducts.validateCoupon({
            couponCode,
            userInfo: {
                email: state.checkout.email,
                document: state.checkout.document.number
            }
        })
        
        return response.data
    }
)

const submitOrder = createAsyncThunk(
    `${namespace}/submitOrder`,
    async(data, thunkAPI) => {
        
        const state = thunkAPI.getState()
        
        const { name, lastName, email, phone, document, billing_address, payment_method, coupon } = state.checkout
        const country = 'br'
        const type = "individual"
        const appliedCoupons = Boolean(coupon.discount) ? [ coupon.code ] : []
        
        const billingAddress = {
            zipcode: billing_address.zipcode,
            street: billing_address.street,
            street_number: billing_address.number,
            complementary: billing_address.complement,
            neighborhood: billing_address.neighborhood,
            city: billing_address.city,
            state: billing_address.uf
        }
        
        const response = await CriaProducts.submitOrder({ 
            name: `${name} ${lastName}`, 
            email, 
            phone, 
            documents: [ document ],
            billingAddress, 
            payment_method, 
            coupon,
            country,
            appliedCoupons,
            type
        })

        return response.data
    }
)

const getProductInfo = createAsyncThunk(
    `${namespace}/getProductInfo`, 
    async(id, thunkAPI) => {
        if(!id) id = productID
        const response = await CriaProducts.getProduct(id)

        return response.data
    }
)

const checkout = createSlice({
    name: namespace,
    initialState: {
        name: "Nathan",
        lastName: "Miranda",
        email: "nathan@adventures.inc",
        document: {
            type: "cpf",
            number: "15097309740"
        },
        phone: "+5521995648795",
        agree_with_terms_and_privacy: true,
        personal_address: {
            zipcode: "20541-148",
            street: "Rua Uruguai",
            number: "98",
            complement: "502",
            neighborhood: "Andaraí",
            city: "Rio de Janeiro",
            uf: "RJ",
        },
        billing_address: {
            zipcode: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "Andaraí",
            city: "",
            uf: "",
        },
        payment_method: "",
        coupon: {
            code: "",
            discount: 0
        },
        credit_card: [{
            number: "",
            holder_name: "",
            expire_date: "",
            cvv: "",
            installments: 1
        },{
            number: "",
            holder_name: "",
            expire_date: "",
            cvv: "",
            installments: 1
        }],
        events: {
            signup: 'cadastrou-formacao-em-estrategia-digital',
            purchase: 'comprou-formacao-em-estrategia-digital'
        },
        transaction_status: "idle",
        boleto_url: "",
        product: {},
        critical_error: false
    },
    reducers: {
        setName :           (state, action) => { state.name                         = action.payload },
        setLastName :       (state, action) => { state.lastName                     = action.payload },
        setEmail :          (state, action) => { state.email                        = action.payload },
        setDocument :       (state, action) => { state.document                     = { ...state.document, ...action.payload }},
        setPhone :          (state, action) => { state.phone                        = action.payload },
        setAgree:           (state, action) => { state.agree_with_terms_and_privacy = action.payload },
        setPersonalAddress: (state, action) => { state.personal_address             = { ...state.personal_address, ...action.payload }},
        setBillingAddress:  (state, action) => { state.billing_address              = { ...state.billing_address, ...action.payload }},
        setPaymentMethod:   (state, action) => { state.payment_method               = action.payload },
        setCoupon:          (state, action) => { state.coupon                       = { ...state.coupon, ...action.payload }},
        setCreditCard_1:    (state, action) => { state.credit_card[0]               = { ...state.credit_card[0], ...action.payload }},
        setCreditCard_2:    (state, action) => { state.credit_card[1]               = { ...state.credit_card[1], ...action.payload }},
        setTransactionStatus: (state, action) => { state.transaction_status         = action.payload }
    },
    extraReducers: { 
        [activeCampaignConversionEvent.fulfilled]: (state, action) => {
        },
        [activeCampaignConversionEvent.pending]: (state, action) => {
        },
        [activeCampaignConversionEvent.rejected]: (state, action) => {
        },
        [activeCampaignRegisterCustomer.fulfilled]: (state, action) => {
        },
        [activeCampaignRegisterCustomer.pending]: (state, action) => {
        },
        [activeCampaignRegisterCustomer.rejected]: (state, action) => {
        },
        [validateCoupon.fulfilled]: (state, action) => {
            const { code, discount } = action.payload
            state.coupon = { code, discount }
        },
        [validateCoupon.pending]: (state, action) => {
            console.log("validateCoupon pending", action)
        },
        [validateCoupon.rejected]: (state, action) => {
            console.log("validateCoupon rejected", action)
        },
        [submitOrder.fulfilled]: (state, action) => {
            const response = action.payload
            console.log("submitOrder fulfilled", response)
            
            state.transaction_status = response.status
            
            if(state.payment_method === "boleto") {
                state.boleto_url = response.transactions[0].boleto_url
            }
        },
        [submitOrder.pending]: (state, action) => {
            console.log("submitOrder pending", action)
        },
        [submitOrder.rejected]: (state, action) => {
            console.log("submitOrder rejected", action)
            state.transaction_status = action.payload.status
        },
        [getProductInfo.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.product = action.payload
        },
        [getProductInfo.pending]: (state, action) => {
            console.log("getProductInfo pending")
        },
        [getProductInfo.rejected]: (state, action) => {
            console.log("getProductInfo rejected", action)
            state.critical_error = new Error(`Couldn't get product info: ${action.error.message}`).toString()
        }
    }
})

const checkout_actions = { ...checkout.actions }

const reducers      = { checkout : checkout.reducer }
const rootReducer   = combineReducers(reducers)
const store         = configureStore({ reducer: rootReducer })


export { 
    checkout_actions, 
    activeCampaignRegisterCustomer,
    activeCampaignConversionEvent,
    validateCoupon,
    submitOrder,
    getProductInfo
}

export default store