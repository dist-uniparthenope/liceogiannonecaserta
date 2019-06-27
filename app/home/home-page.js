const app = require("tns-core-modules/application");

const HomeViewModel = require("./home-view-model");

var RssListViewModel = require('../shared/view-models/rss-list-view-model');
var frameModule = require('ui/frame');

var config = require('../shared/config');

var Observable = require('data/observable').Observable;
var viewModule = require('ui/core/view');
var page;

var pageData = new Observable({
    rssList:RssListViewModel
});

exports.onPageLoaded = function(args) {
    console.log('Home page loaded');
    page = args.object;
    page.bindingContext = pageData;
    //RssListViewModel.empty();
    RssListViewModel.load();
};

exports.loadItem = function(args) {
    console.log('tap item',args.index);
    console.log('tap item 2', args.view.bindingContext.title);
    //rssList.viewModel.set('selectedItem', args.view.bindingContext);
    RssListViewModel.viewModel.set('selectedItem', args.view.bindingContext);
    frameModule.topmost().navigate('home/item-page');
}

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
