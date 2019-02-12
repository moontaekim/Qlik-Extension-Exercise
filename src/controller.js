import * as d3 from "d3";

export default [
  "$scope",
  "$element",
  function($scope, $element) {
    var viz = {};

    viz.margin = {
      top: 10,
      left: 50,
      right: 10,
      bottom: 50
    };

    viz.element = $element[0];
    viz.container = viz.element.querySelector(".chart-container");
    viz.svg = d3.select(viz.element).select("svg");
    viz.gX = d3.select(viz.element).select(".xAxis");
    viz.gY = d3.select(viz.element).select(".yAxis");

    viz.xScale = d3.scaleBand();
    viz.yScale = d3.scaleLinear();

    viz.yAxis = d3.axisLeft();
    viz.xAxis = d3.axisBottom();

    $scope.viz = viz;
  }
];
