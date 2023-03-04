import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Paiement } from './paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8080/api/paiement';

  constructor(private http: HttpClient) { }

  addPayment(payment: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, payment);
  }
  deletePaiementById(id: number) {  
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  } 

  
}
