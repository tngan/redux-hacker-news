import fetch from 'isomorphic-fetch';
import { MAX_THREAD_NUMBER, BASE_API_URL } from '../constants';

/*********************************************************
* Util function
* 
* getApiUrlByItemType
*
*********************************************************/
function getApiUrlByItemType (type) {
	switch (type) {
		case 'ask':
			return 'askstories';
		case 'newest':
			return 'newstories';
		case 'show':
			return 'showstories';
		case 'jobs':
			return 'jobstories';
		default:
			return 'topstories';
	}
}
/*********************************************************
* Action definition
* 
* requestItemThreads
* requestItemThread
* receiveItemThreads
* receiveItemThread
*
*********************************************************/
export const REQUEST_ITEMTHREADS = 'REQUEST_ITEMTHREADS';
function requestItemThreads () {
	return {
		type: REQUEST_ITEMTHREADS, // must have type
		text: 'Requesting the top item threads'
	}
}

export const REQUEST_ITEMTHREAD = 'REQUEST_ITEMTHREAD';
function requestItemThread ( id ) {
	return {
		type: REQUEST_ITEMTHREAD,
		id: id,
		text: `Requesting the item thread with id ${id}`
	}
}

export const RECEIVE_ITEMTHREADS = 'RECEIVE_ITEMTHREADS';
function receiveItemThreads ( json ) {
	return {
		type: RECEIVE_ITEMTHREADS,
		ids: json
	}
}

export const RECEIVE_ITEMTHREAD = 'RECEIVE_ITEMTHREAD';
function receiveItemThread ( json ) {
	return {
		type: RECEIVE_ITEMTHREAD,
		context: json
	}
}
/*********************************************************
* Bound Action Creators that automatically dispatches
* 
* fetchItemThreads
* fetchItemThread
*
*********************************************************/
function fetchItemThreads (state) {

	let type = state.router.location.pathname.replace('/',''); // remove the first slash

	return dispatch => {
		dispatch(requestItemThreads());
		return fetch(`${BASE_API_URL}${getApiUrlByItemType(type)}.json`)
			.then(response => response.json())
			.then(json => {
				let skim = json.slice(0,MAX_THREAD_NUMBER); // reduce the page size
				dispatch(receiveItemThreads(skim));
			});
	};
}

function fetchItemThread (state, id) {
	return dispatch => {
		dispatch(requestItemThread(id));
		return fetch(`${BASE_API_URL}item/${id}.json`)
			.then(response => response.json())
			.then(json => {
				if(json.type !== 'comment') {
					dispatch(receiveItemThread(json));
				}
			});
	};
}
/*********************************************************
* Some checking functions before fetching
* 
* shouldFetchItemThreads
* shouldFetchItemThread
*
*********************************************************/
function shouldFetchItemThreads ( state = { 
	ids: new Map()
}) {
	return state.thread.ids.size === 0;
}

function shouldFetchItemThread ( state = {
	ids: new Map() 
}, id ) {
	return state.thread.ids.has(id);
}

export function fetchItemThreadsIfNeeded () {
	return (dispatch, getState) => {
		if (shouldFetchItemThreads(getState())) {
			return dispatch(fetchItemThreads(getState()));
		}
	};
}

export function fetchItemThreadIfNeeded ( id ) {
	return (dispatch, getState) => {
		if (shouldFetchItemThread(getState()),id){
			return dispatch(fetchItemThread(getState(), id));
		}
	};
}

