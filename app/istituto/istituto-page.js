const app = require("tns-core-modules/application");

const IstitutoViewModel = require("./istituto-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new IstitutoViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
