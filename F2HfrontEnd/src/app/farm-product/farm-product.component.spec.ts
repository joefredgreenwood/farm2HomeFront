import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmProductComponent } from './farm-product.component';

describe('FarmProductComponent', () => {
  let component: FarmProductComponent;
  let fixture: ComponentFixture<FarmProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
