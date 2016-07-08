import '../index.html';
import '../css/main.scss';

import React    	from 'react';
import ReactDOM 	from 'react-dom';
import Guidelines   from 'core/guidelines/Guidelines';
import Blog         from 'core/blog/Blog';
import Intro        from 'core/intro/Intro';
import SmoothWheel  from 'component/SmoothWheel';

import Contact      from 'core/contact/Contact';
import AlternativeContact      from 'core/contact/AlternativeContact';

import About      from 'core/about/About';

import Nav          from 'core/nav/Nav';
import AlternativeNav          from 'core/nav/AlternativeNav';

import Timeline     from 'core/timeline/Timeline';
import ProjectWrapper      from 'core/timeline/ProjectWrapper';

import Galleries      from 'core/photo/Galleries';
import GalleryWrapper from 'core/photo/GalleryWrapper';

import KeyPress     from 'component/KeyPress';

import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render((
	<Router history={browserHistory}>
		<Router component={KeyPress}/>
		<Route path="/" component={Intro}/>
		<Route component={Nav}>
			<Route path="photo" component={Galleries}/>
			<Route path="photo/gallerie/:galleryId" component={GalleryWrapper}/>
			<Route path="portfolio" component={Timeline}/>
			<Route path="projet/:projectId" component={ProjectWrapper}/>
			<Route path="blog" component={Blog}/>
			<Route path="contact" component={AlternativeContact}/>
			<Route path="guidelines" component={Guidelines}/>
			<Route path="about" component={About}/>
		</Route>
	</Router>
), document.getElementById( 'app-container' ))