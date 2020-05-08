import React, { PureComponent } from 'react'

import Img from '../../atom/img'
import Button from '../../atom/button'

import style from './style.module.css'

export default class CardPost extends PureComponent {
    render() {
        return (
            <article className={style.card}>
                <div className={style.categoryLink} href={this.props.category.href} title={this.props.category.name}>
                    <Button className={style.category} style="purple">{this.props.category.name}</Button>
                </div>
                <Img title={this.props.title} className={style.picture} src={this.props.picture} alt={this.props.title}/>
                <p className={style.date}>{this.props.date}</p>
                <h3 className={style.title}>{this.props.title}</h3>
            </article>
        )
    }
}
