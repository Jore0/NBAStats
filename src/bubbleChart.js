import "./styles/bubble.scss";
import * as d3 from  "d3";
import {flare} from "./flare"

// Constants
let diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

// Define a bubble object with attributes
let bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

// Define svg object
let svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

// Define 'div' for tooltips
let div = d3.select("#bubble")
    .append("div")  // declare the tooltip div 
    .attr("class", "tooltip")
    .style("opacity", 0);
    //.text("a simple tooltip");

d3.json(flare, function (error, root) {

    // Throw warning
    if (error) return console.warn(error);

    // Get the data from the JSON file 
    pts = getTheData(root);

    // Visualise the data
    visualiseIt(pts);

});// Get the data from the json file
function getTheData(root) {

    // Get the node values
    var pts = bubble.nodes(classes(root)).filter(function (d) { return !d.children; });
    return pts;

}

// Visualise the data function 
function visualiseIt(pts) {

    // Define a node
    // Use a <g> element to put multiple elements in the same location, such
    // as a <circle> and <text> element.
    let node = svg.selectAll(".node")
        .data(pts)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })

    // Shape for each node
    node.append("circle")
        .attr("r", function (d) { return d.r; })
        .style("fill", function (d) { return color(d.packageName); });

    // Label for each node
    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function (d) { return d.className.substring(0, d.r / 3); });

    // Tooltip for bubble
    node.on("mouseover", function (d) {
        div.transition()
            .duration(100)
            .style("visibility", "visible")
            .style("opacity", 0.9);
        div.html(
            "Package: " + d.packageName + "<br/>" +
            "Class: " + d.className + "<br/>" +
            "Size: " + d.value
        )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function () { return div.style("visibility", "hidden"); });
} // visualiseIt(pts)


// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
    let classes = [];

    function recurse(name, node) {
        if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
        else classes.push({ packageName: name, className: node.name, value: node.size });
    }

    recurse(null, root);
    return { children: classes };
}

d3.select(self.frameElement).style("height", diameter + "px");