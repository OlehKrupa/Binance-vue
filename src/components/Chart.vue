<template>
  <div class="chart-container" ref="chart"></div>
</template>

<script>
import * as d3 from 'd3';
import { currencyHistory } from "../http/history-api";

export default {
  name: 'Chart',
  data() {
    return {
      containerWidth: 0,
      containerHeight: 0,
      apiData: null, // Initialize with null or an empty array
    };
  },
  mounted() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    this.fetchDataFromAPI();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  },
  methods: {
    async updateDimensions() {
      const chartContainer = this.$refs.chart;
      this.containerWidth = chartContainer.clientWidth;
      this.containerHeight = chartContainer.clientHeight;
      // When the dimensions change, redraw the chart
      this.createChart();
    },
    async fetchDataFromAPI() {
      try {
        const response = await currencyHistory(23); // Fetch data for currency ID
        this.apiData = Object.values(response.data); // Extract array of data objects
        this.createChart();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    createChart() {
      if (!this.apiData) return; // If data is not available, do not create the chart

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
        .domain(d3.extent(this.apiData, (d) => new Date(d.created_at)))
        .range([0, width]);

      const yValues = this.apiData.map((d) => +d.buy); // Convert strings to numbers using +
      const yMidpoint = d3.mean(yValues); // Calculate the midpoint value
      const yMaxDifference = d3.max(yValues.map((y) => Math.abs(y - yMidpoint))); // Calculate the maximum difference

      const y = d3
        .scaleLinear()
        .domain([yMidpoint - yMaxDifference, yMidpoint + yMaxDifference]) // Set symmetric domain around the midpoint
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(new Date(d.created_at)))
        .y((d) => y(+d.buy)); // Convert string to number using +

      svg.append('path')
        .datum(this.apiData)
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
  width: 100%;
  /* Make the chart container occupy 100% of the available width */
  height: 400px;
  /* Set an initial height for the chart */
}
</style>
