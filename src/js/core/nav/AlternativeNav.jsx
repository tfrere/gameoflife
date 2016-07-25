import $                                from 'jquery';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import PreLoader                from 'component/PreLoader';
import { Router, Route, Link, browserHistory } from 'react-router';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';


export default class Nav extends Component {


    constructor( props ) {
        super( props );
        this.state = {};
        this.tl = new TimelineLite();
        this.leavingEvent = document.createEvent('Event');
        this.leavingEvent.initEvent('leaving', true, true);
        this.onClick = this.onClick.bind(this);
    }

    onClick(dest) {

        document.dispatchEvent(this.leavingEvent);

        setTimeout( () => {
            if (dest) {
                if (dest == "contact")
                    this.props.history.push('/contact');
                else if(dest == "portfolio") 
                    this.props.history.push('/portfolio');
                else if (dest == "about")
                    this.props.history.push('/about');
                else if (dest == "blog")
                    this.props.history.push('/blog');
                else if (dest == "photo")
                    this.props.history.push('/photo');
                else if (dest == "guidelines")
                    this.props.history.push('/guidelines');
            }
        }, 1000);
    }

    componentDidMount() {


        var link0 = this.refs.navLink0;
        var link1 = this.refs.navLink1;
        var link2 = this.refs.navLink2;
        var link3 = this.refs.navLink3;

        this.tl
        .from(link0, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "+=0.3")
        .from(link1, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "-=0.1")
        .from(link2, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "-=0.1")
        .play();
    }

    componentWillUnmount() {
    }

    render() {

        const url = this.props.location.pathname.replace(/\//g, '');
        console.log(url);
        return (
            <div>
                <div className={ classNames( 'displayed' ) }>

                    <div id="logo"/> 
                    <div className="nav-mobile-gradient"/>

                    <ul className="alternative-nav">
                        <li ref="navLink0" className={ classNames( { active: url == "portfolio" }, { active: url.includes("projet") } ) }>
                            <a onClick={ () => { this.onClick("portfolio") }}>
                                portfolio
                            </a>
                        </li>
                        <li ref="navLink1" className={ classNames( { active: url == "about" } ) }>
                            <a onClick={ () => { this.onClick("about") }}>
                                à propos
                            </a>
                        </li>
                        <li ref="navLink2" className={ classNames( { active: url == "contact" } ) }>
                            <a onClick={ () => { this.onClick("contact") }}>
                                contact
                            </a>
                        </li>
                    </ul>
                </div> 
                {this.props.children}
            </div> 
        );
    }
}
