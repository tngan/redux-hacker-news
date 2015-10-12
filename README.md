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
1. Access localhost:3000, send a request to fetch the ids of top stories.
1. Receive those ids, render the ranking of top 30 stories.
1. Send a request for each story to fetch the context.
1. When each story receives its own context, the detail will be then displayed.

Demo
---
![image](https://thumbs.gfycat.com/DamagedDefiantIguanodon-size_restricted.gif)