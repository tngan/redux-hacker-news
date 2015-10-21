import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import ItemThread from './ItemThread';
import url from 'url';
import { fetchItemThreadIfNeeded } from '../actions';
import { GIF_GRAY_ARROW_2X } from '../constants'; // load the gif data

import '../public/stylesheets/comment.css';

class CommentThread extends ItemThread {
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	getParentLink(props) {
		return (
			<a href="#">parent</a>
		);
	}

	getOnLink(props){
		return (
			<a href="#">{`on: `}</a>
		)
	}

	getCommentInfoHeader(props) {
		return (
			<div className="newscomment-header">
				{super.getAuthor(props)} {super.getLastUpdatedTime(props)} | {this.getParentLink(props)} | {this.getOnLink(props)}
			</div>
		);
	}

	getContent(props) {
		return (
			<div className="newscomment-content" dangerouslySetInnerHTML={{__html: props.text}}>
			</div>
		)
	}

	render() {
		let props = this.props.context || {};
		return (
			<div className="newsItem margin-left-10">
				{super.getVote()}
				<div className="newsItem-itemText">
					{this.getCommentInfoHeader(props)}
					{this.getContent(props)}
				</div>
			</div>
		);		
	}
}

CommentThread.propTypes = {
   	
};

export default CommentThread;