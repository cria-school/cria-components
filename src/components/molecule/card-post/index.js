import React, { PureComponent } from 'react'

import Img from '../../atom/img'
import Button from '../../atom/button'

import placeholder from './placeholder.svg'
import style from './style.module.css'

export default class CardPost extends PureComponent {
    render() {
        
        let { picture } = this.props
        picture.placeholder = (picture.placeholder !== undefined) ? picture.src.placeholder : placeholder

        return (
            <article className={style.card}>
                <a className={style.categoryLink} href={this.props.category.href} title={this.props.category.name}>
                    <Button className={style.category} style="purple">{this.props.category.name}</Button>
                </a>
                <Img className={style.picture} src={picture} alt={this.props.title}/>
                <p className={style.date}>{this.props.date}</p>
                <h3 className={style.title}>{this.props.title}</h3>
            </article>
        )
    }
}
