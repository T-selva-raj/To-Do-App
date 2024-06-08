import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DialogService } from '../shared/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = "sample"
  dialogRef!: MatDialogRef<DialogComponent>;
  isLoader: boolean = false;
  subscriptionObj = new Subscription();
  constructor(private observer: BreakpointObserver,
    private route: Router,
    private dialogService: DialogService) { }


  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

  logout() {
    this.dialogRef = this.dialogService.openDialog({
      title: "Alert",
      message: "Do you want to  log out ?"
    });
    this.subscriptionObj.add(this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.isLoader = true;
        localStorage.clear();
        this.route.navigate(['login'])
      }
    }));
  }
  ngOnDestroy() {
    this.subscriptionObj.unsubscribe();
  }
}
