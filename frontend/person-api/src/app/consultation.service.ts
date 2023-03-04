// service file
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consultation } from './consultation';
import { Observable } from 'rxjs';
import { Person } from './person';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private url = 'http://localhost:8080/api/consultation';
  constructor(private http: HttpClient) { }

  save(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(this.url, consultation);
  }
  
  update(consultation:Consultation): Observable<Consultation>{
    return this.http.put<Consultation>(this.url, consultation);
  }

  findById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.url}/${id}`);
  }

  findAll(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.url);
  }

  findPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(`API_URL/person/${id}`);
  }

  deletebyId(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
