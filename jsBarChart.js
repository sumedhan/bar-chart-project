//drawBarChart(data, options, element)

// Chart Data. Customize below.

// data for the chart
var data = [50, 20, 30];


// chart options below
var options = {

  // Chart width, height and title
  "chartwidth": "1200px",
  "chartheight": "800px",
  "charttitle": "Favorite Comedy Series",

  // Data names in the same order as the values provided
  "datalabels": ["The Office","Parks and Recreation","Silicon Valley"]
};

var element = 'body';



//Sets the chart size
function createChart() {
  var chartElement = $("<div></div>").attr("id","chart");
  $(element).append(chartElement);
  $("#chart").width(options.chartwidth);
  $("#chart").height(options.chartheight);
}

//Sets the chart title
function chartTitle() {
  var titletext = $("<h1></h1>").text(options.charttitle);
  titletext.attr("id","title");
  $("#chart").append(titletext);
}

// Creates chart area
function createChartArea() {
  //sets the actual area where chart will be plotted
  var chartArea = $("<div></div").attr("id","chartarea");
  $("#chart").append(chartArea);
  //sets the padding, height and width for chart area

}
function drawBarChart(data, options, element) {

  $(document).ready(function(){
    createChart();
    chartTitle();
    createChartArea();
  });

}


