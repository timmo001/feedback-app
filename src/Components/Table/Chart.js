import React, { Component } from 'react';
// import moment from 'moment';
import { scaleLinear, scaleOrdinal, scaleTime, schemeCategory10 } from 'd3-scale';
import { extent, max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeWeek } from 'd3-time';
import { timeFormat } from 'd3-time-format';
// import { tsv } from 'd3-fetch';
// import tsvData from './data.tsv';
import '../App.css';

const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// var parseTime = timeParse('%Y%m%d');

class Chart extends Component {
  componentDidMount = () => {
    this.createChart();
  }

  componentDidUpdate = () => {
    this.createChart();
  }

  createChart = () => {
    switch (this.props.type) {
      case 'bar': this.createBarChart(); break;
      case 'line-date': this.createDateLineChart(); break;
      default: break;
    }
    // this.createTestLineChart();
  }

  createBarChart = () => {
    const node = this.node;
    const dataMax = max(this.props.data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25);
  }

  createDateLineChart = () => {
    const node = this.node;
    var svg = select(node);

    svg.attr('overflow', 'visible');

    var width = +svg.attr('width') - margin.left - margin.right;
    var height = +svg.attr('height') - margin.top - margin.bottom;

    var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = scaleTime()
      .rangeRound([0, width]);

    var y = scaleLinear()
      .rangeRound([height, 0]);

    var z = scaleOrdinal(schemeCategory10);

    var d3Line = line()
      // .curve(curveBasis)
      .x((d) => { return x(d.date); })
      .y((d) => { return y(d.value); });

    var values = [];
    this.props.data.map((i) => {
      return values = values.concat(i.values);
    });

    x.domain(this.props.xscale !== undefined ? this.props.xscale : extent(values, (d) => { return d.date; }));
    y.domain(this.props.yscale !== undefined ? this.props.yscale : extent(values, (d) => { return d.value; }));
    z.domain(this.props.data.map((d) => { return d.name; }));

    // X axis
    g.append('g')
      .call(axisLeft(y))
      // Set axis label
      .append('text')
      .attr('fill', '#000000')
      .attr('transform', 'rotate(-90)')
      .attr('transform-y', '-50%')
      .attr('y', -30) // Left
      .attr('x', (height / 2) * -1) // Down
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'center')
      .text(this.props.labels.x);

    // Y axis
    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(x)
        .ticks(timeWeek.every(1))
        .tickFormat(function (d, i) {
          return 'W' + (i + 1) + ' - ' + timeFormat('%d/%m/%y')(d)
        })
      )
      // Removes axis line
      // .select('.domain')
      // .remove()
      // Set axis label
      .append('text')
      .attr('fill', '#000000')
      .attr('transform-x', '-50%')
      .attr('y', 30) // Down
      .attr('x', (width / 2)) // Left
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'center')
      .text(this.props.labels.y);

    var project = g.selectAll(".project")
      .data(this.props.data)
      .enter().append("g")
      .attr("class", "project");

    project.append("path")
      .attr("class", "line")
      .attr("d", function (d) { return d3Line(d.values); })
      .style("stroke", function (d) { return z(d.name); });

    project.append("text")
      .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
      .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function (d) { return d.name; });
  }

  render() {
    return (
      <svg ref={node => this.node = node}
        width={1280}
        height={720} />
    );
  }
}

export default Chart;
