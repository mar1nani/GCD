import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationPatientComponent } from './consultation-patient.component';

describe('ConsultationPatientComponent', () => {
  let component: ConsultationPatientComponent;
  let fixture: ComponentFixture<ConsultationPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
