import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DialogService } from '../shared/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MESSAGES } from '../shared/constants/messages';
import { Subscription } from 'rxjs';

interface ColumnRef {
  heading: string;
  column?: string;
  type?: string;
}

interface ColumnData {
  count: number;
  rows: Array<Record<string, any>>;
}

interface TableData {
  value: string;
  isHeader: boolean;
  isAction?: boolean; // Indicating if this is an action column
}

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css']
})
export class CommonListComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() search = false;
  @Input() filter = false;
  @Output() viewClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() filterClicked = new EventEmitter<any>();
  @Input() displayedColumns: string[] = ['Task Name', 'Dead Line', 'Priority', 'Status', 'Actions'];
  @Input() ELEMENT_DATA!: any;
  @Output() offset = new EventEmitter<number>();
  @Output() searchValue = new EventEmitter<string>();
  dialogRef!: MatDialogRef<DialogComponent>;
  subscriptionObj = new Subscription();
  dataSource!: any[];
  tableCount: number = 100;
  nodata = false
  searchData = '';
  constructor(
    private dialogService: DialogService

  ) { }

  ngOnInit() {

  }
  ngOnChanges(): void {
    this.dataSource = this.ELEMENT_DATA?.rows;
    this.tableCount = this.ELEMENT_DATA?.count;
    if (!this.dataSource?.length) this.nodata = true;
    else this.nodata = false;
  }
  ngAfterViewInit(): void {
    this.dataSource = this.ELEMENT_DATA?.rows;
    this.tableCount = this.ELEMENT_DATA?.count;
    if (!this.dataSource?.length) this.nodata = true;
  }



  onPageChanged(event: any) {
    const offset = event?.pageIndex * event?.pageSize;
    this.offset.emit(offset);
  }

  onEdit(row: any) {
    this.editClicked.emit(row);
  }
  onView(row: any) {
    this.viewClicked.emit(row);
  }

  onDelete(row: any) {
    this.dialogRef = this.dialogService.openDialog({
      title: "Alert",
      message: MESSAGES.DELETE_CONFIRMATION
    });
    this.subscriptionObj.add(this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteClicked.emit(row);
      }
    }));
  }

  onMenuClick(status: string) {
    this.filterClicked.emit({ status: status });
  }
  onSearch(value: string) {
    this.searchValue.emit(value);
  }
}
