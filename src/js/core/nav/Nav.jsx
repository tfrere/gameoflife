import $                                from 'jquery';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import PreLoader                from 'component/PreLoader';
import { Router, Route, Link, browserHistory } from 'react-router';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';


export default class Nav extends Component {


    static defaultProps = {
        onClick : () => true,
        url: ""
    };

    constructor( props ) {
        super( props );
        this.state = {};
        this.tl = new TimelineLite();
        this.leavingEvent = document.createEvent('Event');
        this.leavingEvent.initEvent('leaving', true, true);
        this.onClick = this.onClick.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onClick() {
         this.props.onClick();
         if (!this.state.active){
            this.tl.play();
            this.setState( { active: true } );
         }
         else{
            this.setState( { active: false } );
            setTimeout( () => {
                this.tl.seek(0);
                this.tl.reverse();
            }, 100 );
         }
    }

    onBack() {

        console.log(this);
        document.dispatchEvent(this.leavingEvent);

        setTimeout( () => {
            //console.log(this.props.history);

            const url = this.props.location.pathname;
            var re = /.*\/.*\/[0-9]*/i;

            if (url.match(re))
                this.props.history.push('/portfolio');
            else if( url.match(/portfolio/i) ) 
                this.props.history.push('/');
            else
                this.props.history.goBack();

        }, 1000);
    }

    componentDidMount() {


        var footer = this.refs.navFooter;
        var link0 = this.refs.navLink0;
        var link1 = this.refs.navLink1;
        var link2 = this.refs.navLink2;
        var link3 = this.refs.navLink3;

        this.tl.stop();
        this.tl
        .from(link0, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "+=0.3")
        .from(link1, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "-=0.1")
        .from(link2, 0.2, { opacity:0, x:-25, ease: Circ.easeInOut }, "-=0.1")
        .from(footer, 0.2, { opacity:0, y:40, ease: Circ.easeInOut }, "-=0.3");
    }

    componentWillUnmount() {
    }

    render() {

        var url = this.props.location.pathname;
        //console.log(url);
        var isBackButtonDisplayed = true;

        if (url == "/"){
            isBackButtonDisplayed = false;
            var url = "menu";
        }
        else 
            url = url.replace(/\//g, ' ');

        if (url.includes("projet"))
            url = "projet";
        if (url.includes("guidelines"))
            url = "charte graphique";

        return (
            <div>
                <div className={ classNames( 'nav-wrapper displayed', { active : this.state.active }) }>
                    {/*<PreLoader/>*/}
                    <div className="nav-mobile-gradient"/>
                    {(function(props, isBackButtonDisplayed, onBack) {
                      if (isBackButtonDisplayed) {
                        return (
                            <div className="nav-back" onClick={onBack.bind(null, "")}>
                                <div className="back-arrow"/>
                                <h5 className="nav-typo"> retour </h5>
                            </div>
                            ); 
                      } 
                    })(this.props, isBackButtonDisplayed, this.onBack)}

                    <h5 className={classNames("nav-info", "nav-typo", { "active": this.state.active})}>
                        {url}
                    </h5>
                    <div className="nav-button">
                        <div onClick={ ::this.onClick } className={ classNames( 'burger-menu', { active : this.state.active } ) }>
                            <div></div>
                        </div>
                    </div>
                    <div className="nav-overlay"/>
                    <div className="nav">
                        <div>
                            <ul>
                                <li ref="navLink0">
                                    <Link onClick={ ::this.onClick }
                                            activeClassName='active'
                                            to={`/blog`}
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li ref="navLink1">
                                    <Link onClick={ ::this.onClick }
                                            activeClassName='active'
                                            to={`/contact`}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li ref="navLink2">
                                    <Link onClick={ ::this.onClick }
                                            activeClassName='active'
                                            to={`/portfolio`}
                                    >
                                        Portfolio
                                    </Link>

                                </li>
                            </ul>
                            <footer ref="navFooter">
                                <Link onClick={ ::this.onClick }
                                        activeClassName='active'
                                        to={`/guidelines`}
                                >
                                    Charte graphique 
                                </Link>
                            </footer>
                        </div>
                    </div>
                </div> 
                {this.props.children}
            </div> 
        );
    }
}
