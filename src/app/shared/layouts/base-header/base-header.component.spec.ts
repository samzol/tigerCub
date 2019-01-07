import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseHeaderComponent } from './base-header.component';

describe('HeaderComponent', () => {
  let component: BaseHeaderComponent;
  let fixture: ComponentFixture<BaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
