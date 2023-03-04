import { Component, OnInit, EventEmitter, Output, ViewChild, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaiementService } from '../paiement.service';
import { NgbActiveModal, NgbModalRef , NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Paiement } from '../paiement';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent{
  @Output() paymentAdded = new EventEmitter();
  @Input() amountDue!: number; 
  @Input()
  consultationId!: number;


  paymentForm!: NgForm;
  paymentAmount: number;
  paymentDate: Date;
  initialPaymentAmount: number;
  initialPaymentDate: Date;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private paiementService: PaiementService) {
    this.paymentAmount = 0;
    this.paymentDate = new Date();
    this.initialPaymentAmount = this.paymentAmount;
    this.initialPaymentDate = this.paymentDate;
  }

  resetForm() {
    this.paymentAmount = this.initialPaymentAmount;
    this.paymentDate = this.initialPaymentDate;
    this.paymentForm.reset();
  }

  ngOnInit(): void {
   //console.log('consultationId:', this.consultationId);
  }
  closeModal() {
    $('#addPaymentModal').modal('hide');
  }
 
  onSubmit(): void {
    if (this.paymentAmount > this.amountDue) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Le montant du paiement ne peut pas être supérieur à ${this.amountDue}`,
      });
      console.log(this.amountDue);
      console.log(this.paymentAmount);
      return;
    }
    if (this.paymentAmount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Le montant du paiement ne peut pas être négatif ou égale à 0`,
      });
      return;
    }
    const payment = new Paiement(new Date(this.paymentDate), this.paymentAmount, this.consultationId);

    this.paiementService.addPayment(payment).subscribe(
      (result) => {
       //console.log('Payment added:', result);
        this.closeModal();
        // Emit the event to the parent component
        this.paymentAdded.emit();
        //this.paymentForm.reset();
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
