import $                                from 'jquery';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';


export default class MotionTest extends Component {

    componentDidMount(){
        var circle = this.refs.circle;
        var circleWrapper = this.refs.circleWrapper;

        var tl = new TimelineLite();
        tl
        .from(circle, 1, { y:-500, ease: Circ.easeInOut })
        .to(circle, 1, {scale: 30,  ease: Circ.easeInOut})
        .to([circle, circleWrapper], 1, {opacity: 0,  ease: Circ.easeInOut})
        .set(circleWrapper, {className: '+=hidden'});
    }

    render() {
        return (
            <div ref="circleWrapper" className="preloader">
                <div ref="circle" className="loading-circle"/>                    
            </div>
        );
    }
}
