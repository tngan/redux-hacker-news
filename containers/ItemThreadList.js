import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import { fetchItemThreadsIfNeeded } from '../actions';
import { MAX_THREAD_NUMBER, BASE_API_URL } from '../constants';
// import components
import ItemThread from '../components/ItemThread';
import NewsHeader from '../components/NewsHeader';

import '../public/stylesheets/list.css';

class ItemThreadList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        this.dispatch = dispatch;
        dispatch(fetchItemThreadsIfNeeded());
    }

    getMore(selectedPath,page) {
        return (
            <div className="newsList-more">
                <a className="newsList-moreLink" href={`/${selectedPath}?p=${parseInt(page)+1}`}>More</a>
            </div>
        );
    }

    getFooter() {
        return (
            <div className="footer-line"></div>
        );
    }

    render() {
        const { ids, selectedPath, page } = this.props;
        let iThread = [],
            rank = 1 + MAX_THREAD_NUMBER * (page - 1);

        for (let [ id, context ] of ids) {
            iThread = [...iThread, <ItemThread key={id} selectedPath={selectedPath} rank={rank++} threadId={id} dispatch={this.dispatch} context={context} />];
        }

        return (
            <div className="newsList">
                <NewsHeader selectedPath={selectedPath} />
                <div className="newsList-newsItems">
                    {iThread}
                </div>
                { ids.size > 0 && this.getMore(selectedPath, page) }
                { ids.size > 0 && this.getFooter() }
            </div>
        );
    }
}

ItemThreadList.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(state => ({ 
    ids: state.thread.ids || new Map(), 
    selectedPath: state.router.location.pathname.replace('/',''),
    page: parseInt(state.router.location.query.p) || 1
}))(ItemThreadList);