import React, { PureComponent } from 'react';

import style from './style.module.css';

export default class Button extends PureComponent {
    
    buttonStyle = this.props.colorSchema ? style[this.props.colorSchema] : style.pink

    render(){
        return(
            <button disabled={this.props.disabled} onClick={this.props.onClick} type={this.props.type || "button"} className={`${style.button} ${this.buttonStyle} ${this.props.className}`}>
                {this.props.children}
            </button>
        )
    }
}