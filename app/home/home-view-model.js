const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");

const ObservableArray = require("data/observable-array").ObservableArray;
let xml2js = require('nativescript-xml2js');
let fs = require("tns-core-modules/file-system");
const httpModule = require("tns-core-modules/http");

function HomeViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Home");

    let items = new ObservableArray();

    const viewModel = observableModule.fromObject({
        items:items
    });



    let dest = fs.path.join(fs.knownFolders.currentApp().path, "/rss.xml");
    let url = "http://www.liceogiannonecaserta.gov.it/giannone/feed/";
    httpModule.getFile(url, dest).then(function (r) {
        let parser = new xml2js.Parser();
        r.readText().then(function  (data){
            parser.parseString(data, function (err, result) {

                for(let i=0; i<result.rss.channel[0].item.length; i++)
                {
                    let myHtmlString = result.rss.channel[0].item[i].description.toString();
                    const title = result.rss.channel[0].item[i].title.toString();
                    const date = result.rss.channel[0].item[i].pubDate.toString();
                    let data = extractData(date);

                    let index = myHtmlString.search('img alt');
                    if(index != -1){
                        let temp = myHtmlString.slice(index);
                        let index1 = temp.search('align-left');
                        let string_temp = myHtmlString.slice(index-4, index+index1+88);
                        myHtmlString = myHtmlString.replace(string_temp, " ");
                    }
                    console.log(title);
                    items.push({
                        title: title,
                        date:data,
                        date_text: data.getDate() + "/" +(data.getMonth()+1) + "/" +data.getFullYear() + " " + data.getHours() + ":" +data.getMinutes(),
                        items: [
                            {
                                desc: myHtmlString
                            }
                        ]
                    });
                    items.sort(function (orderA, orderB) {
                        let nameA = orderA.date;
                        let nameB = orderB.date;
                        return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
                    });
                }
            });
        });
    },function (e) {
        console.log(e);
    });

    function extractData(data) {
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        let day = data.substr(5,2);
        let month = data.substr(8,3);
        let year = data.substr(12,4);
        let hour = data.substr(17,2);
        let min = data.substr(20,2);

        let index_month = months.indexOf(month);
        let d = new Date(year, index_month, day, hour, min);

        return d;
    }


    return viewModel;
}

module.exports = HomeViewModel;
