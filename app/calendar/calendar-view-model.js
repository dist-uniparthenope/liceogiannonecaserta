const observableModule = require("tns-core-modules/data/observable");
const calendarModule = require("nativescript-ui-calendar");

const SelectedPageService = require("../shared/selected-page-service");
let calendar;

function CalendarViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Calendar");

    const viewModel = observableModule.fromObject({});

    //calendar = page.getViewById("myCalendar");

    return viewModel;
}

module.exports = CalendarViewModel;
