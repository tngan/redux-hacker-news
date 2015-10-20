import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import url from 'url';
import { fetchItemThreadIfNeeded } from '../actions';
import { GIF_GRAY_ARROW_2X } from '../constants'; // load the gif data

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
        let timeBeforeNow = moment.utc(props.time * 1000).fromNow();
        return !cleanDisplay ? (
            <div className="newsItem-subtext">
                {props.score} points by <a href={'https://news.ycombinator.com/user?id=' + props.by}>{props.by}</a> {timeBeforeNow} | {this.getCommentLink(props)}
            </div>
        ) : (
            <div className="newsItem-subtext">
                {timeBeforeNow}
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

    getVote() {
        return (
            <div className="newsItem-vote">
                <a href={'https://news.ycombinator.com/vote?for=' + this._id + '&dir=up&whence=news'}>
                    <img src={GIF_GRAY_ARROW_2X} width="10"/>
                </a>
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
                {this.getVote(props)}
                <div className="newsItem-itemText">
                    {this.getTitle(props)}
                    {this.getSubtext(props)}
                </div>
            </div>
        );
    }
}

ItemThread.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default ItemThread;
