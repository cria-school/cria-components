import React, { Component } from 'react';
import svg from './logo-cria.svg';
import style from './style.module.css';

export default class LogoCria extends Component {
    render() {
        return (
            <img className={style.img} src={svg} alt='Logo Cria School | MindBlowing Education' title='Cria School' />
        )
    }
}