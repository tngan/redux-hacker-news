import { MAX_THREAD_NUMBER, BASE_API_URL } from '../constants';
import { storiesRef, getItems, getCommentItems, updatesRef } from '../services/api.firebase';

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
		case 'show':
			return 'showstories';
		case 'jobs':
			return 'jobstories';
		case 'newest':
			return 'newstories';
		case 'newcomments':
			return 'topstories';
		default:
			return 'topstories';
	}
}
/*********************************************************
* Action definition
* 
* requestItemThreads
* receiveItemThreads
*
*********************************************************/
export const REQUEST_ITEMTHREADS = 'REQUEST_ITEMTHREADS';
function requestItemThreads () {
	return {
		type: REQUEST_ITEMTHREADS, // must have type
		text: 'Requesting the top item threads'
	}
}

export const RECEIVE_ITEMTHREADS = 'RECEIVE_ITEMTHREADS';
function receiveItemThreads ( json ) {
	return {
		type: RECEIVE_ITEMTHREADS,
		text: 'Received the top item threads',
		ids: json
	}
}

export const KEEP_WAITING = 'KEEP_WAITING';
function keepWaiting ( json ) {
	return {
		type: KEEP_WAITING,
		ids: json
	}
}
/*********************************************************
* Bound Action Creators that automatically dispatches
* 
* fetchItemThreads
*
*********************************************************/
function fetchItemThreads (state) {
	let type = state.router.location.pathname.replace('/',''); // remove the first slash
	let page = parseInt(state.router.location.query.p) || 1;
	return dispatch => {
		dispatch(requestItemThreads());
		return type === 'newcomments' ?
		 	updatesRef().once('value', function(snapshot) {
				getCommentItems(snapshot.val(), (items, keepUpdate) => {
					dispatch(keepUpdate ? keepWaiting(items) : receiveItemThreads(items));
				});
		  	}) :
			storiesRef(getApiUrlByItemType(type)).once('value', function(snapshot) {
				let skim = snapshot.val().slice((page - 1) * MAX_THREAD_NUMBER, MAX_THREAD_NUMBER * page); // reduce the page size
				getItems(skim, items => dispatch(receiveItemThreads(items)));
			});
	};
}
/*********************************************************
* Some checking functions before fetching
* 
* shouldFetchItemThreads
*
*********************************************************/
function shouldFetchItemThreads ( state = { ids: new Map() }){
	return state.thread.ids.size === 0;
}

export function fetchItemThreadsIfNeeded () {
	return (dispatch, getState) => {
		if (shouldFetchItemThreads(getState())) {
			return dispatch(fetchItemThreads(getState()));
		}
	};
}

