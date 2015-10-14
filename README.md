redux-hacker-news
===
Base on the async example in [rackt/redux](https://github.com/rackt/redux/tree/master/examples/async) and the visual React tutorial [mking/react-hn](https://github.com/mking/react-hn).  A Redux-powered Hacker News page is built by using its [Firebase API](https://github.com/HackerNews/API).

Get Started
---
Install the packages first and start the server.
```bash
$npm install
$npm start
```
Access localhost:3000 then you can see the front page of Hacker News.

Flow
---
According to the documentation in [Firebase API](https://github.com/HackerNews/API), they don't provide a single call for getting the context of all top news threads, so an alternative workaround is to get all `id` of top 500 news threads first.

https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

Once we have the `id` of each news thread, we can render the front page including the header, the ranking of each news thread like you can see in the demo. Then another API call is made for each news thread and retrieving its own context. 

https://hacker-news.firebaseio.com/v0/item/123456.json?print=pretty

whereas `123456` is the `id` of news thread. Then the UI will update the context for each news thread. You can see in the demo how it is updated asynchronously.

Design of actions, reducer and state
---
In order to keep state as simple, only a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is applied which is a simple key/value map. Key is the id of news thread and the corresponding value indicates the status of API call. The initial state is just an empty Map.
```javascript
const initialState = {
	ids: new Map()
};
```
There are three types of value in the Map, `false` means the id of this thread is received in the first API call. `true` means the next API is already called. The context will be received as an `object`.
```javascript
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
```
We have to prevent the API calls which are invoked again when the list and threads are re-rendered. Simple checkings `shouldFetchNewsThreads (state)` and `shouldFetchNewsThread (state, id)` have been made before a dispatch of action.

```javascript
function shouldFetchNewsThreads ( state = { ids: new Map() } ) {
	return state.ids.size === 0;
}

function shouldFetchNewsThread ( state = { ids: new Map() }, id ) {
	return state.ids.has(id);
}
```

Configuration
---
You may want to modify the number of news threads in front-page, it is stored in `/constants/index.js`.
```javascript
export const MAX_THREAD_NUMBER = 30;
```
Refresh the page then you can see the change.

Thanks
---
[mking/react-hn](https://github.com/mking/react-hn) for a great visual React tutorial, HTML and CSS are being re-used here.

Demo
---
![image](https://thumbs.gfycat.com/DamagedDefiantIguanodon-size_restricted.gif)