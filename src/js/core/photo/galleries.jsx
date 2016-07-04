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

    }

    onClick(id) {
        setTimeout( () => {
            this.props.history.pushState(null, '/photo/gallerie/'+ id);
        }, 450 );
    }

    componentDidMount(){

        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);

    }

    componentWillUnMount() {
        document.removeEventListener('leaving', this.onLeave, false);
    }

    render() {

        return (
            <div className="galleries">
                 {GalleriesData.map((gallery, i) =>
                    <div key={`${i}`} ref={`gallery${i}`}>
                        <div onClick={() => { this.onClick(i) }}>{gallery.title}</div>
                    </div>
                 )}
            </div>
        );

    }
}

