// import { combineReducer } from 'redux'; // for multiple reducers
import { REQUEST_ITEMTHREADS, REQUEST_ITEMTHREAD, RECEIVE_ITEMTHREADS, RECEIVE_ITEMTHREAD } from '../actions';
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

const initialState = {
	ids: new Map()
};

function assign (previousState, modified) {
	return Object.assign({}, previousState, modified);
}

// @threadReducer
function thread(state = initialState, action) {
	let ids = new Map(state.ids); // clone a new one instead of mutating
	switch (action.type) {
		case RECEIVE_ITEMTHREADS: {
			action.ids.map((id) => ids.set(id, false));
			return assign({ ids });
		}
		case REQUEST_ITEMTHREAD: {
			ids.set(action.id, true);
			return assign({ ids });
		}
		case RECEIVE_ITEMTHREAD: {
			ids.set(action.context.id,action.context);
			return assign({ ids });
		}
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	router: routerStateReducer,
	thread
});

export default rootReducer;