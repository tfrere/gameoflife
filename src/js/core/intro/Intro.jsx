import _                        from 'lodash';
import $                        from 'jquery';
import svgdraw                  from './svgdraw.js';
import arctext                  from './arctext.js';


import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';
import TypeWriter               from 'react-typewriter';
import {illustration}             from './illustration.jsx';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

export default class Intro extends Component {


    constructor( props ) {
        super( props );
        this.state = {};
        this.onClick = this.onClick.bind(this);
        this.tl = new TimelineLite();
    }
    
    onClick() {

        this.setState( { active: true } );
        this.tl.reverse();
        setTimeout( () => {
            //console.log(this.props.history);
            this.props.history.pushState(null, '/portfolio');
            this.setState( { active : false } );
        }, 1500 );
    }


    componentDidMount() {

        var cta = this.refs.cta;
        var ctaSpan = this.refs.ctaSpan;
        var name = this.refs.name;
        var work = this.refs.work;
        var since = this.refs.since;

        var illustration = this.refs.illustration;

        $(work).arctext({radius: 100, dir: 1});
        $(since).arctext({radius: 80, dir: -1});

        var mySVG = $(illustration).drawsvg({
            duration: 2000,
            stagger: 5
        });
        this.tl.stop();

        this.tl
        .fromTo(name, 0.5, { opacity:0, y:-30, ease: Expo.easeInOut, rotationY:0, rotationX:60 },
                           {opacity:1, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:0}
                           , "+=0.4")
        .fromTo(work, 0.5, { opacity:0, y:-30, ease: Expo.easeInOut, rotationY:0, rotationX:60 },
                           {opacity:1, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:0}
                           , "-=0.4")
        .fromTo(since, 0.5, { opacity:0, y:-30, ease: Expo.easeInOut, rotationY:0, rotationX:60 },
                           {opacity:1, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:0}
                           , "-=0.4")
        .to(cta, 0.2, { opacity:1 })
        .fromTo(illustration, 0.5, {opacity:0}, {opacity:1});

        setTimeout( () => {
            mySVG.drawsvg('animate');
        }, 600 );

        this.tl.play();
    }

    render() {
            
            return (
                <div className="intro">
                    <div>
                        {illustration("#CCCCCC")}
                        <div className="text">
                        <h4 ref="work">THIBAUD FRERE</h4>
                        <h1 ref="name" className="i uppercase">web designer </h1>
                        <h5 ref="since">DEPUIS 2008</h5>
                        </div>
                    </div>
                    <button ref="cta" className={classNames("cta", {active: this.state.active}) } onClick={ ::this.onClick } >
                        <span ref="ctaSpan">PORTFOLIO</span>
                        <span className="arrow-down"/>
                    </button>
                </div>
            );

    }
}
