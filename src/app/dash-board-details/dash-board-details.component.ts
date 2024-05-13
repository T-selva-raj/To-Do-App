import { Component } from '@angular/core';
import { Constants } from '../config';


@Component({
  selector: 'app-dash-board-details',
  templateUrl: './dash-board-details.component.html',
  styleUrls: ['./dash-board-details.component.css']
})
export class DashBoardDetailsComponent {
  DashBoard = "Dashboard";
  constructor() { }
  tasks1 = [
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'life timer.png'), count: 1, name: "Over all " },
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'week timer.png'), count: 11, name: "This Week" }
  ]
  tasks2 = [
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'today.png'), count: 1, name: "Today Tasks" },
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'tick.png'), count: 11, name: "Today Completed" }
  ]
}
