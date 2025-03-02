import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  Report = 'Report';
  chartData: any[] = [1, 2, 3, 4, 4, 6, 5];
  dateRange!: FormGroup;
  selectedRange: string = '';
  maxDate: Date = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dateRange = this.fb.group({
      start: [null],
      end: [null]
    });

    this.dateRange.valueChanges.subscribe((values) => {
      this.onDateRangeChange(values);
    });
  }

  onDateRangeChange(values: { start: Date; end: Date }) {
    const { start, end } = values;
    if (start && end) {
      this.selectedRange = `${moment(start).format('YYYY-MM-DD')} to ${moment(end).format('YYYY-MM-DD')}`;
    }
  }


}
