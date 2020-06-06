import React, { PureComponent } from 'react'

import Img from '../../atom/img'
import Button from '../../atom/button'

import style from './style.module.css'

export default class CardEbook extends PureComponent {
    render() {
        const { src, title, category, className, href } = this.props

        return (
            <a href={href} title={title} target={"_blank"} rel="noreferrer noopenner">
                <article className={`${className} ${style.card}`}>
                    <Button className={style.category} colorSchema="purple">{category.name}</Button>
                    <Img src={src} title={title} />
                </article>
            </a>
        )
    }
}
