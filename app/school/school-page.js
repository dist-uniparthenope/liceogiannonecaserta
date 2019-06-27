const app = require("tns-core-modules/application");

const SchoolViewModel = require("./school-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new SchoolViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}


exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
