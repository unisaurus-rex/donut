import bootstrap from 'bootstrap-sass';
import {createDonutWidget} from 'donut-widget/donutWidget.js';

var donutConfig = {
  //global config
  width: 500,
  height: 500,
  filePath: "scripts/charts/donut/donutdata.csv",
  parentDiv: "div#donutid",
  keys: ["transactionType", "number"],
  data: ["authorizations", "chargebacks", "declines"],
  //row to css class
  classMap: {"declines": "fill-danger", "authorizations": "fill-success", "chargebacks":"fill-warning"},

  //donut
  innerText: "TOTAL TRANS"
};

createDonutWidget(donutConfig, "transactionType");