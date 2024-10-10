import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit {
  private chart!: Chart;
  @ViewChild('MyChart') myChart!: ElementRef<HTMLCanvasElement>;
  @Input('chartData') chartData: number[] = [0, 0, 0, 0, 0, 0, 0];
  axisColor: string = 'rgba(255,2555,255,0.3)';
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    console.log("chart..", this.chartData);

    this.createChart();
  }
  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvas = this.myChart.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
          datasets: [{
            label: 'Tasks Completed',
            data: this.chartData,
            borderColor: '#ffd740',
            backgroundColor: '#ffd740',
            borderWidth: 2,
            pointBackgroundColor: '#ffd740'
          }]
        },
        options: {
          aspectRatio: 3,
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: this.axisColor,
              },
              max: 21,
              ticks: {
                stepSize: 3
              }
            },
            x: {
              grid: {
                color: this.axisColor,
              }
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();

    }
  }
}