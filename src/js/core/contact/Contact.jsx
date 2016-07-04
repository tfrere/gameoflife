import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link }  from 'react-router'
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

import {illustration}             from '../blog/blogillu.jsx';

export default class Contact extends Component {

    constructor( props ) {
        super( props );
        this.onLeave = this.onLeave.bind(this);
        this.tl = new TimelineLite();
    }
    
    onLeave() {
        document.dispatchEvent(this.leavingEvent);
        this.tl.reverse();
    }

    componentDidMount(){
        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);
        
        var illustration = this.refs.illustration;

        var mySVG = $(illustration).drawsvg({
            duration: 2000,
            stagger: 5
        });

        setTimeout( () => {
            mySVG.drawsvg('animate');
        }, 200 );

        var title = this.refs.title;
        var content = this.refs.content;

        this.tl
        .from(title, 0.5, { opacity:0, y:-20, ease: Cubic.linear }, "+0.5")
        .from(content, 0.5, { opacity:0, y:-50, ease: Cubic.linear }, "+0.5");
    }

    componentWillUnmount() {
        document.removeEventListener('leaving', this.onLeave, false);
    }

    render() {

        return (
            <div className="contact">
                <header>
                    {illustration("#CCCCCC")}
                    <h1 ref="title">Bonjour,</h1>
                    <p ref="content">
                        Un project cool en tête et vous pensez que je pourrais y contribuer ?
                        Pensez à aller jeter un oeil à <a target="_blank" href="images/cv.pdf">mes compétences</a> et
                        envoyez moi un email à <a href="mailto:ecrire@tfrere.fr">ecrire@tfrere.fr</a>
                        <br/>
                        <small className="i">Je suis disponible à</small>
                        <a className="no-style" target="_blank" href="https://www.google.fr/maps/place/Paris/data=!4m2!3m1!1s0x47e66e1f06e2b70f:0x40b82c3688c9460?sa=X&ved=0ahUKEwjO1aWRvajLAhUCM5oKHblzAqAQ8gEIfjAQ">
                            <span>Paris</span>
                        </a>
                        <a className="no-style" target="_blank" href="https://www.google.fr/maps/place/Metz/data=!4m2!3m1!1s0x4794dc1b6074b6a9:0x596be4b635bba669?sa=X&ved=0ahUKEwjawPfeuqjLAhVjYZoKHQTFDhoQ8gEIfzAQ">
                            <span>Metz</span>
                        </a>
                    </p>
                </header>
            </div>
        );


    }
}

