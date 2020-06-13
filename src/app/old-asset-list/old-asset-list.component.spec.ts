import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAssetListComponent } from './old-asset-list.component';

describe('OldAssetListComponent', () => {
  let component: OldAssetListComponent;
  let fixture: ComponentFixture<OldAssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldAssetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
