import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningListComponent } from './mining-list.component';

describe('MiningListComponent', () => {
  let component: MiningListComponent;
  let fixture: ComponentFixture<MiningListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
