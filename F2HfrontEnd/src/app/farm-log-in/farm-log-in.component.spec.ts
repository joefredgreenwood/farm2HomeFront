import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmLogInComponent } from './farm-log-in.component';

describe('FarmLogInComponent', () => {
  let component: FarmLogInComponent;
  let fixture: ComponentFixture<FarmLogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmLogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
