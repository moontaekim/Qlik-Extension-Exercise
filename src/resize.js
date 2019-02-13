import * as d3 from "d3";

export default function($element, layout, data) {
  var ext = this;
  var viz = ext.$scope.viz;
  var data = viz.data;

  var rect = viz.container.getBoundingClientRect();
  var height = rect.height;
  var width = rect.width;

  viz.svg.attr("width", width).attr("height", height);

  var xScale = viz.xScale.range([viz.margin.left, width - viz.margin.right]);
  var yScale = viz.yScale.range([height - viz.margin.bottom, viz.margin.top]);

  viz.svg
    .selectAll(".gStuff")
    .attr(
      "transform",
      d => `translate(${xScale(d[0].qText) + xScale.bandwidth() / 2}, 0)`
    );

  const line = viz.svg
    .selectAll(".line")
    // .attr("x1", d => xScale(d[0].qText) + xScale.bandwidth() / 2)
    .attr("y1", d => yScale(d[2].qNum))
    // .attr("x2", d => xScale(d[0].qText) + xScale.bandwidth() / 2)
    .attr("y2", d => yScale(d[1].qNum))
    .attr("dim-index", d => d[0].qElemNumber);

  const circleMeasureOne = viz.svg
    .selectAll(".one")
    // .attr("cx", d => xScale(d[0].qText) + xScale.bandwidth() / 2)
    .attr("cy", d => yScale(d[1].qNum))
    .attr("dim-index", d => d[0].qElemNumber);

  const circleMeasureTwo = viz.svg
    .selectAll(".two")
    // .attr("cx", d => xScale(d[0].qText) + xScale.bandwidth() / 2)
    .attr("cy", d => yScale(d[2].qNum))
    .attr("dim-index", d => d[0].qElemNumber);

  //axis
  var yAxis = viz.yAxis.scale(yScale);
  var xAxis = viz.xAxis.scale(xScale);
  var gyAxis = viz.gY
    .attr("transform", `translate(${viz.margin.left}, 0)`)
    .call(yAxis);

  var gxAxis = viz.gX
    .attr("transform", `translate(0, ${height - viz.margin.bottom})`)
    .call(xAxis)
    .classed("ticks", true);
}
