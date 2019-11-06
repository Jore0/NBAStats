import * as d3 from "d3";

let margin = { left: 80, right: 20, top: 50, bottom: 100 };
let width = 800 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;

export const bubblePack = data => {
  let color = d3.hsl;

  let g = d3
    .select("#bubble-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  let bubblePack = d3
    .pack()
    .size([width, height])
    .padding(10);

  let nodes = d3.hierarchy(data).sum(function(d) {
    return d.size;
  });

  let node = g
    .selectAll(".node")
    .data(bubblePack(nodes).descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => {
      return "translate(" + d.x + "," + d.y + ")";
    });

  node
    .append("circle")
    .attr("r", d => {
      debugger;
      return d.r;
    })
    .attr("fill", d => color(d.data.color, 100, 100, 0.25))
    // .attr("opacity", 0.25)
    .attr("stroke", d => color(d.data.color, 100, 50))
    .attr("stroke-width", "2");

  node
    .append("text")
    .filter(function(d) {
      return !d.children;
    })
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(d => {
      // debugger;
      return `${d.data.category.substring(0, d.r / 3)} `;
    })
    .style("fill", "#FFFFFF");
};
