import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import url from 'url';
import { fetchItemThreadIfNeeded } from '../actions';
import { getVote, getAuthor, getLastUpdatedTime } from './Composition';

import '../public/stylesheets/thread.css';

class ItemThread extends Component {

    constructor(props) {
        super(props);
        this._id = this.props.threadId;
        this._rank = this.props.rank; // Rank is not included in context object
    }

    getCommentLink(props) {
        let commentText = 'discuss';
        if (props.kids && props.kids.length) {
          commentText = props.kids.length + ' comments';
        }
        return (
            <a href={'https://news.ycombinator.com/item?id=' + props.id}>{commentText}</a>
        );
    }

    getSubtext(props, cleanDisplay = false) {
        return !cleanDisplay ? (
            <div className="newsItem-subtext">
                {props.score} points by {getAuthor(props)} {getLastUpdatedTime(props)} | {this.getCommentLink(props)}
            </div>
        ) : (
            <div className="newsItem-subtext">
                {getLastUpdatedTime(props)}
            </div>
        );
    }

    getRank(props) {
        return (
          <div className="newsItem-rank">
            {this._rank}.
          </div>
        );
    }

    getDomainName(props) {
        let threadUrl = props.url || '',
            parseUrl = url.parse(threadUrl),
            hostname = parseUrl.hostname || '',
            protocol = parseUrl.protocol + '//' || '',
            host = protocol + hostname;
        return {
            hostname: hostname === '' ? '' : `(${hostname})`,
            threadUrl,
            host
        };
    }

    getTitle(props) {
        let {hostname,threadUrl,host} = this.getDomainName(props);
        return (
            <div className="newsItem-title">
                <a className="newsItem-titleLink" href={props.url}>{props.title}</a>
                <span className="newsItem-domain">
                    {hostname}
                </span>
            </div>
        );
    }

    render() {
        let props = this.props.context || {};
        let cleanDisplay = this.props.selectedPath === 'jobs';

        return cleanDisplay ? (
            <div className="newsItem margin-left-10">
                <div className="newsItem-itemText">
                    {this.getTitle(props)}
                    {this.getSubtext(props,true)}
                </div>
            </div>
        ) : (
            <div className="newsItem">
                {this.getRank(props)}
                {getVote(props)}
                <div className="newsItem-itemText">
                    {this.getTitle(props)}
                    {this.getSubtext(props)}
                </div>
            </div>
        );
    }
}

export default ItemThread;
