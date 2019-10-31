import * as d3 from "d3";

let diameter = 500;
export const bubbleChart = dataset => {
  // debugger;

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
    .filter(function(d) {
      return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("class", function({ data }, i) {
      // debugger;
      return `${data.id}`;
    })
    .attr("transform", function(d) {
      // debugger;
      return "translate(" + d.x + "," + d.y + ")";
    });

  //   node.append("title").text(function(d) {
  //     return d.category + ": " + d.size;
  //   });

  node
    .append("circle")
    .attr("r", function(d) {
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
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      // return `${d.data.category.substring(0, d.r / 3)} \n ${Math.round(d.data.size * 100) / 100}`;
      return `${d.data.category.substring(0, d.r / 3)} \n ${d.data.value}`;
    })
    .style("fill", color(0, 0, 100));

  d3.select(self.frameElement).style("height", diameter + "px");
};