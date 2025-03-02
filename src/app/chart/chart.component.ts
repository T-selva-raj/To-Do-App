import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit {
  private chart!: Chart;
  @ViewChild('MyChart') myChart!: ElementRef<HTMLCanvasElement>;
  @Input('chartData') chartData: number[] = [0, 0, 0, 0, 0, 0, 0];
  @Input('labels') labels: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  @Input('chartType') chartType: keyof ChartTypeRegistry = 'line';
  @Input('ratio') ratio: number = 2;
  @Input('max') max: number = 10;
  axisColor: string = 'rgba(255,2555,255,0.3)';
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
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
        type: this.chartType,
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Tasks Completed',
            data: this.chartData,
            borderColor: '#ffd740',
            backgroundColor: '#ffd740',
            borderWidth: 1
          }]
        },
        options: {
          aspectRatio: this.ratio,
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: this.axisColor,
              },
              ticks: {
                stepSize: 1
              },
              max: this.max
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