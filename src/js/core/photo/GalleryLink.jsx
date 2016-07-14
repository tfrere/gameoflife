import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link }  from 'react-router'
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';

import GalleriesData            from 'config/galleriesData';

import arctext                  from '../intro/arctext.js';
import svgdraw                  from '../intro/svgdraw.js';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

export default class Galleries extends Component {

    constructor( props ) {
        super( props );
        this.state = {isHover: false};
        this.onClick = this.onClick.bind(this);
        this.tl = new TimelineLite();
    }

    onClick() {
        this.props.onClick();
    }

    onMouseOver(context) {
        console.log(1);
        this.setState({isHover: true});
        this.props.onMouseOver();
    }

    onMouseOut() {
        console.log(2);
        this.setState({isHover: false});
        this.props.onMouseOut();
    }

    componentDidMount(){

    }

    componentWillUnMount() {
    }

    render() {
        return (
            <li 
                onClick={() => { this.onClick() }}
                onMouseOver={ () => {this.onMouseOver()} }
                onMouseOut={ () => {this.onMouseOut()} }
                className={classNames("gallery-link", {active: this.state.isHover})}
                key={`${this.props.data.i}`}
                ref={`gallery${this.props.data.i}`}>
                    <h1>{this.props.data.title}</h1>
                    <span>Voir la gallerie</span>
            </li>
        );
    }

}

