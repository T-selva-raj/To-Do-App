import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-board-details',
  templateUrl: './dash-board-details.component.html',
  styleUrls: ['./dash-board-details.component.css']
})
export class DashBoardDetailsComponent {
  DashBoard = "Dashboard";
  details = [
    { title: "Completed Tasks", count: 100, img: "../../assets/tick.png" },
    { title: "Today Tasks", count: 100, img: "../../assets/today.png" },
    { title: "Special Tasks", count: 100, img: "https://cdn-icons-png.flaticon.com/512/4899/4899512.png" }
  ]
}
