import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit{
  personForm: FormGroup;

  constructor(private personService: PersonService, private router: Router, private formBuilder: FormBuilder) { 
    this.personForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl(''),
      address: new FormControl(''),
    });
  }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: [''],
      address: ['']
    });
  }
  onSubmit() {
    if (this.personForm.valid) {
      this.createPerson();
    }
  }
  createPerson() {
    this.personService.createPerson(this.personForm.value)
      .subscribe(data => {
        console.log(this.personForm.value);
        this.router.navigate(['/person-list']);
      }, error => console.log(error));
  }
  

}
