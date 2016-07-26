

import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import ReactDOM                 from 'react-dom';
import classNames               from 'classnames';

import Articles                 from 'config/articles';

export default class ProjectCard extends Component {
 
    static defaultProps = {
        onClick : () => true
    };

    constructor( props ) {
        super( props );
        this.state = {active:false, hover: false};
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
    }

    componentDidMount() {
    }

    mouseOver() {
        this.setState({hover: true});
    }


    mouseOut() {
        this.setState({hover: false});
    }

    componentWillUnmount() {
    }

    onClick() {

        //console.log("onclickarticle");
         this.props.onClick();
         this.setState( { active: true } );

        setTimeout( () => {
            //console.log(this.props.history);
            this.setState( { active : false } );
            this.props.history.pushState(null, '/projet/'+ this.props.id);
        }, 450 );
    }

    render() {

        return (
            <div className={ classNames( {clicked:this.state.active} ) }>
                <div className="img-wrapper">
                    <img className={classNames({hover:this.state.hover, clicked:this.state.active})}
                         src={this.props.data.img[0]} />
                </div>
                <a  onMouseOver={ () => {this.mouseOver()} }
                    onMouseOut={ () => {this.mouseOut()} }
                    onClick={ ::this.onClick }>
                    <div className={classNames("delay-" + this.props.id)}>
                        <div className="circle"></div>
                        <div className="cell-wrapper">
                            <div className="data">
                                <h5 className="italic">{this.props.data.month}</h5>
                                <h2>{this.props.data.title}</h2>
                                <p>{this.props.data.short}</p>
                                <div className="clearfix"></div>
                                <span className="square-tag">{this.props.data.purpose}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

