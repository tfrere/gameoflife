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
        this.onLeave = this.onLeave.bind(this);
        this.tl = new TimelineLite();
    }
    
    onLeave() {
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

        var blog = this.refs.blog;
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
                <div className="container">
                 {Articles.map((object, i) =>
                    <div id={i} key={i} className="cell force-1" ref={`project${i}`} >
                        <header>
                            <div className="square-date">
                                <h4>{object.month}</h4>
                                <h5>{object.year}</h5>
                            </div>
                            <div className="sub-header">
                                <h2>{object.title}</h2>
                                {/*<h5 className="i">
                                    <span>{object.themes}</span>
                                </h5>*/}
                            </div>
                        </header>
                        <div className="clearfix"/>
                        {/*<div className="cell-img" style={{backgroundImage: 'url(' + `${object.imgUrl}` + ')'}}>
                        </div>*/}
                        <p dangerouslySetInnerHTML={{__html: object.contentHtml}}/>
                        <br/><br/>
                        {/*{object.tags.map((object, i) => <div className="tech-tag">{object} </div>)}*/}
                        <hr/>
                        <br/><br/><br/><br/>
                    </div>
                 )}
                </div>
                <footer>
                    <h6>{heart}</h6>
                </footer>
            
            </div>
        );
    }
}

