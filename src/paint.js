import * as d3 from "d3";

export default function($element, layout) {
  var backendApi = this.backendApi;

  var element = $element[0];
  var container = element.querySelector(".chart-container");
  var rect = container.getBoundingClientRect();
  var height = rect.height;
  var width = rect.width;
  var margin = {
    top: 10,
    left: 50,
    right: 10,
    bottom: 50
  };

  $element.css("overflow-x", "auto");

  //data
  var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

  //dimension
  var dimension = qMatrix.map(d => d[0].qText);

  //xScale
  var xScale = d3
    .scaleBand()
    .domain(dimension)
    .range([margin.left, width - margin.right]);

  //yScale
  var maxMeasureOne = layout.qHyperCube.qMeasureInfo[0].qMax;
  var maxMeasureTwo = layout.qHyperCube.qMeasureInfo[1].qMax;
  var max = Math.max(maxMeasureOne, maxMeasureTwo);

  var minMeasureOne = layout.qHyperCube.qMeasureInfo[0].qMin;
  var minMeasureTwo = layout.qHyperCube.qMeasureInfo[1].qMin;
  var min = Math.min(minMeasureOne, minMeasureTwo);

  var yScale = d3
    .scaleLinear()
    .domain([Math.min(min, 0), max])
    .range([height - margin.bottom, margin.top]);

  //svg stuff
  var svg = d3
    .select(element.querySelector("svg"))
    .html("")
    .attr("width", width)
    .attr("height", height);

  //color fills
  var colorFillOne = layout.colorFillOne;
  var colorFillTwo = layout.colorFillTwo;

  //shapes
  const line = qMatrix.map(d => {
    d3.select("svg")
      .append("line")
      .attr("x1", xScale(d[0].qText) + xScale.bandwidth() / 2)
      .attr("y1", yScale(d[2].qNum))
      .attr("x2", xScale(d[0].qText) + xScale.bandwidth() / 2)
      .attr("y2", yScale(d[1].qNum))
      .attr("stroke", "red")
      .attr("strokeWidth", "1");
  });

  const circleMeasureOne = qMatrix.map(d => {
    d3.select("svg")
      .append("circle")
      .attr("cx", xScale(d[0].qText) + xScale.bandwidth() / 2)
      .attr("cy", yScale(d[1].qNum))
      .attr("r", 5)
      .attr("fill", colorFillOne);
  });

  const circleMeasureTwo = qMatrix.map(d => {
    d3.select("svg")
      .append("circle")
      .attr("cx", xScale(d[0].qText) + xScale.bandwidth() / 2)
      .attr("cy", yScale(d[2].qNum))
      .attr("r", 5)
      .attr("fill", colorFillTwo);
  });

  //axis
  var yAxis = d3.axisLeft().scale(yScale);

  var xAxis = d3.axisBottom().scale(xScale);

  var gxAxis = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

  var gyAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);
}
