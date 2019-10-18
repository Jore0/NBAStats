import * as d3 from "d3";
let diameter = 300;
export const bubbleChart3 = data => {
  // const circleRadius = 60;
  // const circleDiameter = circle Radius * 2;

  const plot = (data, svg) => {
    // debugger;
    let color = d3.hsl;
    const circle = svg.selectAll("circle").data(data);
    // .size([diameter, diameter]);

    circle
      .enter()
      .append("circle")

      .attr("cy", diameter)
      .attr("cx", (d, i) => 10 + i * diameter)
      // .attr("transform", function(d) {
      //   debugger;
      //   return "translate(" + diameter / 2 + "," + diameter / 2 + ")";
      // })
      .attr("r", d => d.r)
      .transition()
      .attr("r", d => d.r);

    // circle.style("fill", function({ data }, i) {
    //   debugger;
    //   return color(data.id % 360, 100, 100);
    // });
    circle
      .append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) {
        debugger;
        // return `${d.data.category.substring(0, d.r / 3)} \n ${Math.round(d.data.size * 100) / 100}`;
        return `${d.data.category.substring(0, d.r / 3)} \n ${d.data.value}`;
      });
    circle
      .exit()
      .transition()
      .attr("r", 0)
      .remove();
  };
  const svg = d3.select("svg");
  const addCircle = () => {
    if (data.length < 5) data.push(1);
    plot(data, svg);
  };

  const removeCircle = () => {
    data.pop();
    plot(data, svg);
  };
  document.getElementById("addCircle").addEventListener("click", addCircle);
  document
    .getElementById("removeCircle")
    .addEventListener("click", removeCircle);

  plot(data, svg);
};
