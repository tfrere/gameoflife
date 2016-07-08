import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link }  from 'react-router'
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';

import GalleriesData            from 'config/galleriesData';

import arctext                  from '../intro/arctext.js';
import svgdraw                  from '../intro/svgdraw.js';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

export default class Galleries extends Component {

    constructor( props ) {
        super( props );
        this.onLeave = this.onLeave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.tl = new TimelineLite();
    }

    onLeave(){
        console.log("galleriesLeave");
        this.tl.reverse();
    }

    onClick(id) {
        this.tl.reverse();
        setTimeout( () => {
            this.props.history.pushState(null, '/photo/gallerie/'+ id);
        }, 1500 );
    }

    componentDidMount(){

        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);

        var gallery0 = this.refs.gallery0;
        var gallery1 = this.refs.gallery1;
        var gallery2 = this.refs.gallery2;

        this.tl
        .fromTo(gallery0, 0.5, { opacity:0, y:-20, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear })
        .fromTo(gallery1, 0.5, { opacity:0, y:-20, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear }, "-=0.3")
        .fromTo(gallery2, 0.5, { opacity:0, y:-20, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear }, "-=0.3")

    }

    componentWillUnMount() {
        document.removeEventListener('leaving', this.onLeave, false);
    }

    render() {

        return (
            <div className="galleries">
                 {GalleriesData.map((gallery, i) =>
                    <figure onClick={() => { this.onClick(i) }} key={`${i}`} ref={`gallery${i}`}>
                        <div className="img" style={{backgroundImage: `url(${gallery.src})` }}></div>
                        <div className="number">{`.0${i}`}</div>
                        <figcaption className="caption">
                            <div className="repeat-title">{gallery.title}</div>
                            <h1>{gallery.title}</h1>
                        </figcaption>
                    </figure>
                 )}
            </div>
        );

    }
}

