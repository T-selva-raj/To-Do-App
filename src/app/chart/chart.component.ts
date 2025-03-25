import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  private chart!: Chart;

  @ViewChild('MyChart') myChart!: ElementRef<HTMLCanvasElement>;

  @Input() chartData: number[] = [];
  @Input() labels: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  @Input() chartType: keyof ChartTypeRegistry = 'line';
  @Input() ratio: number = 2;
  @Input() max: number = 10;
  @Input() pieColors: string[] = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF9F33', '#9F33FF', '#33FFF1'
  ];
  axisColor: string = 'rgba(255,255,255,0.3)';

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
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
            backgroundColor: this.chartType === 'pie' ? this.pieColors : 'rgba(255, 215, 64, 0.6)',
            borderColor: this.chartType === 'line' ? '#ffd740' : '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: this.chartType === 'pie' ? 1 : this.ratio,
          scales: this.chartType === 'pie' ? {} : {
            y: {
              beginAtZero: true,
              grid: {
                color: this.axisColor
              },
              ticks: {
                stepSize: 1,
              }
            },
            x: {
              grid: {
                color: this.axisColor
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
