import { ChangeDetectorRef, Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  map, Observable, of, startWith, switchMap } from 'rxjs';
import { ConsultationService } from '../consultation.service';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  @ViewChild('contextInput') contextInput!: ElementRef;
  @ViewChild('patientInput') patientInput!: ElementRef;
  
  consultationForm: FormGroup;
  persons$: Observable<Person[]> = of([]);
  showSuccessToast = false;
  showErrorToast = false; // add this line to declare the property
  filteredPersons$: Observable<Person[]> = of([]);
  myControl = new FormControl<string | Person>('');
  patientSelected = false;
  isFormValid = false;
  errorMessage = '';

  statusOptions = [
    { value: 1, displayValue: 'En cours' },
    { value: 0, displayValue: 'Terminé' },
  //{ value: 'Cancelled', displayValue: 'Annulé' }
  ];

  ngAfterViewInit() {
    this.contextInput.nativeElement.addEventListener('input', this.onInputChanged.bind(this));
    this.patientInput.nativeElement.addEventListener('input', this.onPatientInput.bind(this));
  }

  constructor(private consultationService: ConsultationService, private formBuilder: FormBuilder, private personService: PersonService, private router: Router, private elementRef: ElementRef, private cd: ChangeDetectorRef) {
    this.consultationForm = new FormGroup({
      context: new FormControl('', Validators.required),
      date_consultation: new FormControl(''),
      status: new FormControl(''),
      consultation_count: new FormControl(''),
      price: new FormControl(''),
      personId: new FormControl('null', Validators.required),
      myControl: this.myControl
    });
    this.filteredPersons$ = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterPersons(name as string) : this.persons$;
      })
    );
  }
  
  selectPerson(person: Person) {
    this.consultationForm.patchValue({ personId: person.id });
    const inputElement = this.elementRef.nativeElement.querySelector('input');
    this.isFormValid = true;
  }
  
  private _filterPersons(value: string): Observable<Person[]> {
    const filterValue = value.toLowerCase();
  
    // Filter the persons based on the input value
    return this.persons$.pipe(
      map(persons => persons.filter(person => person.name.toLowerCase().includes(filterValue)))
    );
  }
  
  displayFn(person: Person): string {
    return person && person.name ? person.name : '';
  }

  ngOnInit() {
    this.filteredPersons$ = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterPersons(name as string) : this.persons$;
      }),
    );
    
    // if (this.consultationForm?.get('myControl') && this.consultationForm?.get('context')) {
    //   this.consultationForm.get('myControl')?.valueChanges.subscribe(() => {
    //     this.onInputChanged();
    //   });
      
    //   this.consultationForm.get('context')?.valueChanges.subscribe(() => {
    //     this.onInputChanged();
    //   });
    // }
    
    this.getAllpatients(); 

    this.consultationForm = this.formBuilder.group({
      context: [''],
      date_consultation: [''],
      status: [null],
      consultation_count: [''],
      price: [''],
      personId: [null],
      myControl: [null],
    });

  }

  goToConsultationList() {
    this.router.navigate(['/list-consultation']);
  }

  getAllpatients(){
    this.persons$ = this.personService.getAllPersons();
  }
  
  onSubmit() {
    this.showSuccessToast = false;
    this.showErrorToast = false;
    const consultation = this.consultationForm.value;
    
    this.consultationService.save(consultation)
      .subscribe({
        next: data => {
          console.log(data);
          this.showSuccessToast = true;
          this.consultationForm.reset();
          this.myControl.reset();
          this.isFormValid = false;
        },
        error: err => {
          console.error(err);
          if (err.error && err.error[0] && err.error[0].defaultMessage) {
            this.errorMessage = err.error[0].defaultMessage;
          } else {
            this.errorMessage = 'An unknown error occurred';
          }
          this.showErrorToast = true; // show the error toast
        }               
      });
  }
  
  
    
  onInputChanged() {
    this.isFormValid = !!this.consultationForm.controls['context'].value && this.patientSelected;
  }
  
  onPatientInput() {
    this.patientSelected = !!this.myControl.value;
    this.isFormValid = !!this.consultationForm.controls['context'].value && this.patientSelected;
  }
  
  
  
  
}