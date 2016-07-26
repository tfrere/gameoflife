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

import Articles                 from 'config/articles';

import FixedBackground          from 'component/FixedBackground';
import scrollTo                 from 'core/blog/smoothScroll';

import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';


export default class ArticleWrapper extends Component {

    static defaultProps = {
        handleClick : () => true,
        open: false
    };

    constructor( props ) {
        super( props );
        this.tl = new TimelineLite();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
       var data = Articles[this.props.params.yearId].articles[this.props.params.articleId];
       console.log(Articles[this.props.params.yearId], data);

        const techTags = data.tags.map((obj, i) => {
          return (
              <div key={`tech-tag${i}`} className="tech-tag">{obj} </div>
            );
        }); 

        return (
              <article ref="article"
                       className={classNames("cell force-1 blog-article")} >
                  <FixedBackground position="fixed-background-reader" fullscreen={true} filter="brightness" image={data.imgUrl}>
                      <h1>{data.title}</h1>
                      <h4 className="b">{data.date}</h4>
                  </FixedBackground>
                  <div ref="content" className="container">
                    <div className="clearfix"></div>
                    <p dangerouslySetInnerHTML={{__html: data.contentHtml}}/>
                    {techTags}
                  </div>

              </article>
        );
    }
}

