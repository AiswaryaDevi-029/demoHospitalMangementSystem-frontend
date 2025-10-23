import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'appointments', component: AppointmentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
