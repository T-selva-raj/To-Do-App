import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
export class CommonListComponent implements OnInit {

  @Input() columnRef: ColumnRef[] = [];
  @Input() columnData!: ColumnData;
  @Input() search = false;
  @Input() filter = false;
  @Input() actions!: any;
  @Output() viewClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  tableData: TableData[][] = [];
  tableCount!: number;

  constructor() {

  }

  ngOnInit() {
    this.pushHeader();
    this.pushData();
  }

  pushHeader() {
    const headerArray: TableData[] = this.columnRef.map(item => ({
      value: item.heading,
      isHeader: true
    }));
    this.tableData.push(headerArray);
  }

  pushData() {
    this.tableCount = this.columnData?.count ?? 0;
    const dataRows: TableData[][] = this.columnData.rows.map(row =>
      this.columnRef.map(ref => {
        if (ref.type === 'action') {
          return { value: '', isHeader: false, isAction: true }; // For action columns
        } else {
          return { value: row[ref.column || ''] || '', isHeader: false };
        }
      })
    );
    this.tableData.push(...dataRows);
  }

  onPageChanged(event: any) {
    console.log(event);
    // Handle pagination here
  }

  onEdit(row: any) {
    console.log('Edit clicked', row);
    this.viewClicked.emit(row);
  }

  onDelete(row: any) {
    console.log('Delete clicked', row);
    this.deleteClicked.emit(row);
  }
}
