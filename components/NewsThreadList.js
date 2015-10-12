import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import { fetchNewsThreadsIfNeeded } from '../actions';
// import components
import NewsThread from '../components/NewsThread';
import NewsHeader from '../components/NewsHeader';

import '../public/stylesheets/list.css';

class NewsThreadList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchNewsThreadsIfNeeded());
    }

    render() {
        const { ids } = this.props;
        let newsThread = [];
        for (let [id,fetching] of ids) {
            newsThread = [...newsThread, <NewsThread key={id} threadId={id} />];
        }
        return (
            <div className="newsList">
                <NewsHeader />
                <div className="newsList-newsItems">
                    {newsThread}
                </div>
            </div>
        );
    }
}

NewsThreadList.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { ids, inValidate } = state || {
        ids: new Map()
    };
    return {
        ids
    };
}

export default connect(mapStateToProps)(NewsThreadList);