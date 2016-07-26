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
        this.state = {hover:false, isBackClicked: false};
        this.tl = new TimelineLite();
        this.loadingTl = new TimelineLite();
        this.leavingEvent = document.createEvent('Event');
        this.leavingEvent.initEvent('leaving', true, true);
        this.onClick = this.onClick.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.scroll = this.scroll.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    scroll() {

    }

    mouseOver() {
        this.setState({hover: true});
    }


    mouseOut() {
        this.setState({hover: false});
    }

    onClick(dest) {


        var link0 = this.refs.navLink0;
        var link1 = this.refs.navLink1;
        var link2 = this.refs.navLink2;
//        var link3 = this.refs.navLink3;
//        var link4 = this.refs.navLink4;

        if ($(this.refs.navLink0).hasClass("active")) {
            this.tl.kill({className:true}, [link1, link2]); // , link3, link4
            this.tl.set(link0, {className: '+=deployed'}, "-=0.1");
        }
        else if ($(this.refs.navLink1).hasClass("active")) {
            this.tl.kill({className:true}, [link0, link2]); // , link3, link4
            this.tl.set(link1, {className: '+=deployed'}, "-=0.1");
        }
        else if ($(this.refs.navLink2).hasClass("active")) {
            this.tl.kill({className:true}, [link0, link1]); // , link3, link4
            this.tl.set(link2, {className: '+=deployed'}, "-=0.1");
        }
        // else if ($(this.refs.navLink3).hasClass("active")) {
        //     this.tl.kill({className:true}, [link0, link1, link2, link4]);
        //     this.tl.set(link3, {className: '+=deployed'}, "-=0.1");
        // }
        // else if ($(this.refs.navLink4).hasClass("active")) {
        //     this.tl.kill({className:true}, [link0, link1, link2]); // , link3
        //     this.tl.set(link4, {className: '+=deployed'}, "-=0.1");
        // }
        else {
            this.tl.kill({className:true}, [link0, link1, link2]); // , link3, link4
        }


         if (!this.state.active){
            this.tl.play();
            this.setState( { active: true } );
         }
         else{
            this.tl.timeScale(1.5);
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

        this.setState( { isBackClicked : true } );

        setTimeout( () => {
            this.setState( { isBackClicked : false } );
        }, 300);

        setTimeout( () => {
              
            const url = this.props.location.pathname;
            var re = /.*\/.*\/[0-9]*/i;

            if (url.match(re) && url.match(/projet/i) )
                this.props.history.push('/portfolio');
            else if (url.match(re) && url.match(/photo/i) )
                this.props.history.push('/photo');
            else if( url.match(/portfolio/i) || url.match(/photo/i)) 
                this.props.history.push('/');
            else
                this.props.history.goBack();

        }, 1000);
    }

    componentDidMount() {

        var navTopWrapper = this.refs.navTopWrapper;

        this.loadingTl
        .fromTo(navTopWrapper, 0.2, { opacity:0 }, { opacity:1 }, "+=0.5")
        ;

        var link0 = this.refs.navLink0;
        var link1 = this.refs.navLink1;
        var link2 = this.refs.navLink2;
//        var link3 = this.refs.navLink3;
//        var link4 = this.refs.navLink4;

        this.tl.stop();
        this.tl
        .from(link0, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "+=0.3")
        .from(link1, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "-=0.1")
        .from(link2, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "-=0.1")
//        .from(link3, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "-=0.1")
//        .from(link4, 0.2, { opacity:0, y:-15, ease: Circ.easeInOut }, "-=0.1")

    }

    componentWillUnmount() {
    }

    render() {

        const url = this.props.location.pathname.replace(/\//g, '');

        var isBackButtonDisplayed = true;
        var urlToDisplay = "menu";

        if (url == "")
            isBackButtonDisplayed = false;
        if (url.includes("projet"))
            urlToDisplay = "projet";
        if (url.includes("gallerie"))
            urlToDisplay = "gallerie";
        if (url == "portfolio")
            urlToDisplay = "portfolio";
        if (url == "about")
            urlToDisplay = "a propos";
        if (url == "guidelines")
            urlToDisplay = "charte graphique";
        if (url == "blog")
            urlToDisplay = "blog";
        if (url == "photo")
            urlToDisplay = "photo";

        return (
            <div ref="navTopWrapper">
                <div ref="nav" className={ classNames( 'nav-wrapper displayed', { active : this.state.active }) }>
                    {/*<PreLoader/>*/}
                    <div className="nav-mobile-gradient"/>
                    {(function(mouseOver, mouseOut, props, isBackButtonDisplayed, onBack, isBackClicked, isHover) {
                      if (isBackButtonDisplayed) {
                        return (
                            <div className="nav-back">
                                <div
                                    onClick={onBack.bind(null, "")}
                                    onMouseOver={ () => {mouseOver()} }
                                    onMouseOut={ () => {mouseOut()} }
                                    className={ classNames( 'back-arrow', { active : isBackClicked }) }/>
                                <h5 className={ classNames( 'nav-typo', { visible : isHover }) }>
                                    retour
                                </h5>
                            </div>
                            ); 
                      } 
                    })(this.mouseOver, this.mouseOut, this.props, isBackButtonDisplayed, this.onBack, this.state.isBackClicked, this.state.hover)}

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
                                <li ref="navLink0" className={ classNames( { active: url == "portfolio" }, { active: url.includes("projet") } ) }>
                                    <a onClick={ () => { this.onClick("portfolio") }}>
                                        portfolio
                                    </a>
                                </li>
                                <li ref="navLink1" className={ classNames( { active: url == "about" } ) }>
                                    <a onClick={ () => { this.onClick("about") }}>
                                        à propos
                                    </a>
                                </li>
                                <li ref="navLink2" className={ classNames( { active: url == "contact" } ) }>
                                    <a onClick={ () => { this.onClick("contact") }}>
                                        contact
                                    </a>
                                </li>
                                {/*<li ref="navLink3" className={ classNames( { active: url == "photo" } ) }>
                                    <a onClick={ () => { this.onClick("photo") }}>
                                        photo
                                    </a>
                                </li>
                                <li ref="navLink4" className={ classNames( { active: url == "blog" } ) }>
                                    <a onClick={ () => { this.onClick("blog") }}>
                                        blog
                                    </a>
                                </li>*/}
                            </ul>
                        </div>
                        {/*<footer ref="navFooter">
                            <Link onClick={ ::this.onClick }
                                    activeClassName='active'
                                    to={`/guidelines`}
                            >
                                Guidelines
                            </Link>
                        </footer>*/}
                    </div>
                </div> 
                {this.props.children}
            </div> 
        );
    }
}
