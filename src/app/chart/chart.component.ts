import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit {
  private chart!: Chart;
  @ViewChild('MyChart') myChart!: ElementRef<HTMLCanvasElement>;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.createChart();
  }
  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
      console.log("Existing chart destroyed before creating a new one");
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
            data: [0, 8, 5, 7, 3, 2, 1],
            borderColor: '#ffd740',
            backgroundColor: '#ffd740',
            borderWidth: 2,
            pointBackgroundColor: '#ffd740',
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
                color: 'rgba(0, 0, 0, 0.1)',
              },
              max: 21,
              ticks: {
                stepSize: 3
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              bodyFont: {
                size: 14,
              },
              titleFont: {
                size: 16,
                weight: 'bold',
              }
            },
            legend: {
              labels: {
                font: {
                  size: 14,
                }
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