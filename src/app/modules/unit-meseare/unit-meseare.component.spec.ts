import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMeseareComponent } from './unit-meseare.component';

describe('UnitMeseareComponent', () => {
  let component: UnitMeseareComponent;
  let fixture: ComponentFixture<UnitMeseareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitMeseareComponent]
    });
    fixture = TestBed.createComponent(UnitMeseareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
