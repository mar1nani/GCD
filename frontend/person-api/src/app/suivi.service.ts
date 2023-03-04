import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consultation } from './consultation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {

  constructor(private http: HttpClient) { }

  getPersonById(id: number) {
    return this.http.get(`http://localhost:8080/api/person/${id}`);
  }
}
