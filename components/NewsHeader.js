import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GIF_Y18, GIF_S, BASE_API_URL, YCOMB_DOMAIN, NEWS_DOMAIN } from '../constants'; // load the gif data
import '../public/stylesheets/header.css';

class NewsHeader extends Component {

	constructor(props) {
		super(props);
		this._selectedPath = props.selectedPath || '';
	}

	getNavItem(config, isFocus = false){
		let {link, display} = config,
		 	style = isFocus ? 'link-selected' : '';
  		return (
			<a key={link} className={`newsHeader-navLink newsHeader-textLink ${style}`} href={`${NEWS_DOMAIN}${link}`}>
          		{display}
    		</a>
		);
	}
	
	render() {
		let navItemConfigs = [{
			link: 'newest',
			display: 'new'
		},{
			link: 'newcomments',
			display: 'comments'
		},{
			link: 'show',
			display: 'show'
		},{
			link: 'ask',
			display: 'ask'
		},{
			link: 'jobs',
			display: 'jobs'
		},{
			link: 'submit',
			display: 'submit'
		}];

		return (
			<div className="newsHeader">
	        	<div className="newsHeader-logo">
		        	<a href="/">
		        		<img src={GIF_Y18} />
		        	</a>
		      	</div>
	        	<div className="newsHeader-title">
		        	<a className="newsHeader-textLink" href={NEWS_DOMAIN}>Hacker News</a>
		      	</div>
		      	<div className="newsHeader-nav">
			      	{ navItemConfigs.map(config => this.getNavItem(config, this._selectedPath === config.link)) }
            	</div>
            	<div className="newsHeader-login">
		        	<a className="newsHeader-textLink" href="https://news.ycombinator.com/login?whence=news">login</a>
		      	</div>
	      	</div>
		);
	}
}

export default NewsHeader;