import React, { PureComponent } from 'react'

import style from './style.module.css'

export default class Input extends PureComponent {
    onChange = (e) => {
        if(this.props.onChange)
            return this.props.onChange(e)
    }
    onKeyUp = (e) => {
        if(this.props.onKeyUp)
            return this.props.onKeyUp(e)
    }
    render() {
        return (
            <input 
                type={this.props.type || "text"} 
                name={this.props.type} 
                value={this.props.value}
                placeholder={this.props.placeholder || "placeholder"}
                className={`${this.props.className} ${style.input}`}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
                required={this.props.required || false}
                disabled={this.props.disabled || false}
            />
        )
    }
}
