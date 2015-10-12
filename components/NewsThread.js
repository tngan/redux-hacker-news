import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import url from 'url';
import { fetchNewsThreadIfNeeded } from '../actions';
import { GIF_GRAY_ARROW_2X } from '../constants'; // load the gif data

import '../public/stylesheets/thread.css';

class NewsThread extends Component {

    constructor(props) {
        super(props);
        this._id = this.props.threadId;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchNewsThreadIfNeeded(this.props.threadId));
    }

    getProps() {
        return this.props[this._id];
    }

    getCommentLink(props) {
        let commentText = 'discuss';
        if (props.kids && props.kids.length) {
          commentText = props.kids.length + ' comments';
        }
        return (
            <a href={'https://news.ycombinator.com/item?id=' + props.threadId}>{commentText}</a>
        );
      }

    getSubtext(props) {
        return (
            <div className="newsItem-subtext">
                {props.score} points by <a href={'https://news.ycombinator.com/user?id=' + props.by}>{props.by}</a> {moment.utc(props.time * 1000).fromNow()} | {this.getCommentLink(props)}
            </div>
        )
    }

    getRank(props) {
        return (
          <div className="newsItem-rank">
            {props.rank}.
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
            hostname,
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
                    ({hostname})
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
        let props = this.getProps();
        return (
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

NewsThread.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { ids } = state || {
        ids: new Map()
    };
    let props = {},
        rank = 1;

    for (let [threadId,context] of ids) {
        props[threadId] = Object.assign({},{
            rank: rank++
        },context);
    }

    return props;
}

export default connect(mapStateToProps)(NewsThread);
