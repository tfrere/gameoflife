import $                                from 'jquery';
import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import PreLoader                from 'component/PreLoader';
import { Router, Route, Link, browserHistory } from 'react-router';

import TweenMax from 'gsap/src/minified/TweenMax.min.js';
import TweenLite from 'gsap/src/minified/TweenLite.min.js';

// scroll lock mixin for react
//https://codepen.io/somethingkindawierd/post/react-mixin-scroll-lock

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
        this.scroll = this.scroll.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    scroll() {

    }

    onClick(dest) {


        var link0 = this.refs.navLink0;
        var link1 = this.refs.navLink1;
        var link2 = this.refs.navLink2;

        if ($(this.refs.navLink0).hasClass("active")) {
            this.tl.kill({className:true}, [link1, link2]);
            this.tl.set(link0, {className: '+=deployed'}, "-=0.1");
        }
        else if ($(this.refs.navLink1).hasClass("active")) {
            this.tl.kill({className:true}, [link0, link2]);
            this.tl.set(link1, {className: '+=deployed'}, "-=0.1");
        }
        else if ($(this.refs.navLink2).hasClass("active")) {
            this.tl.kill({className:true}, [link0, link1]);
            this.tl.set(link2, {className: '+=deployed'}, "-=0.1");
        }
        else {
            this.tl.kill({className:true}, [link0, link1, link2]);
        }


         if (!this.state.active){
            this.tl.play();
            this.setState( { active: true } );
         }
         else{
            this.tl.timeScale(1.5);
            this.tl.seek(-0.4);
            this.tl.reverse();
            setTimeout( () => {
                this.setState( { active: false } );
                this.tl.timeScale(1);
                if (dest) {
                    if (dest == "contact")
                        this.props.history.push('/contact');
                    else if(dest == "portfolio") 
                        this.props.history.push('/portfolio');
                    else if (dest == "about")
                        this.props.history.push('/about');
                    else if (dest == "blog")
                        this.props.history.push('/blog');
                    else if (dest == "photo")
                        this.props.history.push('/photo');
                    else if (dest == "guidelines")
                        this.props.history.push('/guidelines');
                }
            }, 350 );
         }
    }

    onBack() {

        document.dispatchEvent(this.leavingEvent);

        setTimeout( () => {
            const url = this.props.location.pathname;
            var re = /.*\/.*\/[0-9]*/i;

            if (url.match(re))
                this.props.history.push('/portfolio');
            else if( url.match(/portfolio/i) ) 
                this.props.history.push('/');
            else if (window.history.length > 1)
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

        console.log($(this.refs.navLink1).hasClass("active"));

        this.tl.stop();
        this.tl
        .from(link0, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "+=0.3")
        .from(link1, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "-=0.1")
        .from(link2, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "-=0.1")
        .from(footer, 0.4, { opacity:0, ease: Circ.easeInOut })

    }

    componentWillUnmount() {
    }

    render() {

        const url = this.props.location.pathname.replace(/\//g, '');
        //console.log(url);
        var isBackButtonDisplayed = true;
        var urlToDisplay = "menu";

        if (url == "")
            isBackButtonDisplayed = false;
        console.log(url);
        if (url.includes("projet"))
            urlToDisplay = "projet";
        if (url == "portfolio")
            urlToDisplay = "portfolio";
        if (url == "guidelines")
            urlToDisplay = "charte graphique";
        if (url == "about")
            urlToDisplay = "a propos";


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
                        {urlToDisplay}
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
                                <li ref="navLink0" className={ classNames( { active: url == "contact" } ) }>
                                    <a onClick={ () => { this.onClick("contact") }}>
                                        contact
                                    </a>
                                </li>
                                <li ref="navLink1" className={ classNames( { active: url == "about" } ) }>
                                    <a onClick={ () => { this.onClick("about") }}>
                                        a propos
                                    </a>
                                </li>
                                <li ref="navLink2" className={ classNames( { active: url == "portfolio" }, { active: url.includes("projet") } ) }>
                                    <a onClick={ () => { this.onClick("portfolio") }}>
                                        portfolio
                                    </a>
                                </li>
                            </ul>
                            <footer ref="navFooter">
                                <a onClick={ () => { this.onClick("blog") }} >
                                    blog
                                </a>
                                <a onClick={ () => { this.onClick("photo") }} >
                                    photo
                                </a>
                                <a onClick={ () => { this.onClick("guidelines") }} >
                                    charte graphique 
                                </a>
                                <a className="right" href="mailto:ecrire@tfrere.fr">
                                    ecrire@tfrere.fr
                                </a>
                            </footer>
                        </div>
                    </div>
                </div> 
                {this.props.children}
            </div> 
        );
    }
}
