import React, { Component, PropTypes, render } from 'react';
import Lightbox from './images/Lightbox.js';
import Masonry from 'react-masonry-component';
import $ from 'jquery';
import classNames from 'classnames';
import Pictures from 'config/pictures';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

var masonryOptions = {
    transitionDuration: 100,
    gutter: 20,
    itemSelector: '.masonry-col',
    stamp: '.masonry-col-full'
};

class Gallery extends Component {

    constructor () {
        super();

        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
            isImagesLoaded: false,
            colWidth: 0
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.handleResize = this.handleResize.bind(this);

    }

    componentDidMount() {

        this.setState({
            colWidth: this.refs.thumb.offsetWidth
        });
        window.addEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({
            colWidth: this.refs.thumb.offsetWidth,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    openLightbox (index, event) {
        console.log("eayea");
        event.preventDefault();
        console.log("eayea2");
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    handleClickImage () {
        if (this.state.currentImage === this.props.images.length - 1)
            return;
        this.gotoNext();
    }

    handleImagesLoaded () {
        this.setState({
            isImagesLoaded: true,
        });
    }

    renderGallery () {

        if (!this.props.images)
            return null;

        const gallery = this.props.images.map((obj, i) => {
            var className, height;
            if (obj.thumbnailWidth == 960) {
                className = "masonry-col-full";
                height = $('.container').width() / obj.thumbnailRatio;
            } else {
                className = "masonry-col";
                height = this.state.colWidth / obj.thumbnailRatio;
            }
            return (
                <div ref="thumb" key={i} style={{height: height}} className={className}>
                    <figure>
                        <img src={obj.thumbnail} />
                        <figcaption>
                            <h5><i className="uxpin-icon share"/>{obj.caption}</h5>
                            <span onClick={(e) => this.openLightbox(i, e)} />
                        </figcaption>
                    </figure>
                </div>
            );
        });

        return (
            <Masonry key="masonry"
                onImagesLoaded={this.handleImagesLoaded}
                className={'row', 'add-top'}
                elementType={'div'}
                options={masonryOptions}
                disableImagesLoaded={false} >
                {gallery}
            </Masonry>
        );
    }

    render () {
        return (
            <div key="gallery-box">
                {this.renderGallery()}
                <Lightbox
                    currentImage={this.state.currentImage}
                    images={this.props.images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClickImage={this.handleClickImage}
                    onClose={this.closeLightbox}
                    theme={this.props.theme}
                    showCloseButton={true}
                />
            </div>
        );
    }
};

export default Gallery;
