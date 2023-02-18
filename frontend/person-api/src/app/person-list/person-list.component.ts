import { Component, OnInit } from '@angular/core';
import { PersonService } from '.././person.service';
import { Person } from '.././person';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit{
  persons: Person[] = [];
  searchTerm: string = '';

  constructor(private personService: PersonService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    //this.loadData();
  }

  openSuivi(id: number) {
    this.router.navigate(['/suivi', id]);
  }

  search(): void {
    this.personService.searchPersonsByName(this.searchTerm).subscribe(
      data => {
        this.persons = data;
      },
      error => {
        console.error(error);
      }
    );
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

  hasChecked(): boolean {
    return this.persons.some((person: any) => person.isChecked);
  }
  deleteChecked() {
    this.persons.filter(person => person.isChecked).forEach(person => {
      this.personService.deletePersonById(person.id).subscribe(
        () => {
          this.persons = this.persons.filter(p => p.id !== person.id);
        },
        error => console.error(error)
      );
    });
  }
  
  loadData() {
    this.personService.getAllPersons().subscribe({
      next: persons => this.persons = persons,
      error: error => console.error(error)
    });
  }


}