import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../consultation.service';
import { Consultation } from '../consultation';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-consultation-patient',
  templateUrl: './consultation-patient.component.html',
  styleUrls: ['./consultation-patient.component.css']
})
export class ConsultationPatientComponent implements OnInit {
  sum = 0;
  consultation: Consultation = {
    id: 0,
    date_consultation: '',
    context: '',
    consultation_count: 0,
    price: 0,
    status: false,
    personId: 0,
    paiements: [],
    person: new Person(),
    showDetails: false
  };
  
  constructor(private consultationService: ConsultationService, private personService: PersonService) { }

  ngOnInit() {
    this.consultationService.findById(1).subscribe(data => {
      this.consultation = data;
      this.getPersonDetails();
      this.sum = this.consultation.paiements.reduce((total, payment) => total + payment.paid, 0);
    });
  }

  getPersonDetails() {
    this.personService.findById(this.consultation.personId).subscribe(personData => {
      this.consultation.person = personData;
    });
  }

}
