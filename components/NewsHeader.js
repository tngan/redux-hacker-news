import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GIF_Y18, GIF_S, BASE_API_URL, YCOMB_DOMAIN, NEWS_DOMAIN } from '../constants'; // load the gif data
import '../public/stylesheets/header.css';

class NewsHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="newsHeader">
	        	<div className="newsHeader-logo">
		        	<a href="YCOMB_DOMAIN">
		        		<img src={GIF_Y18} />
		        	</a>
		      	</div>
	        	<div className="newsHeader-title">
		        	<a className="newsHeader-textLink" href={NEWS_DOMAIN}>Hacker News</a>
		      	</div>
		      	<div className="newsHeader-nav">
			      	<a key="newest" className="newsHeader-navLink newsHeader-textLink" href={`${NEWS_DOMAIN}newest`}>
	              		new
            		</a>
            		<a key="newcomments" className="newsHeader-navLink newsHeader-textLink" href={`${NEWS_DOMAIN}newcomments`}>
	              		comments
            		</a>
            		<a key="show" className="newsHeader-navLink newsHeader-textLink" href={`${NEWS_DOMAIN}show`}>
	              		show
            		</a>
            		<a key="ask" className="newsHeader-navLink newsHeader-textLink" href={`${NEWS_DOMAIN}ask`}>
	              		ask
            		</a>
            		<a key="jobs" className="newsHeader-navLink newsHeader-textLink" href={`${NEWS_DOMAIN}jobs`}>
	              		jobs
            		</a>
            		<a key="submit" className="newsHeader-navLink newsHeader-textLink" href={`${NEWS_DOMAIN}submit`}>
	              		submit
            		</a>
            	</div>
            	<div className="newsHeader-login">
		        	<a className="newsHeader-textLink" href="https://news.ycombinator.com/login?whence=news">login</a>
		      	</div>
	      	</div>
		);
	}
}

export default NewsHeader;