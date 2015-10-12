// import { combineReducer } from 'redux';
import {
	REQUEST_NEWSTHREADS,
	REQUEST_NEWSTHREAD,
	RECEIVE_NEWSTHREADS,
	RECEIVE_NEWSTHREAD
} from '../actions';

// The state should be like as follow
const initialState = {
	ids: new Map()
};

function rootReducer(state = initialState, action) {
	let _ids = new Map(state.ids);
	switch (action.type) {
		case REQUEST_NEWSTHREADS:
			return state;
		case RECEIVE_NEWSTHREADS: {
			action.ids.map((id) => _ids.set(id,false));			
			return Object.assign({}, state, {
				ids: _ids
			});
		}
		case REQUEST_NEWSTHREAD: {
			_ids.set(action.id,true);
			return Object.assign({}, state, {
				ids: _ids
			});
		}
		case RECEIVE_NEWSTHREAD: { // do more checking on return context later on
			_ids.set(action.context.id,action.context);
			return Object.assign({}, state, {
				ids: _ids
			});
		}
		default:
			return state;
	}
}

export default rootReducer;