import { Component } from '@angular/core';
import { SuiviService } from '../suivi.service';
import { PaiementService } from '../paiement.service';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog2Component } from '../confirm-dialog2/confirm-dialog2.component';
import { Consultation } from '../consultation';
import { ConsultationService } from '../consultation.service';

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

  setActiveConsultation(consultation: any) {
    this.activeConsultation = consultation;
    console.log(this.activeConsultation.id);
  }

  getTotalAmount(payments: any[]): number {
    return payments.reduce((acc, curr) => acc + curr.paid, 0);
  }
  
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private suiviService: SuiviService, public activeModal: NgbActiveModal, private paiementService: PaiementService) { }

  showTab(tabId: number, $event: MouseEvent) {
    $event.preventDefault();
    this.activeTab = tabId;
  }

  ngOnInit() {
   this.refreshPayments();
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

  deletePaiementById(id: number){
    console.log(id);
    this.paiementService.deletePaiementById(id).subscribe(() => {
      console.log(`Consultation with id ${id} has been deleted successfully.`);
      this.refreshPayments();
    });
  }

  openConfirmationDialog(paymentId: number) {
    const dialogRef = this.dialog.open(ConfirmDialog2Component, {
      height: '800px',
      width: '600px',
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce paiement ?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePaiementById(paymentId);
      }
    });
  }

 
}
