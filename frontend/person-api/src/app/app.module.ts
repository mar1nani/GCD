import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './person-list/filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonListComponent } from './person-list/person-list.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule, NgbModalModule, NgbNavModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultationComponent } from './consultation/consultation.component';
import { ListConsultationComponent } from './list-consultation/list-consultation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultationPatientComponent } from './consultation-patient/consultation-patient.component';
import { SuiviComponent } from './suivi/suivi.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { ConfirmDialog2Component } from './confirm-dialog2/confirm-dialog2.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    AddPersonComponent,
    FilterPipe,
    NavbarComponent,
    FooterComponent,
    ConsultationComponent,
    ListConsultationComponent,
    ConsultationPatientComponent,
    SuiviComponent,
    PaymentModalComponent,
    ConfirmDialog2Component,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgbModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgbNavModule,
    NgbModalModule,
    MatDialogModule
  ],
  providers: [
    NgbActiveModal
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
