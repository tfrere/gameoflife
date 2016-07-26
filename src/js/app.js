import '../index.html';
import '../css/main.scss';

import React    			   from 'react';
import ReactDOM 			   from 'react-dom';
import Guidelines   		   from 'core/guidelines/Guidelines';
import Intro        		   from 'core/intro/Intro';
import notFound     		   from 'core/404/404';
import SmoothWheel  		   from 'component/SmoothWheel';

import Contact      		   from 'core/contact/Contact';

import About      			   from 'core/about/About';

import Nav          		   from 'core/nav/Nav';
import AlternativeNav          from 'core/nav/AlternativeNav';

import Blog         		   from 'core/blog/Blog';
import ArticleWrapper          from 'core/blog/ArticleWrapper';

import Timeline     		   from 'core/timeline/Timeline';
import ProjectWrapper      	   from 'core/timeline/ProjectWrapper';

import Galleries      		   from 'core/photo/Galleries';
import GalleryWrapper 		   from 'core/photo/GalleryWrapper';

import KeyPress     		   from 'component/KeyPress';

import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render((
	<Router history={browserHistory}>
		<Router component={KeyPress}/>
		<Route component={Nav}>
			<Route path="/" component={Intro}/>
			<Route path="photo" component={Galleries}/>
			<Route path="photo/gallerie/:galleryId" component={GalleryWrapper}/>
			<Route path="portfolio" component={Timeline}/>
			<Route path="projet/:projectId" component={ProjectWrapper}/>
			<Route path="blog" component={Blog}/>
			<Route path="blog/:yearId/:articleId" component={ArticleWrapper}/>
			<Route path="contact" component={Contact}/>
			<Route path="guidelines" component={Guidelines}/>
			<Route path="about" component={About}/>
			<Route path="*" component={notFound} />
		</Route>
	</Router>
), document.getElementById( 'app-container' ))