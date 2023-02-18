import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConsultationService } from '../consultation.service';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  consultationForm: FormGroup;
  persons$: Observable<Person[]> = of([]);
  showSuccessToast = false;

  statusOptions = [
    { value: 1, displayValue: 'En cours' },
    { value: 0, displayValue: 'Terminé' },
  //{ value: 'Cancelled', displayValue: 'Annulé' }
  ];

  constructor(private consultationService: ConsultationService, private formBuilder: FormBuilder, private personService: PersonService, private router: Router) {
    this.consultationForm = new FormGroup({
      context: new FormControl('', Validators.required),
      date_consultation: new FormControl(''),
      status: new FormControl(''),
      consultation_count: new FormControl('', Validators.required),
      price: new FormControl(''),
      personId: new FormControl('')
    });
  }

  ngOnInit() {
    this.persons$ = this.personService.getAllPersons();

    this.consultationForm = this.formBuilder.group({
      context: ['', Validators.required],
      date_consultation: [''],
      status: [null],
      consultation_count: ['', Validators.required],
      price: [''],
      personId: [null]
    });

    $("#date_consultation").datepicker({
      dateFormat : "yy-mm-dd",
      onClose: (dateText: string) => {
        this.consultationForm.controls['date_consultation'].setValue(dateText);
      }
    });
  }
  goToConsultationList() {
    this.router.navigate(['/list-consultation']);
  }
  
  onSubmit() {
    const consultation = this.consultationForm.value;
    this.consultationService.save(consultation)
      .subscribe({
        next: data => {
          console.log(data);
          this.showSuccessToast = true;
          this.consultationForm.reset();
        },
        error: error => {
          console.error(error);
        }
      });
  }
}
