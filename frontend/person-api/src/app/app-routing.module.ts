import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ListConsultationComponent } from './list-consultation/list-consultation.component';
import { ConsultationPatientComponent } from './consultation-patient/consultation-patient.component';
import { SuiviComponent } from './suivi/suivi.component';
import { MyTestComponent } from './my-test/my-test.component';


const routes: Routes = [
  { path: 'person-list', component: PersonListComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: '', redirectTo: '/person-list', pathMatch: 'full' },
  { path: 'consultation', component: ConsultationComponent },
  { path: 'list-consultation', component: ListConsultationComponent },
  { path: 'consultation-patient', component: ConsultationPatientComponent },
  { path: 'suivi/:id', component: SuiviComponent },
  { path: 'my-test', component: MyTestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
