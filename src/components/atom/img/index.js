import React, { Component } from 'react'

export default class Img extends Component {
    constructor(props){
        super(props)
        this.state = {
            src : props.src.placeholder,
            rendered: false
        }
        this.img = React.createRef()
    }
    componentDidMount(){
        window.addEventListener('scroll', this.scrollListener)
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
                src: this.props.src.img.src
            })
            window.removeEventListener("scroll", this.scrollListener)
        }
    }
    render() {
        return(
            <picture ref={this.img} className={this.props.className || ""}>
                {this.props.src.srcset.map((el, key) => {
                    let srcset = this.state.rendered ? el.src : ""
                    return (
                        <source key={key} srcSet={srcset} type={el.type}/>
                    )
                })}
                <img 
                    ref={this.img}
                    title={this.props.title || ""}
                    alt={this.props.alt || ""}
                    src={this.state.src}
                    height={this.props.height || ""}
                    width={this.props.width || ""}
                />
            </picture>
        )
    }
}
