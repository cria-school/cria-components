import React, { PureComponent } from 'react'

import Img from '../../atom/img'
import Button from '../../atom/button'

import style from './style.module.css'

export default class CardPostLatest extends PureComponent {
    render() {
        return (
            <article className={style.cardWrapper}>
                <div className={style.card}>
                    <Img className={style.picture} src={this.props.picture} alt={this.props.title}/>
                    <div className={style.overlay}></div>
                    <div className={style.contentWrapper}>
                        <div className={style.categoryLink} href={this.props.category.href} title={this.props.category.name}>
                            <Button className={style.category} colorSchema="purple">{this.props.category.name}</Button>
                        </div>
                        <p className={style.date}>{this.props.date}</p>
                        <h3 className={style.title}>{this.props.title}</h3>
                    </div>
                </div>
            </article>
        )
    }
}
