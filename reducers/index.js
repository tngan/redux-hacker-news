// import { combineReducer } from 'redux'; // for multiple reducers
import { REQUEST_NEWSTHREADS, REQUEST_NEWSTHREAD, RECEIVE_NEWSTHREADS, RECEIVE_NEWSTHREAD } from '../actions';

const initialState = {
	ids: new Map()
};

function assign (previousState, modified) {
	return Object.assign({}, previousState, modified);
}

function rootReducer(state = initialState, action) {
	let ids = new Map(state.ids); // clone a new one instead of mutating
	switch (action.type) {
		case RECEIVE_NEWSTHREADS: {
			action.ids.map((id) => ids.set(id, false));
			return assign({ ids });
		}
		case REQUEST_NEWSTHREAD: {
			ids.set(action.id, true);
			return assign({ ids });
		}
		case RECEIVE_NEWSTHREAD: {
			ids.set(action.context.id,action.context);
			return assign({ ids });
		}
		default:
			return state;
	}
}

export default rootReducer;