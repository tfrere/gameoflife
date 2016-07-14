import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import svgdraw                  from '../intro/svgdraw.js';
import parallax                 from '../intro/parallax.js';
import arctext                  from '../intro/arctext.js';

import ReactDOM                 from 'react-dom';
import ReactTooltip             from 'react-tooltip';

import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';

import {background}             from '../intro/background.jsx';
import {background2}             from '../intro/background2.jsx';
import {background3}             from '../intro/background3.jsx';

export default class notFound extends Component {

    constructor( props ) {
        super( props );
        this.onLeave = this.onLeave.bind(this);
        this.tl = new TimelineLite();
    }

    onLeave() {
        this.tl.timeScale(1.5);
        this.tl.reverse();
    }

    componentDidMount(){
        
        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);

        var notFound = this.refs.notFound;
        var parallax = this.refs.parallax;
        var background = this.refs.background;
        var background2 = this.refs.background2;
        var background3 = this.refs.background3;
        
        var drawBg = $(background).drawsvg({
            duration: 1700,
            stagger: 5
        });
        var drawBg2 = $(background2).drawsvg({
            duration: 1700,
            stagger: 5
        });
        var drawBg3 = $(background3).drawsvg({
            duration: 1700,
            stagger: 5
        });

        $(parallax).parallax({
          calibrateX: false,
          calibrateY: false,
          invertX: false,
          invertY: true,
          limitX: false,
          limitY: false,
          scalarX: 2,
          scalarY: 8,
          frictionX: 0.2,
          frictionY: 0.8,
          originX: 0.0,
          originY: 0.0
        });


        this.tl
         .fromTo(background, 0.5, {opacity:0}, {opacity:1}, "-=0.5")
         .fromTo(background2, 0.5, {opacity:0}, {opacity:1}, "-=0.5")
         .fromTo(background3, 0.5, {opacity:0}, {opacity:1}, "-=0.5");

        setTimeout( () => {
            drawBg.drawsvg('animate');
            drawBg2.drawsvg('animate');
            drawBg3.drawsvg('animate');
        }, 600 );
    }

    componentWillUnmount() {
        document.removeEventListener('leaving', this.onLeave, false);

    }

    render() {

        return (
            <div ref="notFound" className="screen-box not-found">
                    <div ref="parallax" id="parallax" className="parallax-viewport">
                        <div className="layer" data-depth="0.25" >
                            {background("#EEE")}
                        </div>
                        <div className="layer" data-depth="0.50">
                            {background2("#EEE")}
                        </div>
                        <div className="layer" data-depth="0.75">
                            {background3("#EEE")}
                        </div>
                    </div>
                <div className="center-box screen-box">
                    <div className="center">
                        <h1 className="title">404</h1>
                        <a className="cta special-button">
                            <span className="content">Retourner à l'accueil</span>
                            <span className="extra first"></span>
                            <span className="extra last"></span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

