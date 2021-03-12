import React        from 'react'
import { Provider } from 'react-redux'

import store from './_store'

import MultiStep    from './multi-step-form'

export default (props) => (
    <Provider store={store}>
        <MultiStep checkoutProps={props}/>
    </Provider>
)