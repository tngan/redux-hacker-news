import fetch from 'isomorphic-fetch';
import { MAX_THREAD_NUMBER, BASE_API_URL } from '../constants';

/*********************************************************
* Action definition
* 
* requestNewsThreads
* requestNewsThread
* receiveNewsThreads
* receiveNewsThread
*
*********************************************************/
export const REQUEST_NEWSTHREADS = 'REQUEST_NEWSTHREADS';
function requestNewsThreads () {
	return {
		type: REQUEST_NEWSTHREADS, // must have type
		text: 'Requesting the top news threads'
	}
}

export const REQUEST_NEWSTHREAD = 'REQUEST_NEWSTHREAD';
function requestNewsThread ( id ) {
	return {
		type: REQUEST_NEWSTHREAD,
		id: id,
		text: `Requesting the news thread with id ${id}`
	}
}

export const RECEIVE_NEWSTHREADS = 'RECEIVE_NEWSTHREADS';
function receiveNewsThreads ( json ) {
	return {
		type: RECEIVE_NEWSTHREADS,
		ids: json
	}
}

export const RECEIVE_NEWSTHREAD = 'RECEIVE_NEWSTHREAD';
function receiveNewsThread ( json ) {
	return {
		type: RECEIVE_NEWSTHREAD,
		context: json
	}
}
/*********************************************************
* Bound Action Creators that automatically dispatches
* 
* fetchNewsThreads
* fectchNewsThread
*
*********************************************************/

function fetchNewsThreads () {
	return dispatch => {
		dispatch(requestNewsThreads());
		return fetch(`${BASE_API_URL}topstories.json`)
			.then(response => response.json())
			.then(json => {
				let skim = json.slice(0,MAX_THREAD_NUMBER); // reduce the page size
				dispatch(receiveNewsThreads(skim));
			});
	};
}

function fetchNewsThread ( id ) {
	return dispatch => {
		dispatch(requestNewsThread(id));
		return fetch(`${BASE_API_URL}item/${id}.json`)
			.then(response => response.json())
			.then(json => dispatch(receiveNewsThread(json)));
	};
}

/*********************************************************
* Some checking functions before fetching
* 
* shouldFetchNewsThreads
* shouldFetchNewsThread
*
*********************************************************/
function shouldFetchNewsThreads ( state = { 
	ids: new Map()
}) {
	return state.ids.size === 0;
}

function shouldFetchNewsThread ( state = {
	ids: new Map() 
}, id ) {
	return state.ids.has(id);
}

export function fetchNewsThreadsIfNeeded () {
	return (dispatch, getState) => {
		if (shouldFetchNewsThreads(getState())) {
			return dispatch(fetchNewsThreads());
		}
	};
}

export function fetchNewsThreadIfNeeded ( id ) {
	return (dispatch, getState) => {
		if (shouldFetchNewsThread(getState()),id){
			return dispatch(fetchNewsThread(id));
		}
	};
}

