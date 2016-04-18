import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';
import ReactTooltip             from 'react-tooltip';

import Typographies             from 'config/typography';
import Colors                   from 'config/color';
import Placeholders             from 'config/placeholder';

import Config                   from 'config/config';
import Projects                 from 'config/projects';

import ImageZoomer              from 'component/ImageZoomer';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

export default class Article extends Component {

    static defaultProps = {
        onClick : () => true,
        url: 0
    };

    constructor( props ) {
        super( props );
        this.state = {};
        this.onClick = this.onClick.bind(this);
        this.nextProject = this.nextProject.bind(this);
        this.prevProject = this.prevProject.bind(this);
        setTimeout( () => {
            this.setState( { open : true } );
        }, 1500 );
        this.tl = new TimelineLite();
    }

    nextProject() {
        var currentUrl = parseInt(this.props.url);
        if (currentUrl + 1 >= Projects.length) {
            currentUrl = 0;
        }
        else 
            currentUrl++;
        setTimeout( () => {
            this.props.history.push('/project/' + currentUrl + "");
        }, 10);
    }
    prevProject() {
        var currentUrl = this.props.url;
        //console.log(currentUrl);
        if (currentUrl <= 0) {
            currentUrl = Projects.length - 1;
        }
        else
            currentUrl--;
        setTimeout( () => {
            this.props.history.push('/project/' + currentUrl + "");
        }, 10);
    }

    onClick() {
         this.props.onClick();
         this.setState( { active: !this.state.active } );
    }

    componentDidMount(){

        var content = this.refs.contentWrapper;
        var title = this.refs.titleWrapper;
        var img0 = this.refs.img0;
        var year = this.refs.year;
        var prevProject = this.refs.prevProject;
        var nextProject = this.refs.nextProject;

        
        this.tl
        .from(title, 0.6, { opacity:0, y:-50, ease: Circ.easeInOut }, "+0.5")
        .fromTo(img0, 0.6, { opacity:0, y:-30, ease: Expo.easeInOut, rotationY:0, rotationX:0 }, {opacity:1, y:0, ease: Expo.easeInOut, rotationY:0, rotationX:10}, "-=0.8")
        .from(content, 0.6, { opacity:0, x:-50, ease: Circ.easeInOut }, "+0.5")
        .from(year, 0.6, { opacity:0, y:-50, ease: Circ.easeInOut }, "+0.5")
        .from(prevProject, 0.5, { opacity:0, x:-100, ease: Circ.easeInOut, clearProps: "all" }, "+0.5")
        .from(nextProject, 0.5, { opacity:0, x:100, ease: Circ.easeInOut, clearProps: "all" }, "+0.5");

        if (this.props.url)
        {
            document.body.scrollTop = 0;
            setTimeout( () => {
                this.setState( { open : true } );
            }, 1500 );
        }
    }

    render() {

            var url = this.props.url;

            return (
                <div className={classNames("screen-box project", {open:this.state.open}) }>
                    <div ref="titleWrapper" className={classNames( 'title-wrapper', { active : this.state.active } ) }>
                        <h5 className="italic">{Projects[url].month}</h5>
                        <header>
                            <h2 dangerouslySetInnerHTML={{__html: Projects[url].title}}></h2>
                            <span className="square-tag">{Projects[url].purpose}</span>
                        </header>
                    </div>
                    <a href={Projects[url].website} target="_blank" className="img-wrapper">
                        <img src={Projects[url].img[0]} ref="img0" className="img-article img-article-0"/>
                        <div className="img-overlay"/>
                    </a>
                    <div ref="contentWrapper" className={classNames( 'content-wrapper', { active : this.state.active } ) }>
                        <p
                            dangerouslySetInnerHTML={{__html: Projects[url].content}}
                            className={ "content", classNames({active:this.state.active}) }
                        >
                        </p>
                    </div>
                    <a ref="prevProject" className="prev-project" onClick={ ::this.prevProject } >
                        <span/>
                    </a>
                    <a ref="nextProject" className="next-project" onClick={ ::this.nextProject } >
                        <span/>
                    </a>
                    <div ref="year" className="project-year">{Projects[url].year}</div>
                    {/*<ImageZoomer alt="Image alt"
                        src='images/portfolio/pngs/framework_desktop.png'
                        zoomSrc='images/portfolio/pngs/framework_desktop.png'/>*/}
                </div>
            );


    }
}
