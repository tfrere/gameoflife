import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link }  from 'react-router'
import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';

import Projects                 from 'config/projects';
import ProjectCard              from 'core/timeline/ProjectCard';
import ProjectWrapper           from 'core/timeline/ProjectWrapper';
import Project                  from 'core/timeline/Project';


import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

export default class Timeline extends Component {

    static defaultProps = {
        onClick : () => true
    };

    constructor( props ) {
        super( props );
        this.state = {
            clicked:false,
            isScrolled: false
        };
        this.onClick = this.onClick.bind(this);
        this.scroll = this.scroll.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.tl = new TimelineLite();
    }

    scroll() {

        var scrollTop = $(window).scrollTop();

        if (scrollTop >= 50)
        {
            setTimeout( () => {
                this.setState( { isScrolled : true } );
            }, 200 );
        }
        else {
            setTimeout( () => {
                this.setState( { isScrolled : false } );
            }, 200 );
        }
    }

    onClick() {
         this.props.onClick();
         this.setState( { clicked: true } );
        setTimeout( () => {
            this.setState( { clicked : false } );
        }, 600 );
    }

    onLeave() {
        document.removeEventListener('scroll', this.scroll);
        this.tl.seek(1)
        this.tl.reverse();
    }

    componentDidMount(){

        document.addEventListener('scroll', this.scroll);
        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);

        var timeline = this.refs.timeline;
        var line = this.refs.timelineLine;
        var thisYear = this.refs.thisYear;
        var projectLength = Projects.length;

        var project0 = this.refs.project0;
        var project1 = this.refs.project1;
        var project2 = this.refs.project2;
        var project3 = this.refs.project3;

        this.tl
        .fromTo(line, 1, { opacity:0, y:500, ease: Cubic.linear },
                            { opacity:1, y:0, ease: Cubic.linear }, "+=0.2")
        .fromTo(thisYear, 0.5, { opacity:0, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear }, "-=0.2")
        .fromTo(project0, 0.5, { opacity:0, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear }, "-=0.2")
        .fromTo(project1, 0.5, { opacity:0, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear })
        .fromTo(project2, 0.5, { opacity:0, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear })
        .fromTo(project3, 0.5, { opacity:0, ease: Cubic.linear }, { opacity:1, y:0, ease: Cubic.linear });

    }

    componentWillUnMount() {
        console.log("unmountedyeah");
        document.removeEventListener('leaving', this.onLeave, false);
        document.removeEventListener('scroll', this.scroll);
    }

    render() {

        return (
            <div className={classNames("timeline", {clicked: this.state.clicked}) }>

                <div ref="timeline" className="row row-gutter">

                     <div ref="thisYear" className={classNames("this-year visible", {active: this.state.isScrolled ? false : true}, {clicked: this.state.clicked}) }>
                        <span>Cette année</span>
                        <span>{Projects[0].year}</span>
                     </div>

                     {Projects.map((object, i) => <div key={`project${i}`} className={classNames("cell force-1", {addPlaceForYear: object.isLastProjectOfYear && i != 0}) }
                                                    ref={`project${i}`}>
                                                    <div key={`date${i}`} className={classNames("year", {visible: object.isLastProjectOfYear && i != 0}) }>{object.year}</div>
                                                    <ProjectCard 
                                                        onClick={ ::this.onClick } 
                                                        history={this.props.history} 
                                                        data={object}
                                                        id={i}
                                                        key={`projectCard${i}`} />
                                                  </div>
                      )}
                    <div ref="timelineLine" className="line"/>
                </div>
            </div>
        );

    }
}

