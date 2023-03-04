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
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MyTestComponent } from './my-test/my-test.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


registerLocaleData(localeFr);


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
    MyTestComponent
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
    MatDialogModule,
    MatAutocompleteModule,
    NgSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    NgbActiveModal,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
