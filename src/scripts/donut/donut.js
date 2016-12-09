import * as d3 from "d3";

export default function donutChart(){

  var width = 500,
  height = 500,
  innerText = "TOTAL TRANS";
    var radius = Math.min( width, height) / 2;
    var innerRad = radius / 4;
    var hoverRad = 15;
    var padAngle = 0;
    var valueFunction = function(d){
      return d.number;
    }
    var constancyFunction = function(d){
      return d.transactionType;
    }
    var classMap = {"declines": "fill-danger", "authorizations": "fill-success", "chargebacks":"fill-warning"};

  function chart(container, dataArr){

        function arcTween(a) {
      var startAngle = a.startAngle; //<-- keep reference to start angle
      var i = d3.interpolate(a.startAngle, a.endAngle); //<-- interpolate start to end
      return function(t) {
          return arc({ //<-- return arc at each iteration from start to interpolate end
            startAngle: startAngle,
            endAngle: i(t)
          });
      };
    }

    var sum = 0;
    dataArr.forEach(function (d, j) {
        sum += d.number;
      })

    //remove current total
    container.select( "text.data" )
      .transition()
      .duration(100)
      .style("opacity", 0)
      .remove()
    ;
    
    //update total
    container.append("text")
      .attr("dy", ".95em")
      .style("text-anchor", "middle")
      .style("opacity", 0)
      .attr("class", "data")
      .text(function() {
        return sum;
      })
      .transition()
      .duration(1000)
      .style("opacity", 1)
    ;

    
    container.selectAll ("text.inside")
    .remove();
    //add text for inner circle
    container.append("text")
      .attr("dy", "-0.5em")
      .style("text-anchor", "middle")
      .attr("class", "inside")
      .text(function() {
        return innerText;
      })
    ;
    var arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius-innerRad)
    ;

    var hoverArc = d3.arc()
      .outerRadius(radius-innerRad)
      .innerRadius(radius + hoverRad)
    ;

    var pie = d3.pie()
      .sort(null)
      .value ( valueFunction )
      .padAngle(padAngle)
    ;

    var sel = container.selectAll("path")
      .data(pie(dataArr), constancyFunction)
    ;

    sel
      .data(pie(dataArr))
      .enter()
      .append("path")
      .merge(sel)
      .data(pie(dataArr))
      .on("mouseover", function(d) {
            d3.select(this).transition()
                .duration(1000)
                .attr("d", hoverArc);
          })
        .on("mouseout", function(d) {
            d3.select(this).transition()
                .duration(1000)
                .attr("d", arc);
        })
        .attr("class", function (d) {
          return classMap[d.data.transactionType];
        })
        .transition()
        .duration(700)
        .attrTween("d", arcTween)
        ;

        sel.exit()
          .transition()
          .duration(700)
          .attr("d", arcTween)
          .style("opacity", 0)
          .remove()
      ;


  }

  chart.width = function(value){
    if (!arguments.length) return width;

    width = value;
    return chart;
  }

  chart.height = function(value){
    if (!arguments.length) return height;
    height = value;
    return chart; 
  }
  chart.innerText = function(value){
    if (!arguments.length) return innerText;
    innerText = value;
    return chart; 
  }
  chart.radius = function(value){
    if (!arguments.length) return radius;
    radius = value;
    return chart; 
  }
  chart.innerRad = function(value){
    if (!arguments.length) return innerRad;
    innerRad = value;
    return chart; 
  }
  chart.hoverRad = function(value){
    if (!arguments.length) return hoverRad;
    hoverRad = value;
    return chart; 
  }
  chart.padAngle = function(value){
    if (!arguments.length) return padAngle;
    padAngle = value;
    return chart; 
  }

  chart.constancyFunction = function(value){
    if (!arguments.length) return constancyFunction;
    constancy = value; 
    return chart;
  }
  chart.valueFunction = function(value){
    if (!arguments.length) return valueFunction;
    valueFunction = value;
    return chart; 
  }
  chart.classMap = function(value){
    if (!arguments.length) return classMap;
    classMap = value;
    return chart;
  }


    return chart;
}