import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';
interface TaskData {
  created: number;
  completed: number;
  open: number;
  inProgress: number;
  chartData: number[];
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent implements OnInit, AfterViewInit, OnDestroy {
  Report = 'Report';
  labels: string[] = ['Low', 'Medium', 'High'];
  pieColors: string[] = ['#69c440', '#f1dc32', '#da0808'];
  dateRange!: FormGroup;
  selectedRange: any = {};
  maxDate: Date = new Date();
  subscriptionObj: Subscription = new Subscription();
  taskData: TaskData = {
    created: 0,
    completed: 0,
    open: 0,
    inProgress: 0,
    chartData: []
  }
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private loader: LoaderService,
    private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.dateRange = this.fb.group({
      start: [null],
      end: [null]
    });
    this.dateRange.valueChanges.subscribe((values) => {
      this.onDateRangeChange(values);
    });
  }
  ngAfterViewInit(): void {
    this.getReport();

  }
  onDateRangeChange(values: { start: Date; end: Date }) {
    const { start, end } = values;
    if (start && end) {
      this.selectedRange = { from: moment(start).format('YYYY-MM-DD'), to: moment(end).format('YYYY-MM-DD') };
      this.getReport(this.selectedRange);
    }
  }
  resetDateRange() {
    this.dateRange.reset();
  }
  getReport(dateRange?: any) {
    this.loader.showLoader();
    this.subscriptionObj.add(this.taskService.getReport(dateRange).subscribe(
      (res: any) => {
        if (res.result) {
          this.taskData = { ...res.result, chartData: [...res.result.chartData] };
          this.snackbar.openSnackBar({ message: "Report fetched successfully..!", snacktype: SnackType.Success, class: 'success', duration: 1000 });
          this.loader.hideLoader();
        }
      },
      (error: any) => {
        this.loader.hideLoader();
        this.snackbar.openSnackBar({ message: error.error ?? "Failed to get report ..!", snacktype: SnackType.Error, class: 'error', duration: 1000 });
      }
    ))
  }
  ngOnDestroy(): void {
    this.loader.hideLoader();
    this.subscriptionObj.unsubscribe();
  }
}
