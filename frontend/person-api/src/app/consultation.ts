import { Paiement } from "./paiement";
import { Person } from "./person";

export class Consultation {
    id: number;
    date_consultation: string;
    context: string;
    consultation_count: number;
    price: number;
    status: boolean;
    personId: number;
    paiements: Paiement[];

    
    person: Person = new Person();
    showDetails: boolean = false;

    constructor(id = 0, date_consultation = '', context = '', consultation_count = 0, price = 0, status = false, personId = 0, showDetails = false, paiements: Paiement[]) {
      this.id = id;
      this.date_consultation = date_consultation;
      this.context = context;
      this.consultation_count = consultation_count;
      this.price = price;
      this.status = status;
      this.personId = personId;
      this.showDetails = showDetails;
      this.person = new Person();
      this.paiements = paiements;
    }
  }
  
  