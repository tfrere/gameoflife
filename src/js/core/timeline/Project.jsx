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
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onLeave = this.onLeave.bind(this);
        setTimeout( () => {
            this.setState( { open : true } );
        }, 1500 );
        this.tl = new TimelineLite();
        this.navTl = new TimelineLite();
        this.imgTl = new TimelineLite();
        this.imgSwapTl = new TimelineLite();
    }

    nextProject(direction) {

        var currentUrl = parseInt(this.props.url);
        
        if (direction == "next")
        {
            if (currentUrl + 1 >= Projects.length) {
                currentUrl = 0;
            }
            else 
                currentUrl++;
        }
        else {
            if (currentUrl <= 0) {
                currentUrl = Projects.length - 1;
            }
            else
                currentUrl--;
        }

        this.tl.seek(0.5).stop();

        this.imgSwapTl.timeScale(1);
        this.imgSwapTl.reverse();

        setTimeout( () => {

            this.imgSwapTl.timeScale(0.3);
            this.imgSwapTl.play();

            this.props.history.push('/projet/' + currentUrl + "");

            setTimeout( () => {

                this.tl.play();

            }, 300);

        }, 300);
    }

    onClick() {
         this.props.onClick();
         this.setState( { active: !this.state.active } );
    }

    onLeave() {
        this.tl.reverse();
        this.imgTl.reverse();
        this.navTl.reverse();
    }


    componentDidMount(){

        window.scrollTo(0,0);
                
        document.addEventListener('leaving', this.onLeave, false);

        document.addEventListener('keydown', this.onKeyPress, false);

        var title = this.refs.titleWrapper;
        var purpose = this.refs.purposeWrapper;
        var text = this.refs.textWrapper;
        var techTag = this.refs.techTagWrapper;
        var img0 = this.refs.img0;
        var img1 = this.refs.img1;
        var year = this.refs.year;
        var prevProject = this.refs.prevProject;
        var nextProject = this.refs.nextProject;
        var sitelink = this.refs.sitelink;

        
        this.tl
        .from(title, 0.6, { opacity:0, x:-50, ease: Circ.easeInOut }, "+0.5")
        .from(purpose, 0.8, { opacity:0, x:-50, ease: Circ.easeInOut }, "+0.5")
        .from(text, 0.3, { opacity:0, y:5, ease: Circ.easeInOut }, "+1")
        //.from(year, 0.6, { opacity:1, ease: Circ.easeInOut }, "+0.5")
        //.from(techTag, 0.3, { opacity:0, x:0, ease: Circ.easeInOut }, "+1.5")
        .from(sitelink, 0.3, { opacity:0, ease: Circ.easeInOut, clearProps: "all" }, "+1.3");
        
        this.imgTl
        .fromTo(img0, 0.6, { opacity:0, x:-10, ease: Expo.easeInOut, rotationY:0, rotationX:0 }, {opacity:1, x:0, ease: Expo.easeInOut, rotationY:-10, rotationX:3}, "-=1")
        .fromTo(img1, 0.6, { opacity:0, x:-10, ease: Expo.easeInOut, rotationY:0, rotationX:0 }, {opacity:1, x:0, ease: Expo.easeInOut, rotationY:-10, rotationX:3}, "-=0.7")
        
        this.imgSwapTl.stop();
        this.imgSwapTl
        .fromTo(img0, 0.3, {opacity:0, y:-10, ease: Expo.easeInOut, rotationY:-10, rotationX:0}, {opacity:1, y:0, ease: Expo.easeInOut, rotationY:-10, rotationX:0})
        .fromTo(img1, 0.3, {opacity:0, y:-10, ease: Expo.easeInOut, rotationY:-10, rotationX:0}, {opacity:1, y:0, ease: Expo.easeInOut, rotationY:-10, rotationX:0}, "-=0.3")
        .add("end");
        this.imgSwapTl.seek("end");

        this.navTl
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

    onKeyPress(event) {
      //console.log(event); // => nullified object.
      //console.log(event.type); // => "click"
      if (event.keyCode == 192)
        $('body').toggleClass('show-baseline');
      if (event.keyCode == 37) // left
        this.nextProject("prev");
      if (event.keyCode == 39)  // right
        this.nextProject("next");
    }

    componentWillUnmount() {
        document.removeEventListener('leaving', this.onLeave, false);
        document.removeEventListener('keydown', this.onKeyPress, false);
    }
    
    render() {

            var url = this.props.url;

            return (
                <div className={classNames("project", {open:this.state.open}) }>
                    <div className="row">
                        <div className="cell">
                            <div className={classNames( 'title-wrapper', { active : this.state.active } ) }>
                                {/*<h5 className="italic">{Projects[url].month}</h5>*/}
                                <header>
                                    <h1 ref="titleWrapper" dangerouslySetInnerHTML={{__html: Projects[url].title}}></h1>
                                    <span ref="purposeWrapper" className="square-tag">{Projects[url].purpose}</span>
                                </header>
                            </div>
                            <div className={classNames( 'content-wrapper', { active : this.state.active } ) }>
                                <p
                                    ref="textWrapper"
                                    dangerouslySetInnerHTML={{__html: Projects[url].content}}
                                    className={ "content", classNames({active:this.state.active}) }>
                                </p>
                                {/*<div ref="techTagWrapper" className="tech-tag-wrapper">
                                    {Projects[url].tags.map((object, i) => <div className="tech-tag">{object} </div>)}
                                </div>
                                <hr className="invisible clearfix"/>*/}
                                <a href={Projects[url].website} target="_blank" ref="sitelink" className="special-button">
                                    <span className="content">Visiter le site</span>
                                    <span className="extra first"></span>
                                    <span className="extra last"></span>
                                </a>
                            </div>
                            <a ref="prevProject" className="prev-project" onClick={ () => {this.nextProject("prev")} } >
                                <span/>
                            </a>
                            <a ref="nextProject" className="next-project" onClick={ () => {this.nextProject("next")} } >
                                <span/>
                            </a>
                            {/*<div ref="year" className="project-year">{Projects[url].year}</div>*/}
                            {/*<ImageZoomer alt="Image alt"
                                src='images/portfolio/pngs/framework_desktop.png'
                                zoomSrc='images/portfolio/pngs/framework_desktop.png'/>*/}
                        </div>
                        <div className="cell img-wrapper">
                            <div className="perspective-wrapper">
                                {Projects[url].img.map((object, i) => <img src={object} key={`img${i}`} ref={`img${i}`} className={`img-article img-article-${i}`}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            );


    }
}
