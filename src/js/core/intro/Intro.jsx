import _                        from 'lodash';
import $                        from 'jquery';
import svgdraw                  from './svgdraw.js';
import parallax                 from './parallax.js';
import arctext                  from './arctext.js';


import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';
import TypeWriter               from 'react-typewriter';
import {illustration}           from './illustration.jsx';
import {background}             from './background.jsx';
import {background2}             from './background2.jsx';
import {background3}             from './background3.jsx';

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
        this.tl.timeScale(1.5);
        this.tl.reverse();
        this.tl.seek(-2.4);
        setTimeout( () => {
            this.props.history.pushState(null, '/portfolio');
            this.setState( { active : false } );
            this.tl.timeScale(1);
        }, 1500 );
    }


    componentDidMount() {

        var cta = this.refs.cta;
        var name = this.refs.name;
        var work = this.refs.work;
        var since = this.refs.since;
        var parallax = this.refs.parallax;
        // var background = this.refs.background;
        // var background2 = this.refs.background2;
        // var background3 = this.refs.background3;

        var illustration = this.refs.illustration;

        $(name).arctext({radius: 100, dir: 1});
        $(since).arctext({radius: 80, dir: -1});

        var drawIllu = $(illustration).drawsvg({
            duration: 2000,
            stagger: 5
        });
        // var drawBg = $(background).drawsvg({
        //     duration: 1700,
        //     stagger: 5
        // });
        // var drawBg2 = $(background2).drawsvg({
        //     duration: 1700,
        //     stagger: 5
        // });
        // var drawBg3 = $(background3).drawsvg({
        //     duration: 1700,
        //     stagger: 5
        // });

        // $(parallax).parallax({
        //   calibrateX: false,
        //   calibrateY: false,
        //   invertX: false,
        //   invertY: true,
        //   limitX: false,
        //   limitY: false,
        //   scalarX: 2,
        //   scalarY: 8,
        //   frictionX: 0.2,
        //   frictionY: 0.8,
        //   originX: 0.0,
        //   originY: 0.0
        // });

        this.tl.stop();

        this.tl
        .fromTo(work, 0.6, { opacity:0, y:-30, ease: Expo.easeInOut, rotationY:0, rotationX:0 },
                           {opacity:1, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:0}
                           , "+=0.2")
        .fromTo([name, since], 0.6, { opacity:0, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:0 },
                           {opacity:1, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:0}
                           , "-=0.2")
        .fromTo(illustration, 0.5, {opacity:0}, {opacity:1})
        .fromTo(cta, 0.4, { opacity:0 }, { opacity:1 }, "+=2.2");
        //.fromTo(background, 0.5, {opacity:0}, {opacity:1}, "-=0.5");
        // .fromTo(background2, 0.5, {opacity:0}, {opacity:1}, "-=0.5")
        // .fromTo(background3, 0.5, {opacity:0}, {opacity:1}, "-=0.5");

        setTimeout( () => {
            drawIllu.drawsvg('animate');
            // setTimeout( () => {
            //     drawBg.drawsvg('animate');
            //     drawBg2.drawsvg('animate');
            //     drawBg3.drawsvg('animate');
            // }, 600 );
        }, 600 );

        this.tl.play();
    }

    render() {
            
            return (
                <div className="screen-box">
                    {/*<div ref="parallax" id="parallax" className="parallax-viewport">
                        <div className="layer" data-depth="0.25" >
                            {background("#EEE")}
                        </div>
                        <div className="layer" data-depth="0.50">
                            {background2("#EEE")}
                        </div>
                        <div className="layer" data-depth="0.75">
                            {background3("#EEE")}
                        </div>
                    </div>*/}
                    <div className="intro">
                        <div className="center">
                            {illustration("#DDD")}
                            <div className="text">
                                <h4 ref="name">THIBAUD FRERE</h4>
                                <h1 ref="work" className="i uppercase">web designer </h1>
                                <h5 ref="since">DEPUIS 2008</h5>
                            </div>
                            <a ref="cta" className={classNames("cta special-button", {active: this.state.active}) } onClick={ ::this.onClick }>
                                <span className="content">Visiter le site</span>
                                <span className="extra first"></span>
                                <span className="extra last"></span>
                            </a>
                        </div>
                    </div>
                </div>
            );

    }
}
