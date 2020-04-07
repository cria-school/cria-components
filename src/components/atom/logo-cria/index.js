import React, { Component } from 'react'

import Cria from './logoParts/Cria'
import TagLine from './logoParts/TagLine'
import SchoolBottom from './logoParts/SchoolBottom'
import SchoolSide from './logoParts/SchoolSide'

import style from './style.module.css'

export default class LogoCria extends Component {
    constructor(props){
        super(props)
        this.state = {
            version : props.version || "mini"
        }
    }
    render() {
        
        const { state } = this
        
        const COMPLETA = (state.version === "completa") || false
        const HORIZONTAL = (state.version === "horizontal") || false
        const VERTICAL = (state.version === "vertical") || false

        return (
            <figure className={`${style.figure} ${style[state.version]}`}>
                <Cria className={style.cria}/> {(COMPLETA || HORIZONTAL) && <SchoolSide className={style.schoolSide}/>}
                {(COMPLETA) && <TagLine className={style.tagLine}/>}
                {(VERTICAL) && <SchoolBottom className={style.schoolBottom}/>}
            </figure>
        )
    }
}