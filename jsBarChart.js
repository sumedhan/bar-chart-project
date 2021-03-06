
/* Sample Input -

// data for the chart
var data = [[200, 1000, 500, 100], [1200,300,400,100], [800,1200,230,700], [1008,200,400,123], [290,300,500,450], [170,322,304,400]];

// Customisable chart options -
var options = {

  // Chart width, height
  "chartwidth": "800px",
  "chartheight": "600px",

  // Chart title and font size
  "charttitle": "Sales in 2018",
  "titlefontsize": "20pt",
  "titlefontcolor": "#1B1725",

  // Data names in the same order as the values provided. Displayed at the x axis
  "datalabels": ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5", "Product 6"],

  // Axes titles
  "xaxistitle": "Products",
  "yaxistitle": "Sales in $ ",

  // Bar spacing and colour options for bars. Multiple bar colours for stacked bar charts.
  "barspacing": "20px",
  "barcolour": ["#9F956C","#CBBF7A","#F4E87C","#EBF38B"],

  //for stacked bar charts please provide legend for the colours
  "legend": ["Q1","Q2","Q3","Q4"],

  // X axis labels
  "xdataposition": "bottom", //options availble - top, bottom or center
  "xdatacolour": "#423E37",
  "datalabelcolor": "#534B52",

  // Y axis ticks interval in units.
  "yinterval": "500",

  // Horizontal gridlines
  "horizontalgrid": true

};

var element = 'body';

*/
// Script Functions below -

//Sets the chart size
function createChartContainer(options, element) {
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
function chartTitle(options) {
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
function displayAxisTitles (options) {
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
                  "top": "105%",
                  "font-size": "medium"
                });

$("#ytitle").css( {
                  "left": "-20%",
                  "margin": "2px",
                  "padding": "2px",
                  "position": "absolute",
                  "top":"50%",
                  "transform": "rotate(-90deg)",
                  "font-size": "medium"
                });

}

// Creates legend for stacked bar charts
function displayLegend (data, options) {
  if ( data[0].length !== 0) {
  var legend = $("<div></div>").attr("id","legend");
  $("#chartcontainer").append(legend);
  $("#legend").css({
                    "float": "right",
                    "display": "flex",
                    "justify-content": "space-around",
                    "height": "20%",
                    "width": "40%"
  });

  for ( var i = 0; i < options.legend.length; i++) {
  var color = $("<div></div").attr({
                                    "class": "colorbox",
                                    "id": "color" + i
                                    });
  color.css("background-color", options.barcolour[i]);
  $("#legend").append(color);
  var legendName = ($("<div></div>").text(options.legend[i]));
 legendName.attr("class","legendname");
 $("#legend").append(legendName);
  }

  $(".colorbox, .legendname").css({
                   "height": "10%",
                  "width": "10%",
                  "padding": "2%"
                 });

}

}
// Returns an array that has the summed values for each bar of the graph
var summedArray = function (data) {
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
var yAxis = function (data, options) {
  var yAxisLength = Math.floor($("#chartarea").height());
  var maxValue = Math.max( ...summedArray(data)) + parseInt(options.yinterval);
  var scale = yAxisLength / maxValue;
  var yAxis = [yAxisLength, scale, maxValue];
  return yAxis;
}

function yAxisTicks (data, options) {


  var yInterval = parseInt(options.yinterval);
  var yMax = yAxis(data, options)[2];
  var yScale = yAxis(data, options)[1];
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
            "top": topPosition,
            "font-size": "small"
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
function xDataDisplay(value, barId, options) {
  var xData = $("<p></p>").text(value);
  xData.attr("class","xaxisdata");
  $(barId).append(xData);
  if(options.xdataposition === 'bottom') {
    $(".xaxisdata").css( "bottom", "0");
  }
  if(options.xdataposition === 'center') {
    $(".xaxisdata").css( "top","50%");
  }
  $(".xaxisdata").css("color",options.xdatacolour);
}

//creates and positions x axis labels
function xAxisLabels(label, barId) {
    var xLabel = $("<p></p>").text(label);
    xLabel.attr("class","xaxislabels");
   $("#" + barId).append(xLabel);
}

function drawBar(data, options, idName, xOffset, barHeight, barWidth, barColour, barStartPosition,barNumber, stackNumber) {
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
    xDataDisplay(data[barNumber][stackNumber],idName, options);
}

//creates the bars according to the numbers provided in the range
function createBars(data, options) {
  // Calculating bar width given the spacing of the bars
  var numberOfBars = data.length;
  var xAxisLength = $("#chartarea").width();
  var barWidth = (xAxisLength - ((numberOfBars + 1) * parseInt(options.barspacing)))/numberOfBars;
  barWidth = Math.floor(barWidth);
  var yScale = yAxis(data, options)[1];
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
    drawBar(data, options, barId, xOffset, barHeight, barWidth, options.barcolour[j], barStartPosition, i, j);
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
                                        "width": "100%",
                                        "font-size": "small"
                                         })
}

function drawBarChart(data, options, element) {


    createChartContainer(options, element);
    chartTitle(options);
    displayLegend(data, options);
    createChartArea();
    yAxisTicks(data, options);
    displayAxisTitles(options);
    createBars(data, options);
};




