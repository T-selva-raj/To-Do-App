import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardDetailsComponent } from './dash-board-details.component';

describe('DashBoardDetailsComponent', () => {
  let component: DashBoardDetailsComponent;
  let fixture: ComponentFixture<DashBoardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
