//drawBarChart(data, options, element)

// Chart Data. Customize below.

// data for the chart
var data = [150,20, 40];


// chart options below
var options = {

  // Chart width, height and title
  "chartwidth": "1000px",
  "chartheight": "700px",
  "charttitle": "Favorite Comedy Series",

  // Data names in the same order as the values provided
  "datalabels": ["The Office","30 Rock", "Parks and Recreation"],


  // Axes titles
  "xaxistitle": "Series Names",
  "yaxistitle": "No. of people",


  // bar formatting options

  "barspacing": "50px",
  "barcolour": "blue",

  // X axis labels
  "xdataposition": "top", //options availble - top, bottom or center
  "datalabelcolor": "green",

  // Y axis ticks
  "ymaxvalue": "200",
  "yinterval": "10"

};

var element = 'body';



//Sets the chart size
function createChartContainer() {
  var chartElement = $("<div></div>").attr("id", "chartcontainer");
  $(element).append(chartElement);
  $("#chartcontainer").width(options.chartwidth);
  $("#chartcontainer").height(options.chartheight);
}

//Sets the chart title
function chartTitle() {
  var titletext = $("<h1></h1>").text(options.charttitle);
  titletext.attr("id", "title");
  $("#chartcontainer").append(titletext);
}

// Creates chart area  and plot both the axes
function createChartArea() {
  var chartArea = $("<div></div").attr("id", "chartarea");
  var xTitle = $("<h3></h3").attr( {"id": "xtitle",
                                    "class": "axistitle"})
  xTitle.text(options.xaxistitle);
  var yTitle = $("<h3></h3").attr( {"id": "ytitle",
                                    "class": "axistitle"})
  yTitle.text(options.yaxistitle);

  $("#chartcontainer").append(chartArea);
  $("#chartarea").append(xTitle,yTitle);

}

//Returns an array that has the length of y axis in pixels and the scale that gives the number of pixels in each unit of y axis
var yAxis = function () {
  var yAxisLength = Math.floor($("#chartarea").height());
  var maxValue = parseInt(options.ymaxvalue);
    if( maxValue < Math.max( ...data )){
      maxValue = Math.max( ...data);
    }
  var scale = yAxisLength / maxValue;
  var yAxis = [yAxisLength, scale];
  return yAxis;
}

function yAxisTicks () {

}


// creates X axis data
function xDataDisplay(value, barId) {
  var xData = $("<p></p>").text(value);
    xData.attr("class","xaxisdata");
   $(barId).append(xData);
}

// Position x axis data
function xDataPosition() {
  if(options.xdataposition === 'bottom') {
    $(".xaxisdata").css( "bottom", "0");
  }
  if(options.xdataposition === 'center') {
       $(".xaxisdata").css( "top","50%");
  }

}
//creates and positions x axis labels
function xAxisLabels(label, barId) {
    var xLabel = $("<p></p>").text(label);
    xLabel.attr("class","xaxislabels");
   $(barId).append(xLabel);

}



//creates the bars according to the numbers provided in the range
function createBars() {

  // Calculating bar width given the spacing of the bars
  var numberOfBars = data.length;
  var xAxisLength = $("#chartarea").width();
  var barWidth = (xAxisLength - ((numberOfBars + 1) * parseInt(options.barspacing)))/numberOfBars;
  barWidth = Math.floor(barWidth);


  var yScale = yAxis()[1];

 //for loop that creates the bars for each of the data
  for (var i = 0; i < data.length; i++) {

    var barId = "bar" + i;
    var barHeight = data[i] * yScale;
    var bar = $("<div></div>").attr({
                                  "class": "bar",
                                  "id": barId
                                    });
    barId = "#" + barId;
    $("#chartarea").append(bar);
    $(barId).height(barHeight);

    //Calculate x offset from y axis
    var xOffset = (i * barWidth) + ((i + 1) * parseInt(options.barspacing));

    //calculates offset from top for placeing the bar in the correct position
    var topOffset = yAxis()[0] - barHeight;

    $(barId).css({
                "position": "absolute",
                "top": topOffset,
                "left": xOffset
    });

    // Call function to display data values for x axis
    xDataDisplay(data[i],barId);
    xAxisLabels(options.datalabels[i], barId);
  }

  // sets CSS formatting options for all bars
  $(".bar").css({
              "background-color": options.barcolour,
              "width": barWidth,
              "margin": 0,
              "padding": 0,
              "border": 0
  });

  //positions x axis data
  xDataPosition();

  // formats the x labels in the color defined in options

  $(".xaxislabels").css("color", options.datalabelcolor);
}

function drawBarChart(data, options, element) {

  $(document).ready(function(){
    createChartContainer();
    chartTitle();
    createChartArea();
    createBars();
  });

}


