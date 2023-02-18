import { Component, OnInit, EventEmitter, Output, ViewChild, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaiementService } from '../paiement.service';
import { NgbActiveModal, NgbModalRef , NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Paiement } from '../paiement';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent{
  @Output() paymentAdded = new EventEmitter();
  @Input()
  consultationId!: number;


  paymentForm!: NgForm;
  paymentAmount: number;
  paymentDate: Date;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private paiementService: PaiementService) {
    this.paymentAmount = 0;
    this.paymentDate = new Date();
  }

  ngOnInit(): void {
    console.log('consultationId:', this.consultationId);
  }
  closeModal() {
    $('#addPaymentModal').modal('hide');
  }
 
  onSubmit(): void {
    const payment = new Paiement(new Date(this.paymentDate), this.paymentAmount, this.consultationId);

    this.paiementService.addPayment(payment).subscribe(
      (result) => {
        console.log('Payment added:', result);
        this.closeModal();
        // Emit the event to the parent component
        this.paymentAdded.emit();
        this.paymentForm.reset();
      },
      (error) => {
        console.error('Error adding payment:', error);
        // Handle the error as appropriate for your application
      }
    );
  }

  public currentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
}
