import { Component } from '@angular/core';
import { Constants } from '../config';


@Component({
  selector: 'app-dash-board-details',
  templateUrl: './dash-board-details.component.html',
  styleUrls: ['./dash-board-details.component.css']
})
export class DashBoardDetailsComponent {
  DashBoard = "Dashboard";
  details = [
    { title: "Completed Tasks", count: 100, img: "../../assets/tick.png" },
    { title: "Today Tasks", count: 4, img: "../../assets/today.png" },
    { title: "Special Tasks", count: 35, img: "https://cdn-icons-png.flaticon.com/512/4899/4899512.png" }
  ];
  Link1 = Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'life timer.png');
  Count_today = 0;
  constructor() { }


  tasks = [
    { name: "eat", description: "sample" },
    { name: "code", description: "sample" },
    { name: "sleep", description: "sample" }
  ]
}
