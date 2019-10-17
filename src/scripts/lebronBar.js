import * as d3 from "d3";

const ratData = [40, 90, 30, 60];
const w = 150; 
const h = 175;
export const barGraph = () => {

    const svg = d3.select(".bar-graph")
        .append("svg")
        .attr("height", h)
        .attr("width", w);

    svg.selectAll("rect")
        .data(ratData)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return i * 25 + 30
        })
        .attr("y", function(d){
            return h - d
        })
        .attr("height", function (d) {
            return d
        })
        .attr("width", 20)
        .attr("fill", "steelblue");

    svg.append("line")
        .attr("x1", 30)
        .attr("y1", 75)
        .attr("x2", 30)
        .attr("y2", 175)
        .attr("stroke-width", 2)
        .attr("stroke", "black");
    svg.append("line")
        .attr("x1", 30)
        .attr("y1", 175)
        .attr("x2", 130)
        .attr("y2", 175)
        .attr("stroke-width", 2)
        .attr("stroke", "black");
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .text("No. of Rats")
        .attr("transform", "translate(20, 20) rotate(-90)");
}
