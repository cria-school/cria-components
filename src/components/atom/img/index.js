import React, { Component } from 'react'

export default class Img extends Component {
    constructor(props){
        super(props)
        this.state = {
            src : "",
            rendered: false
        }
        this.scrollListener = this.scrollListener.bind(this)
        
        this.img = React.createRef()
    }
    componentDidMount(){
        this.scrollListener = window.addEventListener('scroll', this.scrollListener)
        const img = new Image()
        img.src = this.props.src.placeholder
        img.onload = this.setState({
            src: img.src
        })
    }
    scrollListener(e){
        const lazyImage = this.img.current
        const lazyImageTop = lazyImage.getBoundingClientRect().top
        const lazyImageBottom = lazyImage.getBoundingClientRect().bottom
        const wIH = window.innerHeight
        const lazyImageHalfHeight = wIH + (wIH - lazyImageTop);
        const imageStyleIsVisible = getComputedStyle(lazyImage).display !== "none";
        
        if ((lazyImageTop <= wIH && lazyImageBottom <= lazyImageHalfHeight) && imageStyleIsVisible){
            this.setState({
                rendered: true,
                src: this.props.src.img
            })
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
