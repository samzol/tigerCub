import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSendComponent } from './create-send.component';

describe('CreateSendComponent', () => {
  let component: CreateSendComponent;
  let fixture: ComponentFixture<CreateSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
