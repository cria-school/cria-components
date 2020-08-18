import React, { Component } from 'react'

import style from './style.module.css'

export default class Img extends Component {
    constructor(props){
        super(props)
        this.state = {
            src: props.src ? (props.src.placeholder) : false,
            isSourceObject : typeof(props.src) === "object" || false,
            rendered: false
        }
        this.img = React.createRef()
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scrollListener)
        window.addEventListener('load', this.scrollListener)
        this.scrollListener()
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollListener)
        window.removeEventListener('load', this.scrollListener)
    }

    scrollListener = (e) => {
        const lazyImage = this.img.current
        const lazyImageTop = lazyImage.getBoundingClientRect().top
        const lazyImageBottom = lazyImage.getBoundingClientRect().bottom
        const wIH = window.innerHeight
        const imageStyleIsVisible = getComputedStyle(lazyImage).display !== "none"

        if ((lazyImageTop <= wIH && lazyImageBottom > 0) && imageStyleIsVisible){
            this.setState({
                rendered: true,
                src: this.state.isSourceObject ? this.props.src.img.src : this.props.src
            })
            window.removeEventListener("scroll", this.scrollListener)
        }
    }

    render() {

        const shouldInsertSrcSet = this.state.isSourceObject && this.props.src.srcset

        return(
            <picture ref={this.img} className={this.props.className || ""}>
                {shouldInsertSrcSet &&
                    this.props.src.srcset.map((el, key) => {
                        let srcset = this.state.rendered ? el.src : ""
                        return (
                            <source
                                key = {key}
                                type = {el.type}
                                srcSet = {srcset}
                                media = {el.media || null}
                            />
                        )
                    })
                }
                <img
                    title={this.props.title || ""}
                    alt={this.props.alt || ""}
                    src={this.state.src}
                    height={this.props.height || ""}
                    width={this.props.width || ""}
                    className={style.img}
                />
            </picture>
        )
    }
}
