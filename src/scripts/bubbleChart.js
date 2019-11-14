import * as d3 from "d3";

let diameter = 500;
export const bubbleChart = dataset => {
  // debugger;
  // console.log(dataset);

  let color = d3.hsl;
  let bubble = d3
    .pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

  // debugger;
  let svg = d3
    .select("#bubble-graph")
    .html("")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  let nodes = d3.hierarchy(dataset).sum(function(d) {
    return d.size;
  });

  let node = svg
    .selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()

    .append("g")
    .attr("class", "node")
    .attr("class", function({ data }, i) {
      return `${data.id}`;
    })
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  node
    .append("circle")
    .attr("r", function(d) {
      debugger;
      return d.r;
    })
    .style("fill", function({ data }, i) {
      // debugger;
      return color(data.id % 360, 100, 100, 0.2);
    })
    .style("stroke", function({ data }, i) {
      // debugger;
      return color(data.id % 360, 100, 100);
    });

  node
    .append("text")
    .filter(function(d) {
      return !d.children;
    })
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      debugger;
      // return `${d.data.category.substring(0, d.r / 3)} \n ${Math.round(d.data.size * 100) / 100}`;
      return `${d.data.category.substring(0, d.r / 3)} \n ${d.data.value}`;
    })
    .style("fill", color(0, 0, 100));

  d3.select(self.frameElement).style("height", diameter + "px");
};
