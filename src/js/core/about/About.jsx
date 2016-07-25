import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
// import { Router, Route, Link } from 'react-router'
import ReactDOM                 from 'react-dom';
import ReactTooltip             from 'react-tooltip';
import classNames               from 'classnames';

import FixedBackground           from 'component/FixedBackground';
import NavBar                    from 'component/NavBar';
import SideMenu                  from 'component/SideMenu';
import ShareMenu                 from 'component/ShareMenu';
import ScrollProgress            from 'component/ScrollProgress';
import KeyPress                  from 'component/KeyPress';
import Waypoint                  from 'component/Waypoint';

import Typographies             from 'config/typography';
import Colors                   from 'config/color';
import Placeholders             from 'config/placeholder';

import Config                   from 'config/config';


import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';


export default class About extends Component {

    constructor( props ) {
        super( props );
        this.state = {waypointOne: false, isMounted: false};
        this.onLeave = this.onLeave.bind(this);
        this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
        this.tl = new TimelineLite();
    }
    onLeave() {
        this.tl.timeScale(1.5);
        this.tl.reverse();
    }

    handleWaypointEnter() {
        console.log(1);
        if(this.state.isMounted)
            this.setState({waypointOne: true});
        console.log(this.state.waypointOne);

    }

    componentDidMount(){
        document.addEventListener('leaving', this.onLeave, false);
        this.setState({isMounted: true});

        window.scrollTo(0,0);
        
        var textIntro = this.refs.textIntro;
        var blocIntro = this.refs.blocIntro;
        var textComplement = this.refs.textComplement;
        var firstTitle = this.refs.firstTitle;
        var rotatedSquare = this.refs.rotatedSquare;
        var rotatedTitle = this.refs.rotatedTitle;

        this.tl
        .set(blocIntro, {className: '+=active'}, "+=0.3")
        .from(textIntro, 0.4, {opacity: 0, x:-20, ease: Circ.easeInOut}, "-=.3")
        .from(textComplement, 0.4, {opacity: 0, x:-20, ease: Circ.easeInOut}, "-=.3")
        .from(firstTitle, 0.4, {opacity: 0, x:-20, ease: Circ.easeInOut}, "-=.3")
        .fromTo(rotatedTitle, 0.4, {opacity: 0, x:-20, rotation: -90, ease: Circ.easeInOut}, {opacity: 1, x:0, rotation: -90, ease: Circ.easeInOut}, "-=.3")
        .fromTo(rotatedSquare, 0.6, {opacity: 0, x:600, y:600, rotation: 45, ease: Circ.easeInOut}, {opacity: 1, x:0, y:0, rotation: 45, ease: Circ.easeInOut}, "-=.5")

    }

    componentWillUnmount() {
        document.removeEventListener('leaving', this.onLeave, false);
        this.setState({isMounted: true});
    }

    render() {

        var heart = "♡";

        return (
            <div ref="about" className="screen-box about">
                <article>
                    <div className="center-box screen-box">
                        <div className="center">
                            <div ref="rotatedSquare" className="rotated-square"/>
                            <h3 ref="rotatedTitle" className="rotated-title">Introduction</h3>
                            {/*<div className="circle-placeholder"></div>*/}
                            <div ref="blocIntro" className="bloc-intro">
                                <p ref="textIntro" className="text-introduction"> <b>Designer front end</b> avec plus de 7 ans d'éxperience dans le monde professionnel.</p>
                                <p className="two-col" ref="textComplement"> De formation <b>peintre en lettre</b> — passionné de technologies — <b>directeur de création 3D</b> en agence à 16 ans, j'ai complété ma formation à l'école 42 le temps d'aquérir une certaine méthodologie dans ma manière de programmer. Je peux travailler avec des <b>designers</b> comme des <b>ingénieurs back-end</b> ou comme <b>développeur fullstack</b> sur de petits projets. Ai connaissance des méthodologies agiles.</p>
                            </div>
                            {/*<div ref="contactCircle" className="circle photo">
                                <div className="circle-form">
                                </div>
                                <a target="_blank" href="https://www.linkedin.com/in/thibaud-frere-3462b264">
                                    <div ref="contactCircle0" className="delay-0 small-circle linkedin"/>
                                </a>    
                                <a target="_blank" href="https://codepen.io/tfrere">
                                    <div ref="contactCircle1" className="delay-1 small-circle twitter"/>
                                </a>    
                                <a target="_blank" href="http://github.com/tfrere">
                                    <div ref="contactCircle2" className="delay-2 small-circle github"/>
                                </a>    
                                <a target="_blank" href="https://www.behance.net/frerethibaud9207">
                                    <div ref="contactCircle3" className="delay-3 small-circle behance"/>
                                </a>    
                            </div>*/}
                        </div>
                    </div>
                    <div className="container">
                        <h2 ref="firstTitle" className="add-top apptitude"><span>I.</span>Compétences & Techniques</h2>
                        <section className={classNames("row hidden", {visible: this.state.isMounted})}>
                          <section className="cell">
                              <div className="icon-title">
                                  <i className="icon icon-tools"></i>
                                  <h3>Développement</h3>
                              </div>
                              <div className="clearfix invisible"></div>
                              <span className="square-tag">Compétences</span>
                              <div className="row row-gutter">
                                  <ul className="ul cell sm-force-2">
                                    <li>HTML5</li>
                                    <li>CSS3</li>
                                    <li>Sass / Less</li>
                                    <li>Gulp / Webpack</li>
                                    <li>Git</li>
                                  </ul>
                                  <ul className="ul cell sm-force-2">
                                    <li>JavaScript</li>
                                    <li>AngularJS</li>
                                    <li>nodeJS</li>
                                    <li>React</li>
                                    <li>jQuery</li>
                                  </ul>
                              </div>
                              <Waypoint onEnter={ () => { this.handleWaypointEnter() } } />
                              <span className="square-tag">Patterns & Techniques</span>
                            <div className="row row-gutter">
                              <ul className="ul cell remove-bottom">
                                <li>Programmation orientée objet</li>
                                <li>MVC</li>
                                <li>Restfull API</li>
                                <li>Optimisations de performances</li>
                                <li>SEO</li>
                              </ul>
                            </div>
                          </section>
                          <section className="cell">
                              <div className="icon-title">
                                <i className="icon icon-design"></i>
                                <h3>Design</h3>
                              </div>
                              <div className="clearfix invisible"></div>
                              <span className="square-tag">Outils</span>
                              <div className="row row-gutter">
                                  <ul className="ul cell sm-force-2">
                                    <li>Photoshop</li>
                                    <li>Illustrator</li>
                                    <li>Inkscape</li>
                                    <li>The gimp</li>
                                    <li>Atom</li>
                                  </ul>
                                  <ul className="ul cell sm-force-2">
                                    <li>Blender</li>
                                    <li>Maya</li>
                                    <li>Zbrush</li>
                                    <li>UxPin</li>
                                  </ul>
                              </div>
                              <span className="square-tag">Techniques</span>
                            <div className="row row-gutter">
                              <ul className="ul cell remove-bottom">
                                <li><a href="http://patternlab.io/" target="_blank">Atomic Design Methodology</a></li>
                                <li><a href="http://www.google.com/design/spec/material-design/introduction.html" target="_blank">Material Design</a></li>
                                <li>Golden Ratio Design and Typography</li>
                                <li>Pixel Perfect Layouts</li>
                              </ul>
                            </div>
                          </section>
                        </section>
                        <h2 className="six-top six-bottom"><span>II.</span>Prix & distinctions</h2>
                        <section className="row">
                          <section className="cell badge-wrapper">
                                <div className="badge">
                                    {/*<i className="icon icon-cup"></i>*/}
                                </div>
                                <h4>Wearhacks Myo Price</h4>

                                <p>
                                    <b>Ecole 42</b>
                                    <span>mai 2015</span>
                                </p>
                          </section>
                          <section className="cell badge-wrapper">
                                <div className="badge">
                                    {/*<i className="icon icon-cup"></i>*/}
                                </div>
                                <h4>Innovators in motion Price</h4>

                                <p>
                                    <b>Telecom ParisTech</b>
                                    <span>mars 2014</span>
                                </p>
                          </section>
                        </section>
                        <Waypoint onEnter={ () => { this.handleWaypointEnter() } } />
                        <section className="trust">
                            <h2 className="six-bottom"><span>III.</span>Clients</h2>
                            <div className="row row-gutter row-auto-height">
                                <div className="cell">
                                    <div>
                                        <img src="../images/portfolio/pngs/bpifrance.png"/>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div>
                                        <img src="../images/portfolio/pngs/matthieuricard.png"/>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div>
                                        <img src="../images/portfolio/jpgs/cglorraine.jpg"/>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div>
                                        <img src="../images/portfolio/pngs/humabio.png"/>
                                    </div>
                                </div>
                                <div className="cell force-5">
                                    <div>
                                        <img src="../images/portfolio/pngs/labrh.png"/>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/*<section className="trust">
                            <h2 className="six-bottom">Pour me contacter</h2>
                            <div className="row row-gutter row-auto-height">
                                <div className="cell">
                                    <a ref="cta" className={classNames("cta special-button") }>
                                        <span className="content">C'est par ici</span>
                                        <span className="extra first"></span>
                                        <span className="extra last"></span>
                                    </a>
                                </div>
                            </div>
                        </section>*/}

                        <footer>
                            <h6>{heart}</h6>
                        </footer>

                    </div>
                </article>

            </div>
        );
    }
}

