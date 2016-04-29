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


export default class Guidelines extends Component {

    constructor( props ) {
        super( props );
        this.tl = new TimelineLite();
    }

    componentWillMount() {
    }

    componentDidMount(){
        var guidelines = this.refs.guidelines;
        this.tl
        .fromTo(guidelines, 0.3, {opacity:0, y:-20, ease: Cubic.linear},{opacity:1, y:0, ease: Cubic.linear}, "+=0.5");
    }

    render() {

        var heart = "♡";

        return (
            <div ref="guidelines" className="screen-box guidelines">
                <div className="center">
                      <article>
                        <h1>Titre principal</h1>
                        <h3>Title secondaire</h3>
                        <div className="square-tag">tag</div>
                        <p> Equitis Romani autem esse filium criminis <a href='#'>loco poni</a> ab accusatoribus neque his iudicantibus oportuit neque defendentibus nobis. Equitis Romani autem esse filium criminis loco poni ab accusatoribus neque his iudicantibus oportuit neque defendentibus nobis. </p>
                        <blockquote>Nam quod de pietate dixistis, est quidem ista nostra existimatio, sed iudicium certe parentis; quid nos opinemur, audietis ex iuratis; quid parentes sentiant, lacrimae matris incredibilisque maeror, squalor patris et haec praesens maestitia, quam cernitis, luctusque declarat.</blockquote>
                        <blockquote className="pullquote">
                          <p>The less you reveal the more people can wonder.</p>
                          <footer>Henri Ford.</footer>
                        </blockquote>
                        <hr className="invisible"/>
                        <div className="tech-tag">mot clé 1 </div>
                        <div className="tech-tag">mot clé 2 </div>
                        <div className="tech-tag">mot clé 3 </div>
                        <hr className="lines"/>
                        <div className="row">
                          <div className="cell">
                            <div className="row colors">
                              <div className="cell force-1 primary"/>
                              <div className="cell force-2 primary lighten-2"/>
                              <div className="cell force-2 primary darken-2"/>
                            </div>
                          </div>
                          <div className="cell">
                            <div className="row colors">
                              <div className="cell force-1 complement"/>
                              <div className="cell force-2 complement lighten-2"/>
                              <div className="cell force-2 complement darken-2"/>
                            </div>
                          </div>
                        </div>
                    </article>

                </div>
                <footer>
                    <h6>{heart}</h6>
                </footer>

            </div>
        );
    }
}

