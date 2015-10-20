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

Instead of creating a new HTTP connection for retrieving the context for each item, Firebase SDK is applied for a websocket strategy. The speed is much faster and resulting a better user experience.

Design of actions, reducer and state
---
In order to keep state as simple, only a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is applied which is a simple key/value map. Key is the id of news thread and the corresponding value indicates the status of API call. The initial state is just an empty Map.
```javascript
const initialState = {
	ids: new Map()
};
```

Configuration
---
You may want to modify the number of news threads in front-page, it is stored in `/constants/index.js`.
```javascript
export const MAX_THREAD_NUMBER = 30;
```
Refresh the page then you can see the change.

Todo
---
+ Complete /newcomment page

Thanks
---
[mking/react-hn](https://github.com/mking/react-hn) for a great visual React tutorial, HTML and CSS are being re-used here. <br/>
[insin/react-hn](https://github.com/insin/react-hn) A React-powered Hacker News client, the code base for Firebase SDK is re-used here.
