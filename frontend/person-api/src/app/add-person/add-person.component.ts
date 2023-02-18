import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit{
  personForm: FormGroup;
  selectedGender: string = '';

  genderOptions = [
    { value: 'MALE', displayValue: 'Masculin',  selected : false, disabled :  false },
    { value: 'FEMALE', displayValue: 'Féminin',  selected :  false, disabled :  false },
  ];

  constructor(private personService: PersonService, private router: Router, private formBuilder: FormBuilder) { 
    this.personForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dob: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl('',Validators.required),
      phoneNumber: new FormControl(''),
      ville: new FormControl(''),
      healthState: new FormControl('')
    });    
  }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: [''],
      address: [''],
      gender: [null, Validators.required],
      phoneNumber: [''],
      ville: [''],
      healthState: ['']
    });

    $("#dob").datepicker({
      dateFormat : "dd/mm/yy",
      onClose: (dateText: string) => {
        this.personForm.controls['dob'].setValue(dateText);
      }
    });
    
  }
  onSubmit() {  
    if (this.personForm.valid) {
      this.createPerson();
    }
  }
  createPerson() {
    this.personForm.controls['dob'].setValue(this.personForm.controls['dob'].value);
    this.personService.createPerson(this.personForm.value)
      .subscribe({
        next: data => {
          this.router.navigate(['/person-list']);
        },
        error: error => console.log(error)
      });
  }

  

}
