import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

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