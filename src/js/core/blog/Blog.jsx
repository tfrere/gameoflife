import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import svgdraw                  from '../intro/svgdraw.js';

import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';

import FixedBackground          from 'component/FixedBackground';
import Article                 from '../blog/Article';

import Config                   from 'config/config';
import Articles                 from 'config/articles';

import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';

import {illustration}             from './blogillu.jsx';



export default class Blog extends Component {

    static defaultProps = {
        onClick : () => true
    };

    constructor( props ) {
        super( props );
        this.state = {hover: false};
        this.onLeave = this.onLeave.bind(this);
        this.tl = new TimelineLite();
    }
    
    onLeave() {
        console.log("blogLeave");
        this.tl.reverse();
    }

    mouseOver() {
        console.log("triggered");
        this.setState({hover: true});
    }


    mouseOut() {
        console.log("triggered");
        this.setState({hover: false});
    }

    componentDidMount(){
        document.addEventListener('leaving', this.onLeave, false);
        
        window.scrollTo(0,0);
        
        var illustration = this.refs.illustration;
        var blog = this.refs.blog;

        var mySVG = $(illustration).drawsvg({
            duration: 2000,
            stagger: 5
        });

        setTimeout( () => {
            mySVG.drawsvg('animate');
        }, 200 );

        this.tl
        .fromTo(blog, 0.3, {opacity:0, y:-20, ease: Cubic.linear},{opacity:1, y:0, ease: Cubic.linear}, "+=0.5");
    }


    componentWillUnmount() {
        document.removeEventListener('leaving', this.onLeave, false);
    }


    render() {

        var heart = "♡";

        return (
            <div ref="blog" className="screen-box blog">
                {illustration("#CCCCCC")}
                <div className={classNames("container", this.state.hover ? "hover-wrapper-active" : "")}>
                 {Articles.map((object, i) =>
                    <section className="articles-of-the-year" key={`articles-of-the-year${i}`} >
                        <header>
                            <h2>{object.date}</h2>
                        </header>
                         {object.articles.map((object, i) =>
                            <Article
                                data={object}
                                id={i}
                                key={`article${i}`}
                                handleMouseOver={ () => {this.mouseOver()} }
                                handleMouseOut={ () => {this.mouseOut()} }
                            />
                         )}
                    </section>
                 )}
                </div>
                <footer>
                    <h6>{heart}</h6>
                </footer>
            
            </div>
        );
    }
}
