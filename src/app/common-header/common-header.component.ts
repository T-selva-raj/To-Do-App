import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
  @Input('title') title = '';
  @Input('search') search = false;
  @Input('filter') filter = false;
}
