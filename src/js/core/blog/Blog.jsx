import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';

import FixedBackground          from 'component/FixedBackground';

import Config                   from 'config/config';
import Articles                 from 'config/articles';

import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';



export default class Blog extends Component {

    static defaultProps = {
        onClick : () => true
    };

    constructor( props ) {
        super( props );
        this.tl = new TimelineLite();
    }

    componentWillMount() {
    }

    componentDidMount(){
        var blog = this.refs.blog;
        this.tl
        .fromTo(blog, 0.3, {opacity:0, y:-20, ease: Cubic.linear},{opacity:1, y:0, ease: Cubic.linear}, "+=0.5");
    }


    componentWillUnmount() {
    }


    render() {

        var heart = "♡";

        return (
            <div ref="blog" className="screen-box blog">
                <div className="container">
                 {Articles.map((object, i) =>
                    <div id={i} key={i} className="cell force-1" ref={`project${i}`} >
                        <div>
                            <h2>{object.title}</h2>
                            <h6 className="square-tag uppercase">{object.creationDate}</h6>
                            {/*<div className="cell-img" style={{backgroundImage: 'url(' + `${object.imgUrl}` + ')'}}>
                            </div>*/}
                            <p dangerouslySetInnerHTML={{__html: object.contentHtml}}/>
                            <br/><br/>
                            {object.tags.map((object, i) => <div className="tech-tag">{object} </div>)}
                            <hr className="lines"/>
                            <br/><br/><br/><br/>
                        </div>
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

