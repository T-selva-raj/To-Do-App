import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../config';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { SnackType } from '../shared/models/models';


@Component({
  selector: 'app-dash-board-details',
  templateUrl: './dash-board-details.component.html',
  styleUrls: ['./dash-board-details.component.css']
})
export class DashBoardDetailsComponent implements OnInit, OnDestroy {
  DashBoard = "Dashboard";
  subscriptionObj = new Subscription();
  dashBoardData: {
    highCount: number,
    thisWeek: number[],
    thisWeekCount: number,
    todayCompleted: number,
    todayCount: number,
    total: number
  } = {
      highCount: 0,
      thisWeek: [1, 0, 0, 0, 0, 0, 0],
      thisWeekCount: 0,
      todayCompleted: 0,
      todayCount: 0,
      total: 0
    };
  isGraphDataInitalized!: boolean;

  firstCards = [
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'life timer.png'), count: 0, name: "Over all " },
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'week timer.png'), count: 0, name: "This Week" }
  ]
  secondCards = [
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'today.png'), count: 0, name: "High" },
    { img: Constants.IMAGE_COMMON_LINK.replace('{imgName}', 'tick.png'), count: 0, name: "Today Completed" }
  ]
  constructor(
    private taskService: TaskService,
    private loader: LoaderService,
    private snackbar: SnackbarService
  ) { }


  ngOnInit(): void {
    this.loader.showLoader();
    this.subscriptionObj.add(this.taskService.getDashBoardDetails().subscribe({
      next: (res) => {
        this.loader.hideLoader();
        if (res && res.result) {
          this.dashBoardData = res.result;
          this.firstCards[0].count = this.dashBoardData.total;
          this.firstCards[1].count = this.dashBoardData.thisWeekCount;
          this.secondCards[0].count = this.dashBoardData.highCount;
          this.secondCards[1].count = this.dashBoardData.todayCompleted;
          this.isGraphDataInitalized = true;
        }
      },
      error: (error: any) => {
        this.loader.hideLoader();
        this.snackbar.openSnackBar({ message: error?.error || error?.message, snacktype: SnackType.Error, class: 'error' });
      }
    })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}
