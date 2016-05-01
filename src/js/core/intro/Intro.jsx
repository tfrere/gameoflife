import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';
import TypeWriter               from 'react-typewriter';
import {illustration}             from './illustration.jsx';
import {overlay}                  from './overlay.jsx';
import {sunrise}                  from './sunrise.jsx';

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
        }, 1000 );
    }


    componentDidMount() {

        var cta = this.refs.cta;
        var ctaSpan = this.refs.ctaSpan;
        var name = this.refs.name;
        var work = this.refs.work;
        var since = this.refs.since;
        
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

        this.tl.play();
    }

    render() {
            
            return (
                <div className="intro">
                    <div>
                         {/*{illustration("grey")}
                         {overlay("black")}
                         {sunrise("grey")}*/}
                        <h1 ref="name">Thibaud Frere </h1>
                        <h4 ref="work" className="i uppercase">designer indépendant</h4>
                        <h5 ref="since" className="square-tag">depuis 2008</h5>
                        <br className="clearfix"/>
                    </div>
                    <button ref="cta" className={classNames("cta", {active: this.state.active}) } onClick={ ::this.onClick } >
                        <span ref="ctaSpan">PORTFOLIO</span>
                        <span className="arrow-down"/>
                    </button>
                </div>
            );

    }
}
