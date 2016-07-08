import React, { Component, PropTypes, render } from 'react';
import Lightbox from './images/Lightbox.js';
import Masonry from 'react-masonry-component';
import $ from 'jquery';
import classNames from 'classnames';
import Pictures from 'config/pictures';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

import Gallery from 'core/photo/Gallery';

export default class GalleryWrapper extends Component {
 
    constructor () {
        super();

        this.tl = new TimelineLite();
        this.onLeave = this.onLeave.bind(this);
    }

    onLeave(){
        console.log("galleriesLeave");
        this.tl.reverse();
    }
    
    componentDidMount() {

        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);

        var collection = this.refs.collection;

        this.tl
        .fromTo(collection, 0.5, { opacity:0, y:-20, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear });

    }

    render () {

        const IMAGE_MAP = Pictures.filter(img => {
            console.log(img.type, this.props.params.galleryId)
            if (img.type == this.props.params.galleryId)
                return img;
        });

        const IMAGES_PRELOAD = IMAGE_MAP.map(img => {
            return <img src={img.srcset[0]} />;
        });

        return (
            <section ref="collection" className="container collection">
                <Gallery images={IMAGE_MAP} history={this.props.history} />
                <div style={{ display: 'none' }}>{IMAGES_PRELOAD}</div>
            </section>
        );
    }
};
