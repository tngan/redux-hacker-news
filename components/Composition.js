// import { getVote, getAuthor, getLastUpdatedTime } from './Composition';
import { GIF_GRAY_ARROW_2X } from '../constants'; // load the gif data
import React from 'react';
import moment from 'moment';

const Composition = {
	getVote: function(props) {
        return (
            <div className="newsItem-vote">
                <a href={'https://news.ycombinator.com/vote?for=' + props.id + '&dir=up&whence=news'}>
                    <img src={GIF_GRAY_ARROW_2X} width="10"/>
                </a>
            </div>
        );
    },
    getAuthor(props) {
        let by = props.by;
        return (
            <a href={'https://news.ycombinator.com/user?id=' + by}>{by}</a>
        );
    },
    getLastUpdatedTime(props) {
        return moment.utc(props.time * 1000).fromNow();
    }
};

export default Composition;