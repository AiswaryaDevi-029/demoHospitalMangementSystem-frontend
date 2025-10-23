import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  newDoctor = { name: '', specialization: '', availability: '' };
  editingDoctor: any = null;

  constructor(private hospital: HospitalService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.hospital.getDoctors().subscribe(res => this.doctors = res);
  }

  addDoctor() {
    if (this.newDoctor.name && this.newDoctor.specialization && this.newDoctor.availability) {
      this.hospital.addDoctor(this.newDoctor).subscribe(() => {
        this.getDoctors();
        this.newDoctor = { name: '', specialization: '', availability: '' };
      });
    }
  }

  editDoctor(doctor: any) {
    this.editingDoctor = { ...doctor };
  }

  updateDoctor() {
    this.hospital.updateDoctor(this.editingDoctor._id, this.editingDoctor).subscribe(() => {
      this.getDoctors();
      this.editingDoctor = null;
    });
  }

  deleteDoctor(id: string) {
    this.hospital.deleteDoctor(id).subscribe(() => this.getDoctors());
  }
}
