import React, { Component } from 'react';
import { getVote, getAuthor, getLastUpdatedTime } from './Composition';

import '../public/stylesheets/comment.css';

class CommentThread extends Component {

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
				{getAuthor(props)} {getLastUpdatedTime(props)} | {this.getParentLink(props)} | {this.getOnLink(props)}
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
			<div className="newsItem">
				{getVote(props)}
				<div className="newsItem-itemText">
					{this.getCommentInfoHeader(props)}
					{this.getContent(props)}
				</div>
			</div>
		);		
	}
}

export default CommentThread;