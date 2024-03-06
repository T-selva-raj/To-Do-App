import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  ctx: any;
  config: any;
  chartData: number[] = [100, 200, 300]; // Example data

  ngOnInit() {
    this.ctx = document.getElementById('chart');
    this.config = {
      type: 'pie',
      data: {
        labels: ['All tasks', 'Today tasks', 'Special tasks'],
        datasets: [{
          label: 'Tasks',
          data: this.chartData,
          borderWidth: 5,
          borderColor: 'grey',
          backgroundColor: ['#6ff287', '#ffd740', '#6ab4d4']
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Tasks Overview'
        },
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltips: {
          enabled: true
        },
        animation: {
          duration: 2000,
          easing: 'easeOutBounce'
        },
        responsive: false
      }

    };
    const myChart = new Chart(this.ctx, this.config);
  }
}
