# yql-feed-reader
Google Feed Reader Replacement Using Yahoo Query Language


```javascript
var feedReader = google.feeds.Feed(url);
feedReader.load(function(feeds){
	console.log(feeds);
});

OR

var feedReader = yqlFeedReader.feeds.Feed(url);
feedReader.load(function(feedItems){
	console.log(feedItems);
});

```