import * as d3 from "d3";

const ratData = [100, 100, 100, 60];
const w = 150; 
const h = 1175;
export const barGraph = () => {

    const svg = d3.select(".bar-graph")
        .append("svg")
        .attr("height", w)
        .attr("width", h);

    svg.selectAll("rect")
        .data(ratData)
        .enter()
        .append("rect")
        .attr("x", 30)
        .attr("y", 0)
        .attr("height", 20)
        .attr("width", 100)
        .attr("fill", "steelblue");

}
