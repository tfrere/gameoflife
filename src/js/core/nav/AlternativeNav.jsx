import $                                from 'jquery';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import PreLoader                from 'component/PreLoader';
import { Router, Route, Link, browserHistory } from 'react-router';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';


export default class Nav extends Component {


    static defaultProps = {
        onClick : () => true,
        url: ""
    };

    constructor( props ) {
        super( props );
        this.state = {};
        this.tl = new TimelineLite();
        this.leavingEvent = document.createEvent('Event');
        this.leavingEvent.initEvent('leaving', true, true);
        this.onBack = this.onBack.bind(this);
    }

    onBack() {

        console.log(this);
        document.dispatchEvent(this.leavingEvent);

        setTimeout( () => {
            console.log(this.props.history);
            console.log(window.history.length);
            const url = this.props.location.pathname;
            var re = /.*\/.*\/[0-9]*/i;

            if (url.match(re))
                this.props.history.push('/portfolio');
            else if( url.match(/portfolio/i) ) 
                this.props.history.push('/');
            else if (window.history.length > 1)
                this.props.history.push('/');
            else
                this.props.history.goBack();

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
        .from(link2, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "-=0.1");
    }

    componentWillUnmount() {
    }

    render() {

        var url = this.props.location.pathname;
        var isBackButtonDisplayed = true;

        if (url == "/"){
            isBackButtonDisplayed = false;
        }

        return (
            <div>
                <div className={ classNames( 'displayed', { active : this.state.active }) }>

                    <div className="nav-mobile-gradient"/>
                    {(function(props, isBackButtonDisplayed, onBack) {
                      if (isBackButtonDisplayed) {
                        return (
                            <div className="nav-back" onClick={onBack.bind(null, "")}>
                                <div className="back-arrow"/>
                                <h5 className="nav-typo"> retour </h5>
                            </div>
                            ); 
                      } 
                    })(this.props, isBackButtonDisplayed, this.onBack)}

                    <ul className="alternative-nav">
                        <li ref="navLink0">
                            <Link className="nav-typo"
                                    activeClassName='active'
                                    to={`/portfolio`}
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li ref="navLink1">
                            <Link className="nav-typo"
                                    activeClassName='active'
                                    to={`/about`}
                            >
                                A propos
                            </Link>
                        </li>
                        <li ref="navLink2">
                            <Link className="nav-typo"
                                    activeClassName='active'
                                    to={`/contact`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div> 
                {this.props.children}
            </div> 
        );
    }
}
