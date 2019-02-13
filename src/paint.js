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

  const groups = viz.svg
    .selectAll(".gStuff")
    .data(qMatrix, d => d[0].qElemNumber);

  groups.exit().remove();

  const enteringGroups = groups
    .enter()
    .append("g")
    .classed("gStuff", true)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  enteringGroups
    .append("line")
    .attr("stroke", "red")
    .attr("strokeWidth", "1")
    .classed("selectable line", true);

  enteringGroups
    .append("circle")
    .attr("r", 5)
    .classed("selectable one", true)
    .attr("fill", colorFillOne);

  enteringGroups
    .append("circle")
    .attr("r", 5)
    .classed("selectable two", true)
    .attr("fill", colorFillTwo);
  // .on("mouseover", handleMouseOver)
  // .on("mouseout", handleMouseOut);

  // join the data
  // const lineJoin = viz.svg
  //   .selectAll(".line") // [line (id: "b"), line (id:"a"), line (id: "c")]
  //   .data(qMatrix, d => d[0].qElemNumber); // [{ id: "a", value: 1}, { id: "d", value: 2}]

  // lineJoin.exit().remove();

  // const lineEnter = lineJoin
  //   .enter()
  //   .append("line")
  //   .attr("stroke", "red")
  //   .attr("strokeWidth", "1")
  //   .classed("selectable line", true);

  // line.merge(lineEnter)
  //   .attr("x1", d=>...)

  //enter exit update? exit?
  // const line = viz.svg
  //   .selectAll(".line") // [line (id: "b"), line (id:"a"), line (id: "c")]
  //   .data(qMatrix, d => d[0].qElemNumber) // [{ id: "a", value: 1}, { id: "d", value: 2}]
  //   // exiting: "b", "c"
  //   // entering: "d"
  //   // existing: "a"
  //   .enter()
  //   .append("line")
  //   .attr("stroke", "red")
  //   .attr("strokeWidth", "1")
  //   .classed("selectable line", true);

  /*
    <g transform="translate(100, 0)" onMouseEnter="">
      <line />
      <circle />
      <circle />
    </g>

  */

  // const circleMeasureOne = viz.svg
  //   .selectAll(".one")
  //   .data(qMatrix, d => d[0].qElemNumber);

  // circleMeasureOne.exit().remove();

  // circleMeasureOne
  //   .enter()
  //   .append("circle")
  //   .attr("r", 5)
  //   .classed("selectable one", true)
  //   .attr("fill", colorFillOne)
  //   .on("mouseover", handleMouseOver)
  //   .on("mouseout", handleMouseOut);

  // const circleMeasureTwo = viz.svg.selectAll(".two").data(qMatrix);

  // circleMeasureTwo.exit().remove();

  // circleMeasureTwo
  //   .enter()
  //   .append("circle")
  //   .attr("r", 5)
  //   .classed("selectable two", true)
  //   .attr("fill", colorFillTwo)
  //   .on("mouseover", handleMouseOver)
  //   .on("mouseout", handleMouseOut);

  // mouse events how do i group an entire dumbell together to do this???
  function handleMouseOver(d, i) {
    //conditional statement. If hovered item has qElem number, do something.
    d3.select(this).attr("opacity", 0.5);
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
