var observable = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
var config = require('../config');

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

exports.empty = function() {
    while (feedItems.length) {
        feedItems.pop();
    }
};

exports.load = function name(params) {
    console.log('CALLING LOAD:'+config.rssURL);
    //handle caching
    if(feedItems.length > 0) {
        console.log('leaving early');
        return;
    }

    return fetch(config.rssURL, {
    })
        .then(handleErrors)
        .then(function(response) {
            console.log(response.text());
            return response.json();
        }).then(function(data) {
            console.log('number of rss entries: '+data.query.results.item.length);
            data.query.results.item.forEach(function(feedItem) {

                feedItems.push({
                        title: feedItem.title,
                        link: feedItem.link,
                        description: feedItem.description
                    }
                );

            });
        });

}

var feedItems = new ObservableArray();
exports.feedItems = feedItems;

var viewModel = new observable.Observable();
exports.viewModel = viewModel;
