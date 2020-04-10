import React, { Component } from 'react'

export default class Img extends Component {
    constructor(props){
        super(props)
        this.state = {
            lazy : props.src,
            src : "",
            rendered: false
        }
        this.scrollListener = this.scrollListener.bind(this)
        
        this.img = React.createRef()
    }
    componentDidMount(){
        this.scrollListener = window.addEventListener('scroll', this.scrollListener)
        const img = new Image(55,55)
        img.src = "https://picsum.photos/55/55?grayscale&blur=10"
        img.onload = this.setState({
            src: img.src
        })
    }
    scrollListener(e){
        const lazyImage = this.img.current
        
        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none"){
            this.setState({
                src : this.state.lazy,
                rendered: true
            })
        }
    }
    render() {
        return ( 
            <img
                ref={this.img}
                title={this.props.title || ""}
                alt={this.props.alt || ""}
                src={this.state.src}
                className={this.props.className || ""}
                height={this.props.height || ""}
                width={this.props.width || ""}
            />
        )
    }
}
