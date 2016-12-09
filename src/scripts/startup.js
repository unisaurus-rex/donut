import jquery from 'jquery';
import bootstrap from 'bootstrap-sass';
//import {donutChart} from 'donut-widget/donutWidget.js';
import donutChart from 'donut/donut.js';
import * as d3 from "d3";
 
/*var donutConfig = {
  //global config
  width: 500,
  height: 500,
  filePath: "scripts/donut/donutdata.csv",
  parentDiv: "div#donutid",
  keys: ["transactionType", "number"],
  data: ["authorizations", "chargebacks", "declines"],
  //row to css class
  classMap: {"declines": "fill-danger", "authorizations": "fill-success", "chargebacks":"fill-warning"},

  //donut
  innerText: "TOTAL TRANS"
};

createDonutWidget(donutConfig, "transactionType");

*/

  var svg = d3.select("div#donutid")
    .classed("svg-container", true)
    .append("svg")
    .attr("viewBox", "0 0 " + 500 + " " + 500)
    //class for responsivenesss
    .classed("svg-content-responsive-pie", true)
    .attr("width", 500)
    .attr("height", 500)
    .append("g")
    .attr("id", "donutchart")
    .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
  ;

  //add text for inner circle
  /*svg.append("text")
    .attr("dy", "-0.5em")
    .style("text-anchor", "middle")
    .attr("class", "inside")
    .text(function() {
      return "TOTAL TRANS";
    })
  ;*/

  function type(d) {
    d.number = +d.number;
    return d;
  }

  var test = donutChart()
    .innerText("NEW TEXT")
    .hoverRad(50)
    .width(10000)
    .height(10000)
  ;

  //console.log (test.hoverRad);
  window.hoverRad = test.hoverRad;
  
  d3.csv("scripts/donut/donutdata.csv", type, function(error, data) {
    test(svg, data);

    var filtered = data.filter( function(d){
      if ( d.transactionType == "declines")
        return true;
      return false;
    })

    window.test = test;
    window.filtered = filtered;
    window.svg = svg;
    window.data = data;
  });

