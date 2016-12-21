import jquery from 'jquery';
import bootstrap from 'bootstrap-sass';
//import {donutChart} from 'donut-widget/donutWidget.js';
import donutChart from 'donut/donut.js';
import * as d3 from "d3";
 
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

function type(d) {
  d.number = +d.number;
  return d;
}


var test = donutChart()
  .innerText("NEW TEXT")
  .padAngle(0.03)
  .hoverRad(15)
;

d3.csv("scripts/donut/donutdata.csv", type, function(error, data) {
  test(svg, data);
  var filtered = data.filter( function(d){
    if ( d.transactionType == "declines")
      return true;
    return false;
  });

  window.test = test;
  window.filtered = filtered;
  window.svg = svg;
  window.data = data;
});

/*
var jsonData = [
  {
    "mcc_name": "Department Store",
    "avg_fee": 0.29486
  },
  {
    "mcc_name": "Grocery",
    "avg_fee": 0.29486
  },
  {
    "mcc_name": "Family Clothing",
    "avg_fee": 0.29486
  },
  {
    "mcc_name": "Fast Food",
    "avg_fee": 0.29486
  },
  {
    "mcc_name": "Pharmacies",
    "avg_fee": 0.29486
  }
];

var valueFunction = function(d){
  return d.avg_fee;
}
var constancyFunction = function(d){
  return d.mcc_name;
}
var classMapFunction = function(d){
  return classMap[d.data.mcc_name];
}

//This data would be received by the controller
//where txn_type = sig_debit and fi= "My Financial Institution"
var classMap = {"Department Store": "fill-blue", "Grocery": "fill-red",
 "Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
  "Pharmacies": "fill-teal"};

var innerNumber = 0;
jsonData.forEach(function(d,j){
  innerNumber += d.avg_fee;
});


innerNumber = innerNumber / jsonData.length;

var testTwo = donutChart()
  .classMap(classMap)
  .valueFunction(valueFunction)
  .constancyFunction(constancyFunction)
  .classMapFunction(classMapFunction)
  .innerRad(50)
  .innerNumber(innerNumber)
  .innerText("AVG INTERCHANGE")
  //.padAngle(0.5)
;

testTwo(svg, jsonData);*/