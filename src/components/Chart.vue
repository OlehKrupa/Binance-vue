<template>
  <div>
    <div class="chart-container" ref="chart"></div>
    <div class="select-container text-center">
      <div class="btn-group">
        <button v-for="hours in hoursOptions" :key="hours" :class="{ 'btn-selected': selectedHours === hours }"
          @click="selectHours(hours)">
          {{ formatHours(hours) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { currencyHistory } from '../http/history-api';

export default {
  name: 'Chart',
  data() {
    return {
      containerWidth: 0,
      containerHeight: 0,
      apiData: null,
      selectedHours: 6,
      hoursOptions: [1, 6, 12, 24, 48, 72],
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
  watch: {
    selectedHours() {
      this.createChart();
    },
  },
  methods: {
    formatHours(hours) {
      return hours >= 24 ? hours / 24 + ' days' : hours + ' Hour';
    },
    calculateNumXTicks(width) {
      if (width <= 400) {
        return 4;
      } else if (width <= 1000) {
        return 5;
      } else {
        return 6;
      }
    },
    async updateDimensions() {
      const chartContainer = this.$refs.chart;
      this.containerWidth = chartContainer.clientWidth;
      this.containerHeight = chartContainer.clientHeight;
      this.createChart();
    },
    async fetchDataFromAPI() {
      try {
        const response = await currencyHistory(23);
        this.apiData = Object.values(response.data);
        this.createChart();
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, display an error message to the user
      }
    },
    createChart() {
      if (!this.apiData) return;

      const margin = { top: 30, right: 30, bottom: 30, left: 80 };
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

      const endDate = new Date();
      const startDate = d3.timeHour.offset(endDate, -this.selectedHours);

      let timeInterval = d3.timeHour;
      if (this.selectedHours === 1) {
        timeInterval = d3.timeMinute.every(15);
      } else if (this.selectedHours === 12) {
        timeInterval = d3.timeHour;
      }

      const filteredData = this.apiData.filter((d) => {
        const date = new Date(d.created_at);
        return date >= startDate && date <= endDate;
      });

      const x = d3.scaleTime().domain([startDate, endDate]).range([0, width]);

      const yValues = filteredData.map((d) => +d.buy);
      const yMidpoint = d3.mean(yValues);
      const yMaxDifference = d3.max(yValues.map((y) => Math.abs(y - yMidpoint)));

      const y = d3
        .scaleLinear()
        .domain([yMidpoint - yMaxDifference, yMidpoint + yMaxDifference])
        .range([height, 0]);

      const numXTicks = this.calculateNumXTicks(width);
      const numYTicks = Math.floor(height / 100);

      const xAxis = d3
        .axisBottom(x)
        .ticks(timeInterval)
        .tickFormat(d3.timeFormat('%b %d, %H:%M'))
        .ticks(numXTicks);

      const yAxis = d3.axisLeft(y).ticks(numYTicks).tickFormat(d3.format('.2f'));

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .call((g) => g.select('.domain'))
        .call((g) =>
          g
            .selectAll('.tick line')
            .clone()
            .attr('y2', -height)
            .attr('stroke-opacity', 0.2)
            .attr('stroke-dasharray', '2,2')
        )
        .selectAll('.tick')
        .selectAll('text')
        .style('font-size', '14px');

      svg.append('g')
        .call(yAxis)
        .call((g) => g.select('.domain'))
        .call((g) =>
          g
            .selectAll('.tick line')
            .clone()
            .attr('x2', width)
            .attr('stroke-opacity', 0.2)
            .attr('stroke-dasharray', '2,2')
        )
        .selectAll('.tick')
        .selectAll('text')
        .style('font-size', '14px');

      const line = d3
        .line()
        .defined((d) => !isNaN(+d.buy))
        .x((d) => x(new Date(d.created_at)))
        .y((d) => y(+d.buy))
        .curve(d3.curveCatmullRom.alpha(0.5));

      svg.append('path')
        .datum(filteredData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

      svg.selectAll('.point')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', (d) => x(new Date(d.created_at)))
        .attr('cy', (d) => y(+d.buy))
        .attr('r', 4)
        .attr('fill', 'steelblue');

      const tooltip = d3
        .select(this.$refs.chart)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('pointer-events', 'none')
        .style('background-color', '#f9f9f9')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('padding', '5px');

      svg.selectAll('.point')
        .on('mouseover', (event, d) => {
          const chartContainerRect = this.$refs.chart.getBoundingClientRect();
          const xPosition = event.clientX - chartContainerRect.left;
          const yPosition = event.clientY - chartContainerRect.top;

          tooltip
            .style('left', `${xPosition + 20}px`)
            .style('top', `${yPosition + 50}px`)
            .html(
              `${d3.timeFormat('%b %d, %H:%M')(new Date(d.created_at))}<br>$ ${d3.format('.2f')(+d.buy)}`
            )
            .style('opacity', 1);
        })
        .on('mouseout', () => {
          tooltip.style('opacity', 0);
        });
    },

    selectHours(hours) {
      this.selectedHours = hours;
    },
  },
};
</script>

<style>
/* Some style improvements can be made here */
@import url('../assets/chart.css');
</style>
