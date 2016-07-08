import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import svgdraw                  from '../intro/svgdraw.js';
import Collapsible                  from '../../component/Collapsible.jsx';

import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';

import scrollTo                 from 'core/blog/smoothScroll';

import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';


export default class Article extends Component {

    static defaultProps = {
        handleClick : () => true,
        open: false
    };

    constructor( props ) {
        super( props );
        this.state = { isOpen: this.props.open, height: 0, hover: false };
        this.handleClick = this.handleClick.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.tl = new TimelineLite();
    }

    handleClick() {
      this.setHeight();
      if (!this.state.isOpen){
        this.setState({isOpen: true});
      }
      else{
        this.setState({isOpen: false});
      }
      scrollTo($(this.refs.head).offset().top - 50);

    }

    mouseOver() {
        console.log(this.props);
        this.props.handleMouseOver();
        this.setState({hover: true});
    }


    mouseOut() {
        console.log(this.props);
        this.props.handleMouseOut();
        this.setState({hover: false});
    }

    componentDidMount() {
      this.setHeight();
    }

    setHeight() {
        this.setState({
          height: this.refs.content.offsetHeight,
        });
    }

    componentWillUnmount() {
    }

    render() {

        var articleStyle = {
          height: !this.state.isOpen ? "50px" : this.state.height + 50
        };

        const techTags = this.props.data.tags.map((obj, i) => {
          return (
              <div key={`tech-tag${i}`} className="tech-tag">{obj} </div>
            );
        }); 

        return (
              <article onMouseOver={ () => {this.mouseOver()} }
                       onMouseOut={ () => {this.mouseOut()} }
                       style={ articleStyle }
                       ref="article"
                       className={classNames("cell force-1 article-wrapper", this.state.hover ? "hover-active" : "")} >

                  <header ref="head" onClick={ () => {this.handleClick()} }>
                      <div ref="date" className="date">
                          <h4>{this.props.data.date}</h4>
                      </div>
                      <div ref="sub-header" className="sub-header">
                          <h3>{this.props.data.title}</h3>
                      </div>
                  </header>
                  <div ref="content" className="article-content">
                    <div className="clearfix"></div>
                    <p dangerouslySetInnerHTML={{__html: this.props.data.contentHtml}}/>
                    {/*techTags*/}
                    <div className="invisible clearfix"/>
                  </div>

              </article>
        );
    }
}

