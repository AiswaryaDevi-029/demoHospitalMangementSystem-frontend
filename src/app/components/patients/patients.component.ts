import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  newPatient = { name: '', age: '', gender: '', phoneNumber: '' };
  editingPatient: any = null;

  constructor(private hospital: HospitalService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.hospital.getPatients().subscribe(res => this.patients = res);
  }

  addPatient() {
    this.hospital.addPatient(this.newPatient).subscribe(() => {
      this.getPatients();
      this.newPatient = { name: '', age: '', gender: '', phoneNumber: '' };
    });
  }

  editPatient(patient: any) {
    this.editingPatient = { ...patient };
  }

  updatePatient() {
    this.hospital.updatePatient(this.editingPatient._id, this.editingPatient).subscribe(() => {
      this.getPatients();
      this.editingPatient = null;
    });
  }

  deletePatient(id: string) {
    this.hospital.deletePatient(id).subscribe(() => this.getPatients());
  }
}