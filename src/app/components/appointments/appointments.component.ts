import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  doctors: any[] = [];
  patients: any[] = [];

  newAppointment = {
    doctorId: '',
    patientId: '',
    date: '',
    time: '' 
  };

  editingAppointment: string | null = null;

  minDate: string = '';
  currentTime: string = '';        
  timeSlots: string[] = [];        
  availableSlots: string[] = [];   

  constructor(private hospital: HospitalService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setMinDate();
    this.setCurrentTime();
    this.generateTimeSlots(); 
    this.loadData();
  }

  
  setMinDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    this.minDate = localDate.toISOString().split('T')[0];
  }

  setCurrentTime() {
    const now = new Date();
    now.setSeconds(0, 0);
    this.currentTime = now.toTimeString().substring(0, 5); 
  }

  convertTo12HourFormat(time24: string): string {
    let [h, m] = time24.split(':');
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${m} ${ampm}`;
  }

  convertTo24HourFormat(time12: string): string {
    const [t, ampm] = time12.split(' ');
    let [h, m] = t.split(':');
    let hour = parseInt(h, 10);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${m}`;
  }

 
  generateTimeSlots() {
    const start = 9 * 60;   
    const end = 17 * 60;    
    const step = 30;
    this.timeSlots = [];
    for (let mins = start; mins <= end; mins += step) {
      const h = Math.floor(mins / 60).toString().padStart(2, '0');
      const m = (mins % 60).toString().padStart(2, '0');
      this.timeSlots.push(this.convertTo12HourFormat(`${h}:${m}`));
    }
  }

  loadData() {
    this.hospital.getAppointments().subscribe((res) => {
      this.appointments = res.map((a: any) => {
        a.dateTime = new Date(a.date);
        a.timeFormatted = this.convertTo12HourFormat(a.time);
        return a;
      });
    });

    this.hospital.getDoctors().subscribe((res) => {
      this.doctors = res.filter((d: any) => d.availability === 'Yes');
    });

    this.hospital.getPatients().subscribe((res) => (this.patients = res));
  }

  updateAvailableSlots() {
    if (!this.newAppointment.doctorId || !this.newAppointment.date) {
      this.availableSlots = [];
      return;
    }

    const selectedDate = new Date(this.newAppointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    
    const bookedTimes = this.appointments
      .filter(a =>
        a.doctorId?._id === this.newAppointment.doctorId &&
        new Date(a.date).toDateString() === selectedDate.toDateString()
      )
      .map(a => this.convertTo12HourFormat(a.time));


    this.availableSlots = this.timeSlots.filter(slot => {
      if (bookedTimes.includes(slot)) return false;
      if (selectedDate.toDateString() === today.toDateString()) {
      
        return this.convertTo24HourFormat(slot) >= this.currentTime;
      }
      return true;
    });


    if (this.newAppointment.time && !this.availableSlots.includes(this.newAppointment.time)) {
      this.newAppointment.time = '';
    }
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000, panelClass: ['snackbar-success'] });
  }


  validateAppointment(): boolean {
    if (!this.newAppointment.doctorId || !this.newAppointment.patientId || !this.newAppointment.date || !this.newAppointment.time) {
      this.showMessage('Please complete all fields.');
      return false;
    }
    if (!this.availableSlots.includes(this.newAppointment.time)) {
      this.showMessage('Selected time is not available.');
      return false;
    }
 
    const dt = new Date(`${this.newAppointment.date}T${this.convertTo24HourFormat(this.newAppointment.time)}`);
    if (dt < new Date()) {
      this.showMessage('Cannot select a past date/time.');
      return false;
    }
    return true;
  }


  addAppointment() {
    if (!this.validateAppointment()) return;

    const full = new Date(`${this.newAppointment.date}T${this.convertTo24HourFormat(this.newAppointment.time)}`);
    const body = {
      doctorId: this.newAppointment.doctorId,
      patientId: this.newAppointment.patientId,
      date: full.toISOString(),
      time: this.convertTo24HourFormat(this.newAppointment.time)
    };

    this.hospital.addAppointment(body).subscribe(() => {
      this.showMessage('✅ Appointment added successfully!');
      this.cancelEdit();
      this.loadData();
    });
  }

  editAppointment(a: any) {
    this.editingAppointment = a._id;
    this.newAppointment = {
      doctorId: a.doctorId?._id,
      patientId: a.patientId?._id,
      date: new Date(a.date).toISOString().split('T')[0],
      time: this.convertTo12HourFormat(a.time)
    };
    this.updateAvailableSlots();
  }

  updateAppointment() {
    if (!this.validateAppointment()) return;

    const full = new Date(`${this.newAppointment.date}T${this.convertTo24HourFormat(this.newAppointment.time)}`);
    const body = {
      doctorId: this.newAppointment.doctorId,
      patientId: this.newAppointment.patientId,
      date: full.toISOString(),
      time: this.convertTo24HourFormat(this.newAppointment.time)
    };

    this.hospital.updateAppointment(this.editingAppointment!, body).subscribe(() => {
      this.showMessage('✅ Appointment updated successfully!');
      this.cancelEdit();
      this.loadData();
    });
  }

  cancelEdit() {
    this.editingAppointment = null;
    this.newAppointment = { doctorId: '', patientId: '', date: '', time: '' };
    this.availableSlots = [];
  }

  deleteAppointment(id: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.hospital.deleteAppointment(id).subscribe(() => {
        this.showMessage('✅ Appointment canceled successfully.');
        this.loadData();
      });
    }
  }
}
