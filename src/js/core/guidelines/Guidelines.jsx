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
 
export default class Guidelines extends Component {

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        var heart = "<3";

        return (
            <div className="screen-box guidelines">
                <div className="center">
                      <article>
                        <h2 className="h2">Colors</h2>
                        <br/>
                        <h5>Primary </h5>
                        <div className="row colors">
                          <div className="cell primary lighten-4"/>
                          <div className="cell primary lighten-3"/>
                          <div className="cell primary lighten-2"/>
                          <div className="cell primary lighten-1"/>
                          <div className="cell primary"/>
                          <div className="cell primary darken-1"/>
                          <div className="cell primary darken-2"/>
                          <div className="cell primary darken-3"/>
                          <div className="cell primary darken-4"/>
                        </div>
                         <h5>Complement </h5>
                        <div className="row colors">
                          <div className="cell complement lighten-4"/>
                          <div className="cell complement lighten-3"/>
                          <div className="cell complement lighten-2"/>
                          <div className="cell complement lighten-1"/>
                          <div className="cell complement"/>
                          <div className="cell complement darken-1"/>
                          <div className="cell complement darken-2"/>
                          <div className="cell complement darken-3"/>
                          <div className="cell complement darken-4"/>
                        </div>
                         <h5>Grey </h5>
                        <div className="row colors">
                          <div className="cell grey lighten-4"/>
                          <div className="cell grey lighten-3"/>
                          <div className="cell grey lighten-2"/>
                          <div className="cell grey lighten-1"/>
                          <div className="cell grey"/>
                          <div className="cell grey darken-1"/>
                          <div className="cell grey darken-2"/>
                          <div className="cell grey darken-3"/>
                          <div className="cell grey darken-4"/>
                        </div>
                        <h2 className="h2">Typography</h2>
                        <br/>
                        <h1>Title 1</h1>
                        <h2>Title 2</h2>
                        <h3>Title 3</h3>
                        <h4>Title 4</h4>
                        <h5>Title 5</h5>
                        <h6>Title 6</h6>
                        <p> I believe that we are who we choose to be. Nobody’s going to come and save you, you’ve got to save yourself. Nobody’s going to give you anything. You’ve got to go out and fight for it. Nobody knows what you want except for you. And nobody will be as sorry </p>
                        <blockquote>I believe that we are who we choose to be. Nobody’s going to come and save you, you’ve got to save yourself. Nobody’s going to give you anything. You’ve got to go out and fight for it. Nobody knows what you want except for you. And nobody will be as sorry as you if you don’t get it. So don’t give up on your dreams.</blockquote>

                    </article>

                </div>
                <footer>
                    <h6>{heart}</h6>
                </footer>

            </div>
        );
    }
}

