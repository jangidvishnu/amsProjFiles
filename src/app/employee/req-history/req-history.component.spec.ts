import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqHistoryComponent } from './req-history.component';

describe('ReqHistoryComponent', () => {
  let component: ReqHistoryComponent;
  let fixture: ComponentFixture<ReqHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
