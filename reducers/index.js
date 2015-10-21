import { REQUEST_ITEMTHREADS, RECEIVE_ITEMTHREADS, KEEP_WAITING } from '../actions';
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

const initialState = {
	ids: new Map()
};

function assign (previousState, modified = {}) {
	return Object.assign({}, previousState, modified);
}

function threadReducer (state = initialState, action) {
	let ids = new Map(state.ids); // clone a new one instead of mutating
	switch (action.type) {
		case REQUEST_ITEMTHREADS: {
			return assign(state, { ids, isLoading: true })
		}
		case RECEIVE_ITEMTHREADS: {
			return assign({ ids: action.ids, isLoading: false });
		}
		case KEEP_WAITING: {
			return assign({ ids: action.ids, isLoading: false, isUpdating: true });
		}
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	router: routerStateReducer,
	thread: threadReducer
});

export default rootReducer;