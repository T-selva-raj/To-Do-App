import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
  @Input('title') title = '';
  @Input('button') button = false;
  @Input('buttonInfo') buttonInfo: any;
  @Output() buttonClick = new EventEmitter<any>();

  constructor() { }

  buttonClicked() {
    if (this.buttonInfo?.route)
      this.buttonClick.emit(this.buttonInfo?.route)
  }
}
