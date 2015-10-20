// Rewritten and forked from insin/react-hn

import Firebase from 'firebase';
import { MAX_THREAD_NUMBER, BASE_API_URL } from '../constants';

let api = new Firebase(BASE_API_URL);

export function getItem (itemId, callback) {
	itemRef(itemId).once('value', snapshot => callback(snapshot.val()));
}

export function getItems (itemIds, callback) {
  let items = new Map();
	itemIds.forEach(itemId => getItem(itemId, item => {
		items.set(itemId, item);
  	if (items.size >= itemIds.length) callback(items);
	}));
}

export function storiesRef(path) {
  return api.child(path)
}

export function itemRef(id) {
  return api.child('item/' + id)
}

export function userRef(id) {
  return api.child('user/' + id)
}