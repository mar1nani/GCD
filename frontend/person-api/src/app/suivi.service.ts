import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {

  constructor(private http: HttpClient) { }

  getPersonById(id: number) {
    return this.http.get(`http://localhost:8080/api/person/${id}`);
  }
}
