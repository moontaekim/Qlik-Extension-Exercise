import * as d3 from "d3";

export default function($element, layout) {
  var ext = this;
  var viz = ext.$scope.viz;

  var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
  viz.data = qMatrix;
  var dimension = qMatrix.map(d => d[0].qText);

  var maxMeasureOne = layout.qHyperCube.qMeasureInfo[0].qMax;
  var maxMeasureTwo = layout.qHyperCube.qMeasureInfo[1].qMax;
  var max = Math.max(maxMeasureOne, maxMeasureTwo);

  var minMeasureOne = layout.qHyperCube.qMeasureInfo[0].qMin;
  var minMeasureTwo = layout.qHyperCube.qMeasureInfo[1].qMin;
  var min = Math.min(minMeasureOne, minMeasureTwo);

  viz.xScale.domain(dimension);
  viz.yScale.domain([Math.min(min, 0), max]);

  var colorFillOne = layout.colorFillOne;
  var colorFillTwo = layout.colorFillTwo;

  //why is resizing not working. circles dont move.
  const line = viz.svg
    .selectAll(".line")
    .data(qMatrix)
    .enter()
    .append("line")
    .attr("stroke", "red")
    .attr("strokeWidth", "1")
    .classed("selectable line", true)
    .exit()
    .remove();

  const circleMeasureOne = viz.svg
    .selectAll(".one")
    .data(qMatrix)
    .enter()
    .append("circle")
    .attr("r", 5)
    .classed("selectable one", true)
    .attr("fill", colorFillOne)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .exit()
    .remove();

  const circleMeasureTwo = viz.svg
    .selectAll(".two")
    .data(qMatrix)
    .enter()
    .append("circle")
    .attr("r", 5)
    .classed("selectable two", true)
    .attr("fill", colorFillTwo)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .exit()
    .remove();

  // mouse events how do i group an entire dumbell together to do this???
  function handleMouseOver(d, i) {
    //conditional statement. If hovered item has qElem number, do something.
    d3.select(this).attr("r", 10);
  }
  function handleMouseOut(d, i) {
    d3.select(this).attr("r", 5);
  }

  ext.resize($element, layout);

  var backendApi = this.backendApi;

  $element.css("overflow", "auto");

  $element.find(".selectable").on("click", function() {
    var dimInd = parseInt(this.getAttribute("dim-index"));
    backendApi.selectValues(0, [dimInd], true);
  });

  var ticks = d3.selectAll("g").on("click", function() {
    //need dim index on each tick somehow...
    d3.select(this).attr("dim-index", "5");
  });
}
