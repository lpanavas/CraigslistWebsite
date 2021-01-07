import React from "react";
import * as d3 from "d3";

const BottomAxis = (props) => {

    const createBarChart = () => {
        const node = this.node
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
           .domain([0, dataMax])
           .range([0, this.props.size[1]])
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .enter()
        .append('rect')
     
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .exit()
        .remove()
     
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 25)
        .attr('y', d => this.props.size[1] — yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 25)
     };

  return<svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>;
};

export default BottomAxis;
