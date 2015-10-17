import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import { fetchItemThreadsIfNeeded } from '../actions';
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

    render() {
        const { ids, selectedPath } = this.props;
        let iThread = [],
            rank = 1;
        for (let [ id, context ] of ids) {
            iThread = [...iThread, <ItemThread key={id} selectedPath={selectedPath} rank={rank++} threadId={id} dispatch={this.dispatch} context={context} />];
        }
        return (
            <div className="newsList">
                <NewsHeader selectedPath={selectedPath} />
                <div className="newsList-newsItems">
                    {iThread}
                </div>
            </div>
        );
    }
}

ItemThreadList.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(state => ({ ids: state.thread.ids || new Map(), selectedPath: state.router.location.pathname.replace('/','') }))(ItemThreadList);