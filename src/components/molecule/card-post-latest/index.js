import React, { PureComponent } from 'react'

import Img from '../../atom/img'
import Button from '../../atom/button'

import style from './style.module.css'

import placeholder from './placeholder.svg'

export default class CardPostLatest extends PureComponent {
    render() {

        let { picture } = this.props
        picture.placeholder = (picture.placeholder !== undefined) ? picture.src.placeholder : placeholder

        return (
            <a className={style.cardLink} href={this.props.link} title={this.props.title}>
                <article className={style.card}>
                    <Img className={style.picture} src={picture} alt={this.props.title}/>
                    <div className={style.overlay}></div>
                    <div className={style.contentWrapper}>
                        <a className={style.categoryLink} href={this.props.category.href} title={this.props.category.name}>
                            <Button className={style.category} style="purple">{this.props.category.name}</Button>
                        </a>
                        <p className={style.date}>{this.props.date}</p>
                        <h3 className={style.title}>{this.props.title}</h3>
                    </div>
                </article>
            </a>
        )
    }
}
