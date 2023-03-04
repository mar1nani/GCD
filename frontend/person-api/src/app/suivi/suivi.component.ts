import { Component } from '@angular/core';
import { SuiviService } from '../suivi.service';
import { PaiementService } from '../paiement.service';
import { ConsultationService } from '../consultation.service';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog2Component } from '../confirm-dialog2/confirm-dialog2.component';
import 'bootstrap4-toggle';

import localeFr from '@angular/common/locales/fr';
import { Consultation } from '../consultation';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css'],
  providers: [MatDialog],
})
export class SuiviComponent {
  person: any;
  activeTab = 0;
  sum: number = 0;
  activeConsultation: any;
  consultations: Consultation[] = [];
  amountDue: number = 0;

  setActiveConsultation(consultation: any) {
    this.activeConsultation = consultation;
    console.log(this.activeConsultation.id);
  }
  
  calculateAmountDue(consultation: any) {
    this.amountDue = consultation.price - this.getTotalAmount(consultation.paiements);
    return this.amountDue;
  }
  getTotalAmount(payments: any[]): number {
    return payments.reduce((acc, curr) => acc + curr.paid, 0);
  }  
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private suiviService: SuiviService, public activeModal: NgbActiveModal, private paiementService: PaiementService, private consultationService: ConsultationService) { }

  showTab(tabId: number, $event: MouseEvent) {
    $event.preventDefault();
    this.activeTab = tabId;
  }

  ngOnInit() {
   this.refreshPayments();
   console.log(new Date());

  }

  refreshPayments() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.suiviService.getPersonById(id).subscribe((person: any) => {
        this.person = person;
        // Update sum with the total amount of all payments
        this.sum = this.person.consultations.reduce((acc: number, curr: any) => acc + this.getTotalAmount(curr.paiements || []), 0);
      });
    });
  }

  terminerStatus(consultation: Consultation){
    console.log(consultation.id);
    if (consultation.status) {
      // Checkbox is checked, set status to true
      consultation.status = true;
    } else {
      // Checkbox is unchecked, set status to false
      consultation.status = false;
    }
    this.consultationService.update(consultation).subscribe(
    updatedConsultation => {
      // update the local list of persons with the updated person
      const index = this.consultations.findIndex(p => p.id === updatedConsultation.id);
      this.consultations[index] = updatedConsultation;
    },
    error => {
      // handle the error
    }
  );
  }

  deletePaiementById(id: number){
    console.log(id);
    this.paiementService.deletePaiementById(id).subscribe(() => {
      this.refreshPayments();
    });
  }

  openConfirmationDialog(id: number, dialog: string) {
    const dialogRef = this.dialog.open(ConfirmDialog2Component, {
      height: '800px',
      width: '600px',
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de confirmer cette suppression ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true && dialog == "paiement") {
        console.log("delete p");
        this.deletePaiementById(id);
      }
      else if (result === true && dialog == "consultation"){
        console.log("delete c");
        this.deleteConsultationbyId(id);
      }
    });
  }

  deleteConsultationbyId(id: number){
    this.consultationService.deletebyId(id).subscribe(() => {
      this.ngOnInit();
    });
  }
 
}
