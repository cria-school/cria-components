import React, { PureComponent } from 'react'

import style from './style.module.css'

export default class Input extends PureComponent {
    onChange = (e) => {
        if (typeof this.props.onChange === 'function') this.props.onChange(e)
    }

    onKeyUp = (e) => {
        if (typeof this.props.onKeyUp === 'function') this.props.onKeyUp(e)
    }

    onKeyPress = (e) => {
        if (typeof this.props.onKeyPress === 'function') this.props.onKeyPress(e)
    }

    render() {
        return (
            <input
                type        = {this.props.type || "text"}
                name        = {this.props.name}
                value       = {this.props.value}
                placeholder = {this.props.placeholder || ""}
                className   = {`${this.props.className} ${style.input}`}
                onChange    = {this.onChange}
                onKeyUp     = {this.onKeyUp}
                onKeyPress  = {this.onKeyPress}
                pattern     = {this.props.pattern}
                maxLength   = {this.props.maxLength}
                required    = {this.props.required || false}
                disabled    = {this.props.disabled || false}
                style = {this.props.style}
            />
        )
    }
}
