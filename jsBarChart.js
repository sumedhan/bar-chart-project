//The script draws a bar chart using the API - drawBarChart(data, options, element). To customize enter your data below -

// data for the chart
var data = [[70,120,12],[ 100,24,50]];

// Customisable chart options -
var options = {

  // Chart width, height
  "chartwidth": "1200px",
  "chartheight": "900px",

  // Chart title and font size
  "charttitle": "Emmy Awards",
  "titlefontsize": "20pt",
  "titlefontcolor": "#48623E",

  // Data names in the same order as the values provided. Displayed at the x axis
  "datalabels": ["Veep", "30 Rock"],

  // Axes titles
  "xaxistitle": "Emmy Awards nominations and wins",
  "yaxistitle": "Number of Awards ",

  // Bar spacing and colour options for bars. Multiple bar colours for stacked bar charts.
  "barspacing": "50px",
  "barcolour": ["green","yellow","red"],

  //for stacked bar charts please provide legend for the colours
  "legend": ["Q1"],

  // X axis labels
  "xdataposition": "bottom", //options availble - top, bottom or center
  "datalabelcolor": "#504F50",

  // Y axis ticks interval in units.
  "yinterval": "50",

  // Horizontal gridlines
  "horizontalgrid": true

};

var element = 'body';

// Script Functions below -

//Sets the chart size
function createChartContainer() {
  var chartElement = $("<div></div>").attr("id", "chartcontainer");
  $(element).append(chartElement);
  $("#chartcontainer").css( {
                      "background-color": "white",
                      "height": options.chartheight,
                      "left": "0px",
                      "position": "absolute",
                      "top": "0px",
                      "width": options.chartwidth
  });

}

//Sets the chart title
function chartTitle() {
  var titletext = $("<h1></h1>").text(options.charttitle);
  titletext.attr("id", "title");
  $("#chartcontainer").append(titletext);
  $("#title").css({
                "color": options.titlefontcolor,
                "font-size" : options.titlefontsize,
                "padding": "5px",
                "text-align": "center"
  });
}

// Creates chart area  and plot both the axes
function createChartArea() {
  var chartArea = $("<div></div").attr("id", "chartarea");

  $("#chartcontainer").append(chartArea);
  $("#chartarea").css( {
                      "border-color": "black",
                      "border-style": "none none solid solid",
                      "border-width": "2px",
                      "display": "flex",
                      "flex-direction": "column",
                      "height": "80%",
                      "justify-content": "flex-end",
                      "left": "15%",
                      "margin": "0",
                      "position": "absolute",
                      "width": "80%"
  });
}

//function displays axes titles
function displayAxisTitles () {
  var xTitle = $("<h3></h3").attr( {"id": "xtitle",
                                    "class": "axistitle"});
  xTitle.text(options.xaxistitle);
  var yTitle = $("<h3></h3").attr( {"id": "ytitle",
                                    "class": "axistitle"});
   yTitle.text(options.yaxistitle);
  $("#chartarea").append(xTitle,yTitle);

  $("#xtitle").css({
                  "align-self": "center",
                  "margin": "2px",
                  "padding": "5px",
                  "position": "absolute",
                  "top": "105%"
                });

$("#ytitle").css( {
                  "left": "-20%",
                  "margin": "2px",
                  "padding": "2px",
                  "position": "absolute",
                  "top":"50%",
                  "transform": "rotate(-90deg)"
                });

}

// Creates legend for stacked bar charts
function displayLegend () {
  var legend = $("<div></div>").attr("id","legend");
  $("#chartcontainer").append(legend);
  var color1 = $("<div></div").attr({
                                    "class": "colorbox",
                                    "id": "color1"
  })
  $("#legend").append(color1);
  $(".colorbox").css({
    "background-color": options.barcolour[0],
                    "width": "10px",
                    "height": "10px",
                    "float": "right",
                   "margin": "20px",
                   "padding": "20px"
                 });
  $("#color1").append($("<p></p>").text(options.legend));
  $("p.colorbox").css({ "position": "absolute",
  "left": "100%"});


}
// Returns an array that has the summed values for each bar of the graph
var summedArray = function () {
  var res = [];
  for ( var i = 0; i < data.length; i++) {
    var sum = 0;
    for ( var j = 0; j < data[i].length; j++) {
      sum += data[i][j];
    }
    res[i] = sum;
  }
  return res;
}


//Returns an array that has the length of y axis in pixels and the scale that gives the number of pixels in each unit of y axis, maxvalue
var yAxis = function () {
  var yAxisLength = Math.floor($("#chartarea").height());
  var maxValue = Math.max( ...summedArray()) + parseInt(options.yinterval);
  var scale = yAxisLength / maxValue;
  var yAxis = [yAxisLength, scale, maxValue];
  return yAxis;
}

function yAxisTicks () {

  var yMax = yAxis()[2];
  var yInterval = parseInt(options.yinterval);
  var yScale = yAxis()[1];
  var numberOfTicks = yMax/yInterval;
  var displayText = 0;
  var topPosition = yMax * yScale;

  for (var i = 0; i < numberOfTicks; i++) {
    var yTick = $("<p></p").attr("class", "yticks");

    yTick.text(displayText);
    yTick.css({
            "margin": "0",
            "padding": "0",
            "left": "-5%",
            "position": "absolute",
            "top": topPosition
    });
    $("#chartarea").append(yTick);

    if(i !== 0 && options.horizontalgrid === true) {
    var hGridlines = $("<div></div>").attr("class", "horizontalGridLines");
    hGridlines.css({
                "border-top": "2px solid #f1f1f1",
                "position": "absolute",
                "top": topPosition,
                "width": Math.floor($("#chartarea").width())
    });
    $("#chartarea").append(hGridlines);
    }
    displayText += yInterval;
    topPosition -= (yInterval * yScale);
  }

}

// creates X axis data
function xDataDisplay(value, barId) {
  var xData = $("<p></p>").text(value);
    xData.attr("class","xaxisdata");
    if(options.xdataposition === 'bottom') {
    $(".xaxisdata").css( "bottom", "0");
  }
  if(options.xdataposition === 'center') {
       $(".xaxisdata").css( "top","50%");
  }
   $(barId).append(xData);
}

//creates and positions x axis labels
function xAxisLabels(label, barId) {
    var xLabel = $("<p></p>").text(label);
    xLabel.attr("class","xaxislabels");
   $("#" + barId).append(xLabel);
}

function drawBar(idName, xOffset, barHeight, barWidth, barColour, barStartPosition,barNumber, stackNumber) {
  var bar = $("<div></div>").attr({
                                  "class": "bar",
                                  "id": idName
                                    });
    idName = "#" + idName;
    $("#chartarea").append(bar);
    $(idName).height(barHeight);
    $(idName).css({
                "background-color": barColour,
                "position": "absolute",
                "left": xOffset,
                "bottom": barStartPosition
    });

    // Call function to display data values and labels
    xDataDisplay(data[barNumber][stackNumber],idName);
}

//creates the bars according to the numbers provided in the range
function createBars() {
  // Calculating bar width given the spacing of the bars
  var numberOfBars = data.length;
  var xAxisLength = $("#chartarea").width();
  var barWidth = (xAxisLength - ((numberOfBars + 1) * parseInt(options.barspacing)))/numberOfBars;
  barWidth = Math.floor(barWidth);
  var yScale = yAxis()[1];
  var barHeight;
  var barColour;
  var barStartPosition;

 //for loop that creates the bars for each of the data
  for (var i = 0; i < data.length; i++) {
    barStartPosition = 0;
    //Calculate x offset from y axis
    var xOffset = (i * barWidth) + ((i + 1) * parseInt(options.barspacing));
    var barId = "bar" + i;
    for ( var j = 0; j < data[i].length; j++) {
    barId = barId + j;
    barHeight = data[i][j] * yScale;
    drawBar(barId, xOffset, barHeight, barWidth, options.barcolour[j], barStartPosition, i, j);
    barStartPosition += barHeight;
    if(j === 0) {
      xAxisLabels(options.datalabels[i], barId);
    }
  }

  }

  // sets CSS formatting options for all bars, data and labels
  $(".bar").css({
              "width": barWidth,
              "margin": 0,
              "padding": 0,
              "border": 0
  });

  // formats the x labels in the color defined in options
   $(".xaxislabels").css({"color": options.datalabelcolor,
                            "top": "100%",
                          "padding": "5%"
    });

   $(".xaxislabels, .xaxisdata").css({ "border": "0",
                                        "margin-bottom": "2%",
                                        "margin-top": "2%",
                                        "padding": "0",
                                        "position": "absolute",
                                        "text-align": "center",
                                        "width": "100%"
                                         })
}

function drawBarChart(data, options, element) {

  $(document).ready(function(){
    createChartContainer();
    chartTitle();
    createChartArea();
    yAxisTicks();
    displayAxisTitles();
    createBars();
    displayLegend();
  });

}


