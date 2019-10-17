import * as d3 from "d3";

// const dataset = {
//     "children": [{
//         "category": "Games Played",
//         "responseCount": 2, 
       
//     }, {
//         "category": "FAC0006",
//         "responseCount": 2
//     }, {
//         "category": "FAC0002",
//         "responseCount": 1
//     }, {
//         "category": "FAC0003",
//         "responseCount": 2
//     }, {
//         "category": "FAC0004",
//         "responseCount": 9
//     }, {
//         "category": "FAC0005",
//         "responseCount": 1
//     }]
// };

let diameter = 300;
export const bubbleChart = (dataset) => {
let color = d3.scaleOrdinal(d3.schemeCategory10);

let bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);
    
let svg = d3.select(".bubble-graph")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

let nodes = d3.hierarchy(dataset)
    .sum(function (d) { return d.size; });

let node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function (d) {
        return d.category + ": " + d.size;
    });

node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d) {
        return color(d.category);
    });

node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function (d) {
        // return `${d.data.category.substring(0, d.r / 3)} \n ${Math.round(d.data.size * 100) / 100}`;
        return `${d.data.category.substring(0, d.r / 3)} \n ${d.data.value}`;
    })


d3.select(self.frameElement)
    .style("height", diameter + "px");

}

