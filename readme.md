# About
This project utilizes vanilla JavaScript, CSS and JQuery to develop a bar chart with customizable features. This project is part of the Lighthouse Labs Web Development boot-camp prep work. The API can be used to create a vertical bar chart.

# Example Screenshots 

### Example 1 - Single Bar Chart

![alt text](screenshots/barchart1.png "Single Bar Chart 1")

### Example 2 - Single Bar Chart 

![alt text](screenshots/barchart2.png "Single Bar Chart 2")

### Example 3 - Stacked Bar Chart

![alt text](screenshots/barchart3.png "Stacked Bar Chart")

# API Function and parameters

The user should use the following API - 
**drawBarChart(data, options, element)**

### Description of parameters

1. data 
A 2D array which stores the bar chart values. Each array in the 2D array may have multiple values for a stacked bar chart. 
For more details see the examples below -
..* Single Bar Chart:
data = [[12],[20],[21]] or
data = [[100],[4243],[32]]

..* Stacked Bar Chart:
data = [[200, 1000, 500, 100], [1200,300,400,100], [800,1200,230,700], [1008,200,400,123], [290,300,500,450], [170,322,304,400]] or
data = [[31,13], [13,14]]

2. options
A JSON for customizable features. All the objects are defined below -


  chartwidth -  chart width in pixels, string
  chartheight - chart height in pixels, string

  charttitle -  Chart title, string
  titlefontsize - Title font size in pt or pixels, string
  titlefontcolor - Title font color, string

  datalabels - Data labels for each bar, array

  xaxistitle & yaxistitle - Axes title, string

  barspacing - Spacing between bars in pixel, should be written as "50px"
  barcolour - Bar colours, array of strings. Single bar chart will have a single colour and stacked bar chart will have a colour for each stack. 

  legend - Legend for each stack in a stacked bar chart. Can be left blank for single bar chart

  xdataposition - All data values are displayed inside the bar. It can be positioned either at the bottom, center or the top. 
  xdatacolour- Colour for the x data display
  datalabelcolor: Data label colour

  yinterval: Interval for displaying the y axis ticks. Interval is in the same units as the data.

  horizontalgrid: Boolean value for display of horizontal gridlines.

3. element
A string value with the element name where the chart will be displayed. 


### Feature List 


A Feature list of your library (options it supports, etc)
A list of known issues / bugs
A list of features that are on the roadmap but haven't been implemented yet
A list of all the external resources (tutorials, docs, example code, etc) that you encountered and used to help you create this library





References used:
1. JSON tutorial on W3 Schools
https://developers.google.com/web/fundamentals/web-components/customelements
http://www.corelangs.com/css/box/divindiv.html
https://stackoverflow.com/questions/5288336/put-text-at-bottom-of-div/38335934
https://developer.mozilla.org/en-US/docs/Glossary/Grid_Lines

