import { Component, OnInit } from '@angular/core';
import { PersonService } from '.././person.service';
import { Person } from '.././person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit{
  persons: Person[] = [];
  //persons$: Observable<Person[]>;
  searchTerm: string;
 


  constructor(private personService: PersonService) {
    //this.persons$ = this.personService.getAllPersons(this.p, 5);
    this.searchTerm = '';
   }

  ngOnInit() {
    this.loadData();
  }
  search() {
    // filter persons list based on searchTerm
  }
  updatePerson(person: Person) {
    this.personService.updatePerson(person)
      .subscribe(
        updatedPerson => {
          // update the local list of persons with the updated person
          const index = this.persons.findIndex(p => p.id === updatedPerson.id);
          this.persons[index] = updatedPerson;
        },
        error => {
          // handle the error
        }
      );
  }
  deleteChecked() {
    const checkedPersons = this.persons.filter(person => person.isChecked);
    checkedPersons.forEach(person => {
      this.personService.deletePersonById(person.id).subscribe(
        response => {
          console.log(response);
          this.loadData();
        },
        error => {
          console.error(error);
          this.loadData();
        }
      );
    });
  }

  loadData() {
    this.personService.getAllPersons()
      .subscribe(
        persons => this.persons = persons,
        error => console.error(error)
      );
  }

}