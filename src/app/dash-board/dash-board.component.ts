import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DialogService } from '../shared/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { MESSAGES } from '../shared/constants/messages';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = '';
  profileImage = "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";
  dialogRef!: MatDialogRef<DialogComponent>;
  subscriptionObj: Subscription = new Subscription();
  isSmallScreen: boolean = false;
  currentTheme: string = localStorage.getItem('theme') ?? 'light';
  copyright = 'copyright @ 2024';

  constructor(
    private observer: BreakpointObserver,
    private route: Router,
    private dialogService: DialogService,
    private renderer: Renderer2,
    private profileService: ProfileService
  ) { }
  ngOnInit(): void {

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
    this.setTheme();
    this.subscriptionObj.add(this.profileService.getProfileData().subscribe(
      (res: any) => {
        if (res?.result) {
          this.profileImage = res.result.profileImage ?? this.profileImage;
          this.profileService.setProfileImage({ profileImage: this.profileImage?.toString() ?? '', userName: res.result.userName });
        }
      }));
    this.subscriptionObj.add(this.profileService.userProfileValue.subscribe(val => {
      if (val) {
        this.profileImage = val.profileImage;
        this.title = 'Welcome ' + val.userName;
      }
    }));
  }

  ngAfterViewInit() {
    this.subscriptionObj.add(this.observer.observe(["(max-width: 800px)"]).subscribe((res: BreakpointState) => {
      this.isSmallScreen = res.matches;
      if (this.isSmallScreen) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    }));
  }

  logout() {
    this.dialogRef = this.dialogService.openDialog({
      title: "Alert",
      message: MESSAGES.LOGOUT_CONFIRMATION
    });
    this.subscriptionObj.add(this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.renderer.removeClass(document.body, this.currentTheme);
        this.currentTheme = 'light';
        localStorage.clear();
        this.setTheme();
        this.route.navigate(['login']);
      }
    }));
  }

  closeNav() {
    if (this.isSmallScreen) {
      this.sidenav.close();
    }
  }
  toggleTheme(): void {
    this.renderer.removeClass(document.body, this.currentTheme);
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.setTheme();
  }
  setTheme(): void {
    localStorage.setItem('theme', this.currentTheme);
    this.renderer.addClass(document.body, this.currentTheme);
  }

  ngOnDestroy() {
    this.subscriptionObj.unsubscribe();
  }
}
