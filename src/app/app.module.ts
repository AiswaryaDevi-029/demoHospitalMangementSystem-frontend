import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PatientsComponent,
    AppointmentsComponent,
    HomeComponent
  ],
  imports: [FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
