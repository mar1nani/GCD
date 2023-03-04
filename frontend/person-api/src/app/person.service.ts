import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  search(searchText: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/person';
  private addPersonUrl = 'http://localhost:8080/api/person';
  private deleteUrl = 'http://localhost:8080/api/person/';
  private updateUrl= 'http://localhost:8080/api/person';
  private searchUrl= 'http://localhost:8080/api/person/persons';

  persons: Person[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }
  findById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }
  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.addPersonUrl}`, person);
  }
  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.updateUrl}`, person);
  }  
  deletePersonById(id: number) {  
    return this.http.delete(`${this.deleteUrl}${id}`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  } 
  searchPersonsByName(name: string): Observable<any> {
    const url = `${this.searchUrl}?name=${name}`;
    return this.http.get(url);
  }
  
}