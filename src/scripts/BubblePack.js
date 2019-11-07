import * as d3 from "d3";
import d3Tip from "d3-tip";
let margin = { left: 80, right: 20, top: 50, bottom: 100 };
let width = 500 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

export const bubblePack = (data, c, name) => {
  if (!d3.selectAll(".node").empty()) {
  } else {
    let g = d3
      .select("#bubble-graph")
      // .html("")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    let bubblePack = d3
      .pack()
      .size([width, height])
      .padding(10);

    let tip = d3Tip();
    tip.attr("class", "d3-tip").html(function(d) {
      let text;
      if (typeof d.data.category === "undefined") {
        text =
          `<strong>Player:</strong> <span style='color:red'>` +
          name +
          "</span><br>";
      } else {
        text =
          `<strong>${d.data.category}:</strong> <span style='color:red'>` +
          d.data.value +
          "</span><br>";
      }

      return text;
    });
    g.call(tip);

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
        // debugger;
        return d.r;
      })
      .attr("fill", d => {
        if (d.data.color === "red") {
          return "rgb(255, 0, 0)";
        } else if (d.data.color === "blue") {
          return "rgb(41, 121, 255)";
        } else if (d.data.color === "green") {
          return "rgb(0, 230, 118)";
        } else if (d.data.color === "yellow") {
          return "rgb(255, 145, 0)";
        } else if (d.data.color === "purple") {
          return "rgb(213, 0, 249)";
        } else {
          return "rgba(255, 255, 255, 0.87)";
        }
      })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .attr("opacity", 0.25)
      .attr("stroke", d => {
        d.data.color;
      })
      .attr("stroke-width", "2");

    node
      .append("text")
      .filter(function(d) {
        return !d.children;
      })
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(d => {
        return `${d.data.category.substring(0, d.r / 3)} `;
      })
      .style("fill", "#FFFFFF");
  }
};
