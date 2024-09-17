import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListComponent } from './common-list.component';

describe('CommonListComponent', () => {
  let component: CommonListComponent;
  let fixture: ComponentFixture<CommonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
