// React serves purely as a store
// This component leaves the visual logic to d3

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import * as d3 from "d3";
import moment from 'moment';
export default React.createClass({
  mixins: [PureRenderMixin],
  getLoads(){
    return this.props.loads || [];
  },
  installD3(){
    // needed to clear d3
    this.refs.graph.innerHTML = '';

    // generate static sizing
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.2);
    var y = d3.scaleLinear()
      .range([height, 0]);
    // redraw the svg, use transform rather than absolute positioning
    // transform avoids additional renders cycles
    // triggers composition
    var svg = d3.select(".graph").insert("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var loads = this.getLoads().toJS();
    loads = loads.map((load) => {
      load["time"] = moment.unix(load["time"]).toDate();
      return load;
    });
    x.domain(loads.map(function(load) { return load['time']; }));
    y.domain([0, d3.max(loads, function(load) { return load['load']; })]);

    //the custom tick logic makes it so that only certain values are available
    var ticks = x.domain().filter(function(d,i){ return (i % 10 == 0 || i == 59); } );
    var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat('%H:%M:%S'));
    xAxis.tickValues( ticks );

    //this logic is used to create the graph object
    let graphObj = {
      'over-load': loads.filter(load => load['load'] > 1),
      'under-load': loads.filter(load => load['load'] <= 1)
    }

    // this div is only created once
    var div = d3.select(".graph").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    Object.keys(graphObj).forEach((key) => {
      // this de-duplicates adding bars and only changes the color logic
      // for the appropriate dataset
      let color = key === 'over-load' ? 'red' : 'green';
      svg.selectAll(`.${key}`)
        .data(graphObj[key])
        .enter().append("rect")
        .attr("class", "bar")
        .style('fill', color)
        .attr("x", function(d) { return x(d.time); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.load); })
        .attr("height", function(d) { return height - y(d.load); })
        .on("mouseover", function(d,idx,bars) {
          //mouseover event to add the tooltip and change the bar color
          let bar = bars[idx];
          bar.style.fill ='grey'
          let time = d.time;
          var formatTime = d3.timeFormat('%H:%M:%S')
          time = formatTime(time);
          div.transition()
            .duration(200)
            .style("opacity", .8);
          div.html(`<div><strong>Load</strong>: ${d.load}</div> <div><strong>Time</strong>: ${time}</div>`)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY + 10) + "px");
        })
        .on("mouseout", function(d, idx, bars) {
          //mouseout event to hide the tooltip and change the bar color back
          let color = d.load > 1 ? 'red' : 'green';
          let bar = bars[idx];
          bar.style.fill = color;
          div.transition()
            .duration(500)
            .style("opacity", 0);
        });
    });

    // add the X axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "begin")
      .attr("dx", "0em")
      .attr("dy", "1.5em");

    // add the Y axis
    svg.append("g")
      .call(d3.axisLeft(y));
  },
  componentDidUpdate(){
    this.installD3();
  },
  componentDidMount(){
    this.installD3();
  },
  render(){
    return <div className="graph-container">
      <h1>System Load Monitoring</h1>
      <div className="graph" ref="graph">
      </div>;
    </div>
  }
});
