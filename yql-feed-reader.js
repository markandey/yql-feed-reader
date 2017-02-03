window.__YQLFEED__ = {
	callbacks: {

	},
	counter: 0
};

window.yqlFeedReader = window.google = {
	feeds: {

	}
}

function() {
	function getTitle(url) {
		var a = document.createElement('a');
		a.href = url;
		return a.hostname;
	}

	function makeYQLScriptUrl(url, callbackName) {
		return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D\'' +
			encodeURIComponent(url) +
			'\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=__YQLFEED__.callbacks.' + callbackName;
	}

	function FeedResult(url, yqlResults) {
		this.feed = {
			title: getTitle(url),
			entries: yqlResults.map(function(item) {
				return {
					link: item.link || item.origLink,
					title: item.title,
					content: '<div>' + item.description + '/<div>',
					contentSnippet: item.title,
					pubDate: item.pubDate,
					publishedDate: item.pubDate
				}
			}),
			contentSnippet: ''
		};
		this.contentSnippet = '';
	}

	function Feed(url) {
		var counter = __YQLFEED__.counter++,
			cb,
			callbackName = 'callback_' + (counter + Date.now().getTime()),
			scriptUrl = makeYQLScriptUrl(url, callbackName);

		function onLoad(yql) {
			var results = ((yql.query && yql.query.results && yql.query.results.item) || []);

			if (typeof(cb) === 'function') {
				cb(new FeedResult(url, results));
			}
			document.getElementById(callbackName).remove();
			delete __YQLFEED__.callbacks[callbackName];
		}

		return {
			load: function(userCb) {
				var script = document.createElement('script');
				script.src = scriptUrl;
				script.id = callbackName;
				__YQLFEED__.callbacks[callbackName] = onLoad;
				cb = userCb;
				document.head.appendChild(script);
			}
		}
	}
	google.feeds.Feed = Feed;
}


