import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctors`);
  }
  addDoctor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/doctors`, data);
  }
  updateDoctor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/doctors/${id}`, data);
  }
  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/doctors/${id}`);
  }
  
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }
  addPatient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients`, data);
  }
  updatePatient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${id}`, data);
  }
  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/patients/${id}`);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }
  addAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, data);
  }
  updateAppointment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/${id}`, data);
  }
  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`);
  }
}