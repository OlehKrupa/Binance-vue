<template>
    <div class="chart-container" ref="chart"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    name: 'Chart',
    data() {
      return {
        containerWidth: 0,
        containerHeight: 0,
      };
    },
    mounted() {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
      this.createChart();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    },
    methods: {
      updateDimensions() {
        const chartContainer = this.$refs.chart;
        this.containerWidth = chartContainer.clientWidth;
        this.containerHeight = chartContainer.clientHeight;
        // When the dimensions change, redraw the chart
        this.createChart();
      },
      createChart() {
        const data = [
          { date: '2023-08-01', value: 10 },
          { date: '2023-08-02', value: 20 },
          { date: '2023-08-03', value: 15 },
          // Add more data points here
        ];
  
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = this.containerWidth - margin.left - margin.right;
        const height = this.containerHeight - margin.top - margin.bottom;
  
        d3.select(this.$refs.chart).selectAll('*').remove();
  
        const svg = d3
          .select(this.$refs.chart)
          .append('svg')
          .attr('width', this.containerWidth)
          .attr('height', this.containerHeight)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
  
        const x = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => new Date(d.date)))
          .range([0, width]);
  
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.value)])
          .range([height, 0]);
  
        const line = d3
          .line()
          .x((d) => x(new Date(d.date)))
          .y((d) => y(d.value));
  
        svg.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 2)
          .attr('d', line);
  
        svg.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));
  
        svg.append('g').call(d3.axisLeft(y));
      },
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  .chart-container {
    width: 100%; /* Make the chart container occupy 100% of the available width */
    height: 400px; /* Set an initial height for the chart */
  }
  </style>
  