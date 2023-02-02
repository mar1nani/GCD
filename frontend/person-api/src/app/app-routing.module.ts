import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { AddPersonComponent } from './add-person/add-person.component';


const routes: Routes = [
  { path: 'person-list', component: PersonListComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: '', redirectTo: '/person-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
