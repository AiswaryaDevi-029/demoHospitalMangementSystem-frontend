import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private baseUrl = environment.apiUrl;  // ✅ Automatically points to backend in production

  constructor(private http: HttpClient) {}

  // ✅ Doctors
  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/doctors`);
  }
  addDoctor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/doctors`, data);
  }
  updateDoctor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/doctors/${id}`, data);
  }
  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/doctors/${id}`);
  }

  // ✅ Patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/patients`);
  }
  addPatient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/patients`, data);
  }
  updatePatient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/patients/${id}`, data);
  }
  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/patients/${id}`);
  }

  // ✅ Appointments
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/appointments`);
  }
  addAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/appointments`, data);
  }
  updateAppointment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/appointments/${id}`, data);
  }
  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/appointments/${id}`);
  }
}
