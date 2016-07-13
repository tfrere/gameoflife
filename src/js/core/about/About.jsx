import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
// import { Router, Route, Link } from 'react-router'
import ReactDOM                 from 'react-dom';
import ReactTooltip             from 'react-tooltip';

import FixedBackground           from 'component/FixedBackground';
import NavBar                    from 'component/NavBar';
import SideMenu                  from 'component/SideMenu';
import ShareMenu                 from 'component/ShareMenu';
import ScrollProgress            from 'component/ScrollProgress';
import KeyPress                  from 'component/KeyPress';

import Typographies             from 'config/typography';
import Colors                   from 'config/color';
import Placeholders             from 'config/placeholder';

import Config                   from 'config/config';


import TweenMax                 from 'gsap/src/minified/TweenMax.min.js';
import TweenLite                from 'gsap/src/minified/TweenLite.min.js';


export default class About extends Component {

    constructor( props ) {
        super( props );
        this.onLeave = this.onLeave.bind(this);
        this.tl = new TimelineLite();
    }
    onLeave() {
        this.tl.reverse();
    }

    componentDidMount(){
        document.addEventListener('leaving', this.onLeave, false);

        window.scrollTo(0,0);
        
        var textIntro = this.refs.textIntro;
        var blocIntro = this.refs.blocIntro;
        var textComplement = this.refs.textComplement;
        var firstTitle = this.refs.firstTitle;
        var rotatedSquare = this.refs.rotatedSquare;
        var rotatedTitle = this.refs.rotatedTitle;

        // var circle = this.refs.contactCircle;
        
        // var circle0 = this.refs.contactCircle0;
        // var circle1 = this.refs.contactCircle1;
        // var circle2 = this.refs.contactCircle2;
        // var circle3 = this.refs.contactCircle3;

        this.tl
        // .from(circle, 1, { y:-500, ease: Circ.easeInOut })
        // .set(circle0, {className: '+=active'}, "-=.6")
        // .set(circle1, {className: '+=active'}, "-=.5")
        // .set(circle2, {className: '+=active'}, "-=.4")
        // .set(circle3, {className: '+=active'}, "-=.3")
        .from(textIntro, 0.4, {opacity: 0, x:-20, ease: Circ.easeInOut}, "-=.3")
        .set(blocIntro, {className: '+=active'}, "+=.3")
        .from(textComplement, 0.4, {opacity: 0, x:-20, ease: Circ.easeInOut}, "-=.3")
        .from(firstTitle, 0.4, {opacity: 0, x:-20, ease: Circ.easeInOut}, "-=.3")
        .fromTo(rotatedTitle, 0.4, {opacity: 0, x:-20, rotate: -90, ease: Circ.easeInOut}, {opacity: 1, x:0, rotate: -90, ease: Circ.easeInOut}, "-=.3")
        .fromTo(rotatedSquare, 0.6, {opacity: 0, x:600, rotate: 45, ease: Circ.easeInOut}, {opacity: 1, x:0, rotate: 45, ease: Circ.easeInOut}, "-=.3")

    }

    componentWillUnmount() {
        document.removeEventListener('leaving', this.onLeave, false);

    }

    render() {

        var heart = "♡";

        return (
            <div ref="about" className="screen-box about">
                <article>
                    <div className="center-box screen-box">
                        <div className="center">
                            <div ref="rotatedSquare" className="rotated-square"/>
                            <div className="row">
                                <div className="cell">
                                    <h3 ref="rotatedTitle" className="rotated-title">A propos</h3>
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
                        </div>
                    </div>
                    <div className="container">
                        <h2 ref="firstTitle" className="add-top six-bottom"><span>I.</span>Compétences & Techniques</h2>
                        <section className="row">
                          <section className="cell">
                              <div className="icon-title">
                                  <i className="icon icon-tools"></i>
                                  <h3>Développement</h3>
                              </div>
                              <div className="clearfix invisible"></div>
                              <span className="square-tag">Compétences</span>
                              <div className="row row-gutter">
                                  <ul className="ul cell">
                                    <li>HTML5</li>
                                    <li>CSS3</li>
                                    <li>Sass / Less</li>
                                    <li>Gulp / Webpack</li>
                                    <li>Git</li>
                                  </ul>
                                  <ul className="ul cell">
                                    <li>JavaScript</li>
                                    <li>AngularJS</li>
                                    <li>nodeJS</li>
                                    <li>React</li>
                                    <li>jQuery</li>
                                  </ul>
                              </div>
                              <span className="square-tag">Patterns & Techniques</span>
                              <ul className="ul remove-bottom">
                                <li>Programmation orientée objet</li>
                                <li>MVC</li>
                                <li>Restfull API</li>
                                <li>Optimisations de performances</li>
                                <li>SEO</li>
                              </ul>
                          </section>
                          <section className="cell">
                              <div className="icon-title">
                                <i className="icon icon-design"></i>
                                <h3>Design</h3>
                              </div>
                              <div className="clearfix invisible"></div>
                              <span className="square-tag">Outils</span>
                              <div className="row row-gutter">
                                  <ul className="ul cell">
                                    <li>Photoshop</li>
                                    <li>Illustrator</li>
                                    <li>Inkscape</li>
                                    <li>The gimp</li>
                                  </ul>
                                  <ul className="ul cell">
                                    <li>Blender</li>
                                    <li>Maya</li>
                                    <li>Zbrush</li>
                                    <li>UxPin</li>
                                  </ul>
                              </div>
                              <span className="square-tag">Techniques</span>
                              <ul className="ul remove-bottom">
                                <li><a href="http://patternlab.io/" target="_blank">Atomic Design Methodology</a></li>
                                <li><a href="http://www.google.com/design/spec/material-design/introduction.html" target="_blank">Material Design</a></li>
                                <li>Golden Ratio Design and Typography</li>
                                <li>Pixel Perfect Layouts</li>
                              </ul>
                          </section>
                        </section>
                        <h2 className="six-top six-bottom"><span>II.</span>Prix & distinctions</h2>
                        <section className="row">
                          <section className="cell">
                                <div className="badge">
                                    <i className="icon icon-cup"></i>
                                </div>
                                <h4>Wearhacks Myo Price</h4>

                                <p>
                                    <b>Ecole 42</b>, mai 2015
                                </p>
                          </section>
                          <section className="cell">
                                <div className="badge">
                                    <i className="icon icon-cup"></i>
                                </div>
                                <h4>Innovators in motion Price</h4>

                                <p>
                                    <b>Telecom ParisTech</b>, mars 2014
                                </p>
                          </section>
                        </section>

                        <section className="trust">
                            <h2 className="six-bottom"><span>III.</span>Ils m'ont fait confiance</h2>
                            <div className="row row-gutter row-auto-height">
                                <div className="cell force-5">
                                    <div>
                                        <img src="../images/portfolio/pngs/bpifrance.png"/>
                                    </div>
                                </div>
                                <div className="cell force-5">
                                    <div>
                                        <img src="../images/portfolio/pngs/matthieuricard.png"/>
                                    </div>
                                </div>
                                <div className="cell force-5">
                                    <div>
                                        <img src="../images/portfolio/jpgs/cglorraine.jpg"/>
                                    </div>
                                </div>
                                <div className="cell force-5">
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

                        <footer>
                            <h6>{heart}</h6>
                        </footer>

                    </div>
                </article>

            </div>
        );
    }
}

